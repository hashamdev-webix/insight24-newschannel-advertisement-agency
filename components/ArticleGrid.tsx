import { Article } from '@/lib/types';
import ArticleCard from './ArticleCard';

interface ArticleGridProps {
  articles: Article[];
  title?: string;
}

export default function ArticleGrid({ articles, title }: ArticleGridProps) {
  return (
    <section className="mb-8">
      {title && (
        <div className="mb-6 pb-3 border-b-4 border-primary inline-block">
          <h2 className="text-2xl font-bold text-foreground uppercase tracking-tight">{title}</h2>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
