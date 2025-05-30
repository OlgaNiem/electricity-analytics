import { getTemperatureData } from '@/lib/getTemperatureData';
import { TemperatureData, TemperatureListProps } from '@/types/weather';
import { Card } from '@/components/ui/card';

export default async function TemperatureList({ city }: TemperatureListProps) {
  let data: TemperatureData[] = [];

  try {
    data = await getTemperatureData(city);
  } catch {
    return <div className="p-4 text-red-600">Failed to load temperature data</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Temperature in {city} (3-hour intervals)</h2>

      {data.map(({ time, temp }) => (
        <Card key={time} className="p-4 flex justify-between">
          <span>{new Date(time).toLocaleString()}</span>
          <span>{temp.toFixed(1)}°C</span>
        </Card>
      ))}
    </div>
  );
}
