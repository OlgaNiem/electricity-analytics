export interface TemperatureData {
  time: string;
  temp: number;
}

export interface ForecastMain {
  temp: number;
}

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: ForecastMain;
}

export interface ForecastResponse {
  list: ForecastItem[];
}

export interface TemperatureListProps {
  city: string;
}