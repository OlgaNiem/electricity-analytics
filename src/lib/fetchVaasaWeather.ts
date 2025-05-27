import axios from 'axios';
import { TemperatureData, ForecastResponse } from '@/types/weather';

export async function fetchVaasaWeather(): Promise<TemperatureData[]> {
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  if (!API_KEY) throw new Error('Missing OpenWeather API key');

  const CITY = 'Vaasa';
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${API_KEY}`;

  const response = await axios.get<ForecastResponse>(url);

  return response.data.list.map((item) => ({
    time: item.dt_txt,
    temp: item.main.temp,
  }));
}
