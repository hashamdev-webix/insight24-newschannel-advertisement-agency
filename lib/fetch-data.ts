/**
 * Server-side data fetching helpers.
 * Called directly from Next.js server components — no HTTP round-trip.
 */

import { connectDB } from './mongodb';
import ArticleModel from '@/models/Article';

export interface Article {
  _id: string;
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  categoryName: string;
  author: string;
  image: string;
  views: number;
  isFeatured: boolean;
  status: string;
  publishedAt: string;
}

function normalize(doc: any): Article {
  const obj = doc._id ? doc : doc.toObject?.() ?? doc;
  return {
    ...obj,
    id: String(obj._id),
    _id: String(obj._id),
    publishedAt: obj.publishedAt ? new Date(obj.publishedAt).toISOString() : '',
  };
}

export async function getFeaturedArticle(): Promise<Article | null> {
  await connectDB();
  const doc = await ArticleModel.findOne({ status: 'published', isFeatured: true })
    .sort({ publishedAt: -1 })
    .lean();
  // fallback to latest article if no featured set
  if (!doc) {
    const fallback = await ArticleModel.findOne({ status: 'published' })
      .sort({ publishedAt: -1 })
      .lean();
    return fallback ? normalize(fallback) : null;
  }
  return normalize(doc);
}

export async function getTrendingArticles(limit = 6): Promise<Article[]> {
  await connectDB();
  const docs = await ArticleModel.find({ status: 'published' })
    .sort({ views: -1 })
    .limit(limit)
    .lean();
  return docs.map(normalize);
}

export async function getArticlesByCategory(category: string, limit = 10): Promise<Article[]> {
  await connectDB();
  const docs = await ArticleModel.find({ status: 'published', category })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .lean();
  return docs.map(normalize);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  await connectDB();
  const doc = await ArticleModel.findOneAndUpdate(
    { slug, status: 'published' },
    { $inc: { views: 1 } },
    { new: true }
  ).lean();
  return doc ? normalize(doc) : null;
}

export async function getAllPublishedArticles(limit = 50): Promise<Article[]> {
  await connectDB();
  const docs = await ArticleModel.find({ status: 'published' })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .lean();
  return docs.map(normalize);
}

export async function getAllSlugs(): Promise<string[]> {
  await connectDB();
  const docs = await ArticleModel.find({ status: 'published' }).select('slug').lean();
  return docs.map((d: any) => d.slug);
}
