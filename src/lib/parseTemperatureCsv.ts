import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { TemperatureData } from '@/types/weather';

export function parseTemperatureCsv(): TemperatureData[] {
  const filePath = path.join(process.cwd(), 'data', 'temperature.csv');
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ';',
  });

  const hourlyMap = new Map<string, number[]>();

records.forEach((row: { startTime: string; 'Temperature in Oulu - real time data': string }) => {
  const date = new Date(row.startTime);
  const hour = new Date(date.setMinutes(0, 0, 0)).toISOString();
  const temp = parseFloat(row['Temperature in Oulu - real time data']);

  const temps = hourlyMap.get(hour);
  if (temps) {
    temps.push(temp);
  } else {
    hourlyMap.set(hour, [temp]);
  }
});

  const hourlyAvg: TemperatureData[] = [];

  for (const [time, temps] of hourlyMap.entries()) {
    const avg = temps.reduce((a, b) => a + b, 0) / temps.length;
    hourlyAvg.push({ time, temp: parseFloat(avg.toFixed(2)) });
  }

  return hourlyAvg.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
}
