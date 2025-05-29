import { NextRequest, NextResponse } from 'next/server';
import { getDateRangeForCity } from '@/lib/getDateRangeForCity';
import { City } from '@/types/city';

export async function GET(req: NextRequest) {
  const cityParam = req.nextUrl.searchParams.get('city');

  if (!cityParam) {
    return NextResponse.json({ error: 'City is required' }, { status: 400 });
  }

  const city = cityParam.toLowerCase();

  if (city !== City.Vaasa && city !== City.Oulu) {
    return NextResponse.json({ error: 'Invalid city' }, { status: 400 });
  }

  try {
    const range = await getDateRangeForCity(city as City);
    return NextResponse.json(range);
  } catch (error) {
    console.error('Failed to get date range:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
