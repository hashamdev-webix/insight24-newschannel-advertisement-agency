'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const placements = ['top-banner', 'sidebar', 'inline', 'homepage-featured'];

export default function NewAdPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '', clientName: '', imageUrl: '/placeholder.jpg',
    linkUrl: '', placement: 'top-banner',
    startDate: '', endDate: '', notes: '', isActive: true,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm(prev => ({ ...prev, [name]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/ads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) { setError(data.error); return; }
    router.push('/admin/ads');
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">Create a new advertisement</p>
        <button type="submit" disabled={loading} className="bg-[#dd0000] text-white text-xs font-black px-6 py-2.5 hover:bg-red-700 transition uppercase tracking-widest disabled:opacity-60">
          {loading ? 'Saving...' : 'Save Ad'}
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2">{error}</div>}

      <div className="bg-white border border-gray-200 p-6 space-y-4">
        {[
          { label: 'Ad Title', name: 'title', required: true },
          { label: 'Client Name', name: 'clientName', required: true },
          { label: 'Image URL', name: 'imageUrl', required: true, placeholder: '/placeholder.jpg' },
          { label: 'Click URL', name: 'linkUrl', required: true, placeholder: 'https://example.com' },
        ].map(f => (
          <div key={f.name}>
            <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">{f.label} {f.required && '*'}</label>
            <input type="text" name={f.name} value={(form as any)[f.name]} onChange={handleChange} required={f.required} placeholder={f.placeholder}
              className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#dd0000]" />
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Placement *</label>
            <select name="placement" value={form.placement} onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#dd0000] bg-white">
              {placements.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <input type="checkbox" id="isActive" name="isActive" checked={form.isActive} onChange={handleChange} className="w-4 h-4 accent-[#dd0000]" />
            <label htmlFor="isActive" className="text-xs font-bold text-[#1a1a1a] uppercase tracking-widest">Active</label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Start Date *</label>
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required
              className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#dd0000]" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">End Date *</label>
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required
              className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#dd0000]" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={2}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#dd0000] resize-none" />
        </div>
      </div>
    </form>
  );
}
