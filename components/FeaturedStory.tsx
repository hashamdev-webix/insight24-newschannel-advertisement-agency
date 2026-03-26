import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface FeaturedStoryProps {
  article: Article;
}

export default function FeaturedStory({ article }: FeaturedStoryProps) {
  return (
    <Link href={`/articles/${article.slug}`}>
      <article className="group grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Left side - Text content */}
        <div className="flex flex-col justify-start order-2 md:order-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-primary">● LIVE</span>
            <span className="text-xs font-bold text-foreground">
              {article.category.toUpperCase()}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight group-hover:text-primary transition text-foreground">
            {article.title}
          </h1>
          <p className="text-base text-foreground/80 mb-4 line-clamp-4">
            {article.excerpt}
          </p>
          <p className="text-xs text-foreground/60">{formatDate(article.date)}</p>
        </div>

        {/* Right side - Image */}
        <div className="relative h-64 md:h-80 bg-gray-200 overflow-hidden rounded-sm order-1 md:order-2">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
            priority
            loading="eager"
          />
        </div>
      </article>
    </Link>
  );
}
