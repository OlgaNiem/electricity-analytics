import { getTemperatureData } from './getTemperatureData';
import { getSpotPricesRange } from './getSpotPrices';
import { TemperatureData } from '@/types/weather';
import { SpotPrice } from '@/types/prices';
import { CombinedData } from '@/types/combined';

export async function getCombinedData(): Promise<CombinedData[]> {
  const temps: TemperatureData[] = await getTemperatureData();

  const now = new Date();
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const limitedTemps = temps.filter((t) => new Date(t.time) <= today);

  if (!limitedTemps.length) {
    throw new Error('No valid temperature data available');
  }

  const startDate = new Date(limitedTemps[0].time);
  const endDate = new Date(Math.min(new Date(limitedTemps[limitedTemps.length - 1].time).getTime(), now.getTime()));

  const startISO = startDate.toISOString();
  const endISO = endDate.toISOString();

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

    return {
      time,
      temp,
      price: priceMatch?.value ?? null,
    };
  });
}
