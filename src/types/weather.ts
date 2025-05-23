export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
  };
}

export interface ForecastResponse {
  list: ForecastItem[];
}

export interface TemperatureData {
  time: string;
  temp: number;
}
