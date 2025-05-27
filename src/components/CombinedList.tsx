import { getCombinedData } from '@/lib/getCombinedData';
import { Card } from '@/components/ui/card';
import { CombinedData, CombinedListProps } from '@/types/combined';

export default async function CombinedList({ city, date }: CombinedListProps) {
  const data: CombinedData[] = await getCombinedData(city, date);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">
        Spot Prices & Temperature ({city === 'vaasa' ? 'Vaasa' : 'Oulu'})
      </h2>
      {data.map(({ time, temp, price }) => (
        <Card
          key={time}
          className="p-4 flex justify-between items-center text-sm sm:text-base"
        >
          <div>{new Date(time).toLocaleString()}</div>
          <div>{temp.toFixed(1)}°C</div>
          <div>{price !== null ? `${price.toFixed(2)} c/kWh` : '–'}</div>
        </Card>
      ))}
    </div>
  );
}
