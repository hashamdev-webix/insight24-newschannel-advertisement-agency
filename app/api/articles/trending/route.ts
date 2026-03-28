import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Article from '@/models/Article';

// GET /api/articles/trending?limit=6
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const limit = parseInt(new URL(req.url).searchParams.get('limit') || '6');

    const articles = await Article.find({ status: 'published' })
      .sort({ views: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ articles });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
