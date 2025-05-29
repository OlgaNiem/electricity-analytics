import { getTemperatureData } from './getTemperatureData';
import { getSpotPricesRange } from './getSpotPrices';
import { TemperatureData } from '@/types/weather';
import { SpotPrice } from '@/types/prices';
import { CombinedData } from '@/types/combined';
import { calculateScore } from './scoring';

export async function getCombinedData(city: string, dateStr: string): Promise<CombinedData[]> {
  const temps: TemperatureData[] = await getTemperatureData(city);

  const selectedDate = new Date(dateStr);
  const dayStart = new Date(selectedDate.setHours(0, 0, 0, 0));
  const dayEnd = new Date(dayStart);
  dayEnd.setHours(23, 59, 59, 999);

  const limitedTemps = temps.filter(t => {
    const d = new Date(t.time);
    return d >= dayStart && d <= dayEnd;
  });

  if (!limitedTemps.length) {
    throw new Error(`No temperature data available for ${city} on ${dateStr}`);
  }

  const startISO = limitedTemps[0].time;
  const endISO = limitedTemps[limitedTemps.length - 1].time;

  let prices: SpotPrice[] = [];

  try {
    prices = await getSpotPricesRange(startISO, endISO);
  } catch (error) {
    console.error('Error fetching spot prices:', error);
    throw new Error('Spot prices fetch failed');
  }

  return limitedTemps.map(({ time, temp }) => {
    const priceMatch = prices.find(
      (p) => new Date(p.date).toISOString() === new Date(time).toISOString()
    );

    const price = priceMatch?.value ?? null;
    const score = price !== null ? calculateScore(price, temp) : null;

    return {
      time,
      temp,
      price,
      score,
    };
  });
}
