'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function load() {
    const res = await fetch('/api/articles?status=all&limit=100');
    // all statuses: fetch both published + draft
    const published = await fetch('/api/articles?status=published&limit=50').then(r => r.json());
    const drafts = await fetch('/api/articles?status=draft&limit=50').then(r => r.json());
    const all = [...(published.articles || []), ...(drafts.articles || [])];
    all.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    setArticles(all);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(slug: string) {
    if (!confirm('Delete this article?')) return;
    setDeleting(slug);
    const res = await fetch(`/api/articles/${slug}`, { method: 'DELETE' });
    if (res.ok) {
      setArticles((prev) => prev.filter((a) => a.slug !== slug));
    }
    setDeleting(null);
  }

  if (loading) return <div className="text-sm text-gray-500">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">{articles.length} articles total</p>
        <Link href="/admin/articles/new" className="bg-[#dd0000] text-white text-xs font-bold px-4 py-2 hover:bg-red-700 transition uppercase tracking-wide">
          + New Article
        </Link>
      </div>

      <div className="bg-white border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-[#1a1a1a] text-white">
            <tr>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-black">Title</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-black hidden md:table-cell">Category</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-black hidden lg:table-cell">Views</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-black">Status</th>
              <th className="text-right px-4 py-3 text-xs uppercase tracking-widest font-black">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {articles.map((a) => (
              <tr key={a._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-semibold text-[#1a1a1a] line-clamp-1">{a.title}</p>
                  <p className="text-xs text-gray-400">{a.author}</p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-xs text-gray-600 capitalize">{a.category}</span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-xs text-gray-600">{a.views}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 uppercase ${a.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/articles/edit/${a.slug}`} className="text-xs text-[#00498f] hover:underline font-semibold">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(a.slug)}
                      disabled={deleting === a.slug}
                      className="text-xs text-[#dd0000] hover:underline font-semibold"
                    >
                      {deleting === a.slug ? '...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
