import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ContactMessage from '@/models/ContactMessage';
import { getTokenFromRequest } from '@/lib/auth';

// POST /api/contact  — public (from Contact page)
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required' }, { status: 400 });
    }

    const msg = await ContactMessage.create({
      name, email, phone,
      subject: subject || 'General Enquiry',
      message,
    });

    return NextResponse.json({ message: 'Message sent successfully', id: msg._id }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

// GET /api/contact  (admin only)
export async function GET(req: NextRequest) {
  try {
    const payload = getTokenFromRequest(req);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
