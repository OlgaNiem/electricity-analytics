import { City } from '@/types/city';
import { parseTemperatureCsv } from './parseTemperatureCsv';

export async function getDateRangeForCity(city: City): Promise<{ min: string; max: string }> {
  if (city === City.Vaasa) {
    const today = new Date();
    const max = new Date();
    max.setDate(today.getDate() + 4);

    return {
      min: today.toISOString().split('T')[0],
      max: max.toISOString().split('T')[0],
    };
  }

  if (city === City.Oulu) {
    const temps = parseTemperatureCsv();

    const allDates = temps.map(t => t.time.split('T')[0]);
    const unique = Array.from(new Set(allDates)).sort();

    return {
      min: unique[0],
      max: unique[unique.length - 1],
    };
  }

  throw new Error(`Unknown city: ${city}`);
}
