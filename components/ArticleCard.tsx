import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  if (variant === 'compact') {
    return (
      <Link href={`/articles/${article.slug}`}>
        <article className="group hover:opacity-80 transition">
          <div className="relative h-24 mb-2 overflow-hidden rounded bg-gray-200">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
          <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition leading-tight mb-1">
            {article.title}
          </h3>
          <p className="text-xs text-muted-foreground">{formatDate(article.date)}</p>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.slug}`}>
      <article className="group hover:opacity-90 transition">
        <div className="relative h-40 overflow-hidden bg-gray-200 mb-3">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
        <div>
          <div className="mb-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              {article.category}
            </span>
          </div>
          <h2 className="font-bold text-base text-foreground group-hover:text-primary transition mb-2 leading-tight line-clamp-2">
            {article.title}
          </h2>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {article.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}
