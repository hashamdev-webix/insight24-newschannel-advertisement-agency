'use client';

import { useEffect, useState } from 'react';

const statusColors: Record<string, string> = {
  new: 'bg-red-100 text-red-700',
  contacted: 'bg-blue-100 text-blue-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-gray-100 text-gray-600',
};

export default function AdminAdRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch('/api/ad-requests');
    const data = await res.json();
    setRequests(data.requests || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/ad-requests/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    load();
  }

  if (loading) return <div className="text-sm text-gray-500">Loading...</div>;

  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-500">{requests.length} total requests</p>

      <div className="bg-white border border-gray-200 divide-y divide-gray-100">
        {requests.length === 0 && (
          <p className="px-4 py-8 text-sm text-gray-400 text-center">No ad requests yet</p>
        )}
        {requests.map((r) => (
          <div key={r._id} className="px-4 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-[#1a1a1a] text-sm">{r.name}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 uppercase ${statusColors[r.status]}`}>
                    {r.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{r.email} {r.phone && `· ${r.phone}`}</p>
                <p className="text-xs text-[#dd0000] font-semibold mt-1">{r.packageType}</p>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{r.message}</p>
                <p className="text-xs text-gray-400 mt-2">{new Date(r.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                {['new', 'contacted', 'approved', 'rejected'].map(s => (
                  <button
                    key={s}
                    onClick={() => updateStatus(r._id, s)}
                    disabled={r.status === s}
                    className={`text-[10px] font-bold px-3 py-1 uppercase tracking-wide transition ${
                      r.status === s ? 'bg-[#1a1a1a] text-white cursor-default' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
