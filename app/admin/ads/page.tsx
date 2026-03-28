'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminAdsPage() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    // Fetch all ads (admin sees all including inactive)
    const res = await fetch('/api/ads');
    const data = await res.json();
    setAds(data.ads || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function toggleActive(id: string, current: boolean) {
    await fetch(`/api/ads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !current }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this ad?')) return;
    await fetch(`/api/ads/${id}`, { method: 'DELETE' });
    load();
  }

  if (loading) return <div className="text-sm text-gray-500">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">{ads.length} advertisements</p>
        <Link href="/admin/ads/new" className="bg-[#dd0000] text-white text-xs font-bold px-4 py-2 hover:bg-red-700 transition uppercase tracking-wide">
          + New Ad
        </Link>
      </div>

      <div className="bg-white border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-[#1a1a1a] text-white">
            <tr>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-black">Title / Client</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-black hidden md:table-cell">Placement</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-black hidden lg:table-cell">Clicks / Views</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-black">Status</th>
              <th className="text-right px-4 py-3 text-xs uppercase tracking-widest font-black">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ads.map((ad) => (
              <tr key={ad._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-semibold text-[#1a1a1a]">{ad.title}</p>
                  <p className="text-xs text-gray-400">{ad.clientName}</p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-xs bg-gray-100 px-2 py-0.5 text-gray-700 capitalize">{ad.placement}</span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-xs text-gray-600">
                  {ad.clicks} / {ad.impressions}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleActive(ad._id, ad.isActive)}
                    className={`text-[10px] font-bold px-2 py-0.5 uppercase ${ad.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                  >
                    {ad.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="text-xs text-[#dd0000] hover:underline font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
