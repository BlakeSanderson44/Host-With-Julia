import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.formData();
  // In a real app you'd process the data here.
  return NextResponse.json({ success: true, data: Object.fromEntries(data) });
}
