import axios, { AxiosError } from 'axios';
import { SpotPrice } from '@/types/prices';
import { addDays } from 'date-fns';

export async function getSpotPricesRange(start: string, end: string): Promise<SpotPrice[]> {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const allPrices: SpotPrice[] = [];

  for (let date = new Date(startDate); date <= endDate; date = addDays(date, 1)) {
    const dayStart = date.toISOString();
    const url = `https://sahkotin.fi/prices?fix&vat&start=${dayStart}`;

    try {
      const res = await axios.get<{ prices: SpotPrice[] }>(url);
      allPrices.push(...res.data.prices);
    } catch (error) {
      const err = error as AxiosError;
      const status = err.response?.status ?? 'unknown';
      const message = err.message ?? 'No message';

      console.error('Fetch failed for', url, status, message);
      throw new Error(`Failed to fetch spot prices for ${dayStart}`);
    }
  }

  return allPrices;
}
