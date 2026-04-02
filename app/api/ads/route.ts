import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Advertisement from '@/models/Advertisement';
import { getTokenFromRequest } from '@/lib/auth';

// GET /api/ads?placement=sidebar
// — Admin (authenticated): all ads, no date/status filter
// — Public: active ads within date range only
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const placement = searchParams.get('placement');
    const isAdmin = !!getTokenFromRequest(req);

    const query: Record<string, unknown> = {};

    if (!isAdmin) {
      const now = new Date();
      query.isActive = true;
      query.startDate = { $lte: now };
      query.endDate = { $gte: now };
    }

    if (placement) query.placement = placement;

    const ads = await Advertisement.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ ads });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/ads  (admin only)
export async function POST(req: NextRequest) {
  try {
    const payload = getTokenFromRequest(req);
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();
    const { title, clientName, imageUrl, linkUrl, placement, startDate, endDate } = body;

    if (!title || !clientName || !imageUrl || !linkUrl || !placement || !startDate || !endDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const ad = await Advertisement.create({ ...body });
    return NextResponse.json({ ad }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
