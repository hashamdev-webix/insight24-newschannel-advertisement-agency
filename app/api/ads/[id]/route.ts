import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Advertisement from '@/models/Advertisement';
import { getTokenFromRequest } from '@/lib/auth';

interface Params { params: Promise<{ id: string }> }

// PUT /api/ads/:id  (admin only)
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const payload = getTokenFromRequest(req);
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const ad = await Advertisement.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!ad) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({ ad });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

// DELETE /api/ads/:id  (admin only)
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const payload = getTokenFromRequest(req);
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const ad = await Advertisement.findByIdAndDelete(id);
    if (!ad) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
