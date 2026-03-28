'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Stats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalViews: number;
  activeAds: number;
  newAdRequests: number;
  unreadMessages: number;
}

interface DashboardData {
  stats: Stats;
  recentArticles: any[];
  recentAdRequests: any[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/dashboard');
      if (res.status === 401) { router.push('/admin/login'); return; }
      const json = await res.json();
      setData(json);
      setLoading(false);
    }
    load();
  }, [router]);

  if (loading) return <div className="text-sm text-gray-500">Loading...</div>;
  if (!data) return null;

  const { stats, recentArticles, recentAdRequests } = data;

  const statCards = [
    { label: 'Total Articles', value: stats.totalArticles, color: 'bg-[#1a1a1a]', href: '/admin/articles' },
    { label: 'Total Views', value: stats.totalViews.toLocaleString(), color: 'bg-[#dd0000]', href: '/admin/articles' },
    { label: 'Active Ads', value: stats.activeAds, color: 'bg-[#00498f]', href: '/admin/ads' },
    { label: 'New Ad Requests', value: stats.newAdRequests, color: 'bg-amber-600', href: '/admin/ad-requests' },
    { label: 'Unread Messages', value: stats.unreadMessages, color: 'bg-green-700', href: '/admin/messages' },
    { label: 'Draft Articles', value: stats.draftArticles, color: 'bg-gray-600', href: '/admin/articles' },
  ];

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href} className={`${card.color} text-white p-4 hover:opacity-90 transition`}>
            <p className="text-2xl font-black">{card.value}</p>
            <p className="text-xs opacity-80 mt-1 uppercase tracking-wide">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Articles */}
        <div className="bg-white border border-gray-200">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h2 className="text-xs font-black text-[#1a1a1a] uppercase tracking-widest">Recent Articles</h2>
            <Link href="/admin/articles" className="text-xs text-[#dd0000] hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentArticles.map((a: any) => (
              <div key={a._id} className="flex items-center justify-between px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#1a1a1a] truncate">{a.title}</p>
                  <p className="text-xs text-gray-400">{a.category} · {a.views} views</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide shrink-0 ml-2 ${a.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Ad Requests */}
        <div className="bg-white border border-gray-200">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h2 className="text-xs font-black text-[#1a1a1a] uppercase tracking-widest">Recent Ad Requests</h2>
            <Link href="/admin/ad-requests" className="text-xs text-[#dd0000] hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentAdRequests.length === 0 && (
              <p className="px-4 py-6 text-sm text-gray-400 text-center">No requests yet</p>
            )}
            {recentAdRequests.map((r: any) => (
              <div key={r._id} className="flex items-center justify-between px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#1a1a1a] truncate">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.email} · {r.packageType}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide shrink-0 ml-2 ${
                  r.status === 'new' ? 'bg-red-100 text-red-700'
                  : r.status === 'approved' ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
                }`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white border border-gray-200 p-4">
        <h2 className="text-xs font-black text-[#1a1a1a] uppercase tracking-widest mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/articles/new" className="bg-[#dd0000] text-white text-xs font-bold px-4 py-2 hover:bg-red-700 transition uppercase tracking-wide">
            + New Article
          </Link>
          <Link href="/admin/ads/new" className="bg-[#1a1a1a] text-white text-xs font-bold px-4 py-2 hover:opacity-80 transition uppercase tracking-wide">
            + New Ad
          </Link>
          <Link href="/admin/categories" className="border border-gray-300 text-[#1a1a1a] text-xs font-bold px-4 py-2 hover:bg-gray-50 transition uppercase tracking-wide">
            Manage Categories
          </Link>
        </div>
      </div>
    </div>
  );
}
