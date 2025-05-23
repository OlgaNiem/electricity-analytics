import axios from 'axios';
import { ForecastResponse, TemperatureData } from '@/types/weather';

const API_KEY = process.env.OPENWEATHER_API_KEY!;
const CITY = 'Vaasa';

export async function getTemperatureData(): Promise<TemperatureData[]> {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${API_KEY}`;

  const response = await axios.get<ForecastResponse>(url);

  return response.data.list.map((item) => ({
    time: item.dt_txt,
    temp: item.main.temp,
  }));
}
