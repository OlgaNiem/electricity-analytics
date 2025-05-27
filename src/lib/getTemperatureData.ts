import { TemperatureData } from '@/types/weather';
import { parseTemperatureCsv } from './parseTemperatureCsv';
import { fetchVaasaWeather } from './fetchVaasaWeather';

export async function getTemperatureData(city: string): Promise<TemperatureData[]> {
  if (city.toLowerCase() === 'oulu') {
    return parseTemperatureCsv();
  }

  if (city.toLowerCase() === 'vaasa') {
    return fetchVaasaWeather();
  }

  throw new Error(`Unsupported city: ${city}`);
}
