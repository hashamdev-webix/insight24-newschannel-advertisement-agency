import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Article from '@/models/Article';
import { getTokenFromRequest } from '@/lib/auth';

// GET /api/articles?category=business&status=published&featured=true&page=1&limit=10
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const category = searchParams.get('category');
    const status = searchParams.get('status') || 'published';
    const featured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = { status };
    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;

    const [articles, total] = await Promise.all([
      Article.find(query).sort({ publishedAt: -1 }).skip(skip).limit(limit).lean(),
      Article.countDocuments(query),
    ]);

    return NextResponse.json({ articles, total, page, pages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/articles  (admin only)
export async function POST(req: NextRequest) {
  try {
    const payload = getTokenFromRequest(req);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const body = await req.json();

    const { title, excerpt, content, category, categoryName, author, image, isFeatured, status } = body;
    if (!title || !excerpt || !content || !category || !categoryName || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Auto-generate slug
    const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let slug = baseSlug;
    let count = 1;
    while (await Article.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    const article = await Article.create({
      title, slug, excerpt, content, category, categoryName,
      author, image: image || '/placeholder.jpg',
      isFeatured: isFeatured || false,
      status: status || 'published',
      publishedAt: new Date(),
    });

    return NextResponse.json({ article }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
