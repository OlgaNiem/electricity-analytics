import { parseTemperatureCsv } from '@/lib/parseTemperatureCsv';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = parseTemperatureCsv();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to load Oulu temperature data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
