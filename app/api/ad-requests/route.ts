import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import AdRequest from '@/models/AdRequest';
import { getTokenFromRequest } from '@/lib/auth';

// POST /api/ad-requests  — public (from Advertise With Us form)
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, phone, packageType, message } = await req.json();

    if (!name || !email || !packageType || !message) {
      return NextResponse.json({ error: 'Name, email, package and message are required' }, { status: 400 });
    }

    const adRequest = await AdRequest.create({ name, email, phone, packageType, message });
    return NextResponse.json({ adRequest }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

// GET /api/ad-requests  (admin only)
export async function GET(req: NextRequest) {
  try {
    const payload = getTokenFromRequest(req);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const status = new URL(req.url).searchParams.get('status');
    const query = status ? { status } : {};
    const requests = await AdRequest.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ requests });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
