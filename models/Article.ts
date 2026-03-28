import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;        // slug e.g. "business", "tech"
  categoryName: string;    // display name e.g. "Business"
  author: string;
  image: string;
  views: number;
  isFeatured: boolean;
  status: 'published' | 'draft';
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    categoryName: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    image: { type: String, default: '/placeholder.jpg' },
    views: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ['published', 'draft'], default: 'published' },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Index for fast category + status queries
ArticleSchema.index({ category: 1, status: 1 });
ArticleSchema.index({ isFeatured: 1, status: 1 });
ArticleSchema.index({ views: -1 });

const Article: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);
export default Article;
