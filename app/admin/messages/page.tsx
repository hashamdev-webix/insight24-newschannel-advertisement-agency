'use client';

import { useEffect, useState } from 'react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch('/api/contact');
    const data = await res.json();
    setMessages(data.messages || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function markRead(id: string) {
    await fetch(`/api/contact/${id}`, { method: 'PUT' });
    load();
  }

  if (loading) return <div className="text-sm text-gray-500">Loading...</div>;

  const unread = messages.filter(m => !m.isRead).length;

  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-500">{messages.length} messages · {unread} unread</p>

      <div className="bg-white border border-gray-200 divide-y divide-gray-100">
        {messages.length === 0 && (
          <p className="px-4 py-8 text-sm text-gray-400 text-center">No messages yet</p>
        )}
        {messages.map((m) => (
          <div key={m._id} className={`px-4 py-4 ${!m.isRead ? 'bg-red-50' : ''}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-[#1a1a1a] text-sm">{m.name}</p>
                  {!m.isRead && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#dd0000] text-white uppercase">New</span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{m.email} {m.phone && `· ${m.phone}`}</p>
                <p className="text-xs font-semibold text-[#1a1a1a] mt-1">{m.subject}</p>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{m.message}</p>
                <p className="text-xs text-gray-400 mt-2">{new Date(m.createdAt).toLocaleString()}</p>
              </div>
              {!m.isRead && (
                <button
                  onClick={() => markRead(m._id)}
                  className="text-xs bg-[#1a1a1a] text-white px-3 py-1 hover:opacity-80 transition shrink-0 uppercase font-bold tracking-wide"
                >
                  Mark Read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
