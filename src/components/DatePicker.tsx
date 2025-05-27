'use client';

import { useState } from 'react';

interface DatePickerProps {
  date: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
}

export default function DatePicker({ date, onChange, min, max }: DatePickerProps) {
  const [value, setValue] = useState(date);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setValue(newDate);
    onChange(newDate);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="date" className="font-medium">Select date:</label>
      <input
        id="date"
        type="date"
        className="border px-2 py-1 rounded"
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
      />
    </div>
  );
}
