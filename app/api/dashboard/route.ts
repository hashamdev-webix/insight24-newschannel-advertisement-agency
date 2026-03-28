import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Article from '@/models/Article';
import Advertisement from '@/models/Advertisement';
import AdRequest from '@/models/AdRequest';
import ContactMessage from '@/models/ContactMessage';
import { getTokenFromRequest } from '@/lib/auth';

// GET /api/dashboard  (admin only) — summary stats
export async function GET(req: NextRequest) {
  try {
    const payload = getTokenFromRequest(req);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();

    const [
      totalArticles,
      publishedArticles,
      draftArticles,
      totalViews,
      activeAds,
      newAdRequests,
      unreadMessages,
    ] = await Promise.all([
      Article.countDocuments(),
      Article.countDocuments({ status: 'published' }),
      Article.countDocuments({ status: 'draft' }),
      Article.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]),
      Advertisement.countDocuments({ isActive: true }),
      AdRequest.countDocuments({ status: 'new' }),
      ContactMessage.countDocuments({ isRead: false }),
    ]);

    const recentArticles = await Article.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category status publishedAt views')
      .lean();

    const recentAdRequests = await AdRequest.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return NextResponse.json({
      stats: {
        totalArticles,
        publishedArticles,
        draftArticles,
        totalViews: totalViews[0]?.total || 0,
        activeAds,
        newAdRequests,
        unreadMessages,
      },
      recentArticles,
      recentAdRequests,
    });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
