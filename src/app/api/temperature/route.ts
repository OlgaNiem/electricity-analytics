import { NextResponse } from 'next/server';
import { getTemperatureData } from '@/lib/getTemperatureData';

export async function GET() {
  try {
    const data = await getTemperatureData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
