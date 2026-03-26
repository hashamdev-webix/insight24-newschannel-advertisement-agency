export type Category = 'world' | 'uk' | 'business' | 'tech' | 'science' | 'health' | 'sport';

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  date: string;
  image: string;
  views: number;
}
