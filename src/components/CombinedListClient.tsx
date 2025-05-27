'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { CombinedData } from '@/types/combined';
import { City, CityProps } from '@/types/city';
import { getErrorMessage } from '@/lib/utils';
import DatePicker from './DatePicker';

export default function CombinedListClient({ initialCity = City.Vaasa }: CityProps) {
  const [city, setCity] = useState<City>(initialCity);
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [data, setData] = useState<CombinedData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async (selectedCity: City, selectedDate: string) => {
    setLoading(true);
    setError(null);
    setCity(selectedCity);
    setDate(selectedDate);

    try {
      const res = await fetch(`/api/combined?city=${selectedCity}&date=${selectedDate}`);
      if (!res.ok) throw new Error(`Request failed: ${res.statusText}`);
      const json: CombinedData[] = await res.json();
      setData(json);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex gap-4 items-center">
        <button onClick={() => loadData(City.Vaasa, date)}>Vaasa</button>
        <button onClick={() => loadData(City.Oulu, date)}>Oulu</button>
        <DatePicker date={date} onChange={(newDate) => loadData(city, newDate)} />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {data && data.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">
            Spot Prices & Temperature ({city}, {date})
          </h2>

          {data.map(({ time, temp, price }) => (
            <Card key={time} className="p-4 flex justify-between text-sm sm:text-base">
              <div>{new Date(time).toLocaleString()}</div>
              <div>{temp.toFixed(1)}°C</div>
              <div>{price !== null ? `${price.toFixed(2)} c/kWh` : '–'}</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
