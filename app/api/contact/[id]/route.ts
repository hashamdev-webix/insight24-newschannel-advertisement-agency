import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ContactMessage from '@/models/ContactMessage';
import { getTokenFromRequest } from '@/lib/auth';

interface Params { params: Promise<{ id: string }> }

// PUT /api/contact/:id  — mark as read (admin only)
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const payload = getTokenFromRequest(req);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const msg = await ContactMessage.findByIdAndUpdate(id, { isRead: true }, { new: true });
    if (!msg) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({ message: msg });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
