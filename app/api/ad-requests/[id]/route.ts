import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import AdRequest from '@/models/AdRequest';
import { getTokenFromRequest } from '@/lib/auth';

interface Params { params: Promise<{ id: string }> }

// PUT /api/ad-requests/:id  — update status (admin only)
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const payload = getTokenFromRequest(req);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const { status } = await req.json();

    const request = await AdRequest.findByIdAndUpdate(id, { status }, { new: true });
    if (!request) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({ request });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
