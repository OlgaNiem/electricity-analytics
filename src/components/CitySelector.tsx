'use client';

import { useState } from 'react';
import { City } from '@/types/city';
import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CitySelector() {
  const router = useRouter();
  const params = useSearchParams();
  const selected = params.get('city') ?? City.Vaasa;
  const [city, setCity] = useState<City>(selected as City);

  const handleChange = (value: City) => {
    setCity(value);
    const search = new URLSearchParams(Array.from(params.entries()));
    search.set('city', value);
    router.replace(`/?${search.toString()}`);
  };

  return (
    <Select value={city} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select city" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={City.Vaasa}>Vaasa</SelectItem>
        <SelectItem value={City.Oulu}>Oulu</SelectItem>
      </SelectContent>
    </Select>
  );
}
