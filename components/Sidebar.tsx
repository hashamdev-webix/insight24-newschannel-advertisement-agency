import { Article } from '@/lib/types';
import ArticleCard from './ArticleCard';

interface SidebarProps {
  articles: Article[];
  title?: string;
}

export default function Sidebar({ articles, title = 'Trending' }: SidebarProps) {
  return (
    <aside className="bg-secondary rounded-lg p-6">
      <h3 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border">
        {title}
      </h3>
      <div className="space-y-6">
        {articles.map((article, index) => (
          <div key={article.id} className="flex gap-4 pb-6 border-b border-border last:border-b-0 last:pb-0">
            <div className="text-lg font-bold text-primary w-8 h-8 flex items-center justify-center">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <ArticleCard article={article} variant="compact" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
