'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CombinedData } from '@/types/combined';
import { City, CityProps } from '@/types/city';
import { getErrorMessage } from '@/lib/utils';

export default function CombinedListClient({ initialCity = City.Vaasa }: CityProps) {
  const [city, setCity] = useState<City>(initialCity);
  const [date, setDate] = useState<Date | null>(null);
  const [minDate, setMinDate] = useState<Date | null>(null);
  const [maxDate, setMaxDate] = useState<Date | null>(null);
  const [data, setData] = useState<CombinedData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDateRange = async (selectedCity: City) => {
    const res = await fetch(`/api/date-range?city=${selectedCity}`);
    if (!res.ok) throw new Error('Failed to fetch date range');
    return res.json() as Promise<{ min: string; max: string }>;
  };

  const loadData = async (selectedCity: City, selectedDate: Date) => {
    setLoading(true);
    setError(null);

    try {
      const formatted = format(selectedDate, 'yyyy-MM-dd');
      const res = await fetch(`/api/combined?city=${selectedCity}&date=${formatted}`);
      if (!res.ok) throw new Error(`Request failed: ${res.statusText}`);
      const json: CombinedData[] = await res.json();
      setData(json);
    } catch (err) {
      setError(getErrorMessage(err));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = async (newCity: City) => {
    try {
      const range = await fetchDateRange(newCity);
      const min = new Date(range.min);
      const max = new Date(range.max);

      setCity(newCity);
      setMinDate(min);
      setMaxDate(max);
      setDate(min);

      await loadData(newCity, min);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleDateChange = async (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      await loadData(city, newDate);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-semibold">
        Please select a city and date to display the data
      </h2>
      <p className="text-sm text-muted-foreground">
        Highlighted hours are based on a custom score that prefers low electricity prices and comfortable temperatures (around 18°C).
      </p>

      <div className="flex gap-4 items-center">
        <Button
          variant={city === City.Vaasa ? 'default' : 'outline'}
          onClick={() => handleCityChange(City.Vaasa)}
        >
          Vaasa
        </Button>
        <Button
          variant={city === City.Oulu ? 'default' : 'outline'}
          onClick={() => handleCityChange(City.Oulu)}
        >
          Oulu
        </Button>
      </div>

      {minDate && maxDate && (
        <Calendar
          mode="single"
          selected={date ?? undefined}
          onSelect={handleDateChange}
          fromDate={minDate}
          toDate={maxDate}
          className="rounded-md border"
        />
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {data && data.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">
            Spot Prices & Temperature ({city}, {date ? format(date, 'yyyy-MM-dd') : '–'})
          </h2>

          {data.map(({ time, temp, price, score }) => (
            <Card
              key={time}
              className={`p-4 flex justify-between text-sm sm:text-base ${
                score !== null && score > 0.85 ? 'border-2 border-green-500 bg-green-50' : ''
              }`}
            >

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
