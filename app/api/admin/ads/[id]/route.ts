import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Advertisement from '@/models/Advertisement';
import { getTokenFromRequest } from '@/lib/auth';

interface Params { params: Promise<{ id: string }> }

// GET /api/admin/ads/:id — fetch single ad for editing (admin only)
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const payload = getTokenFromRequest(req);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const ad = await Advertisement.findById(id).lean();
    if (!ad) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({ ad });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
