export interface CombinedData {
  time: string;
  temp: number;
  price: number | null;
}

export interface CombinedListProps {
  city: string;
  date: string;
}