import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Article from '@/models/Article';
import { getTokenFromRequest } from '@/lib/auth';

interface Params { params: Promise<{ slug: string }> }

// GET /api/articles/:slug
// — Admin (authenticated): returns any status, no view increment
// — Public: published only, increments views
export async function GET(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { slug } = await params;

    const isAdmin = !!getTokenFromRequest(req);

    let article;
    if (isAdmin) {
      article = await Article.findOne({ slug }).lean();
    } else {
      article = await Article.findOneAndUpdate(
        { slug, status: 'published' },
        { $inc: { views: 1 } },
        { new: true }
      ).lean();
    }

    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({ article });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// PUT /api/articles/:slug  (admin/editor only)
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const payload = getTokenFromRequest(req);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { slug } = await params;
    const body = await req.json();

    const article = await Article.findOneAndUpdate({ slug }, body, { new: true, runValidators: true });
    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({ article });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

// DELETE /api/articles/:slug  (admin only)
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const payload = getTokenFromRequest(req);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { slug } = await params;

    const article = await Article.findOneAndDelete({ slug });
    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
