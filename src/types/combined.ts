export interface CombinedData {
  time: string;
  temp: number;
  price: number | null;
  score: number | null;
}

export interface CombinedListProps {
  city: string;
  date: string;
}