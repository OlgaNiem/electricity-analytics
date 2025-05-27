import { getCombinedData } from '@/lib/getCombinedData';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get('city') ?? 'vaasa';
  const date = req.nextUrl.searchParams.get('date'); 

  if (!date) {
    return NextResponse.json({ error: 'Missing required date parameter' }, { status: 400 });
  }

  try {
    const data = await getCombinedData(city, date);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch combined data' }, { status: 500 });
  }
}
