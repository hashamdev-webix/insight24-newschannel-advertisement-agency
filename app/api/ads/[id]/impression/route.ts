import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Advertisement from '@/models/Advertisement';

interface Params { params: Promise<{ id: string }> }

// POST /api/ads/:id/impression  — public, tracks an impression
export async function POST(_req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    await Advertisement.findByIdAndUpdate(id, { $inc: { impressions: 1 } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
