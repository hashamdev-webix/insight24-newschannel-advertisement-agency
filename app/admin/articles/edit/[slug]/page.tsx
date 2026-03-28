'use client';

import { useEffect, useState } from 'react';
import { ArticleForm } from '../../new/page';
import { useParams } from 'next/navigation';

export default function EditArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/articles/${slug}`)
      .then(r => r.json())
      .then(d => { setArticle(d.article); setLoading(false); });
  }, [slug]);

  if (loading) return <div className="text-sm text-gray-500">Loading...</div>;
  if (!article) return <div className="text-sm text-red-500">Article not found</div>;

  return <ArticleForm mode="edit" initialData={article} slug={slug} />;
}
