'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ImageUpload from '@/components/ImageUpload';

const placements = ['top-banner', 'sidebar', 'inline', 'homepage-featured'];

export default function EditAdPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '', clientName: '', imageUrl: '',
    linkUrl: '', placement: 'top-banner',
    startDate: '', endDate: '', notes: '', isActive: true,
  });

  useEffect(() => {
    (async () => {
        const res = await fetch('/api/admin/ads/' + id);
        if (!res.ok) { setError('Ad not found'); setLoading(false); return; }
        const data = await res.json();
        const ad = data.ad;
        setForm({
          title: ad.title || '',
          clientName: ad.clientName || '',
          imageUrl: ad.imageUrl || '',
          linkUrl: ad.linkUrl || '',
          placement: ad.placement || 'top-banner',
          startDate: ad.startDate ? new Date(ad.startDate).toISOString().split('T')[0] : '',
          endDate: ad.endDate ? new Date(ad.endDate).toISOString().split('T')[0] : '',
          notes: ad.notes || '',
          isActive: ad.isActive ?? true,
        });
        setLoading(false);
    })();
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm(prev => ({ ...prev, [name]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const res = await fetch(`/api/ads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) { setError(data.error || 'Failed to save'); return; }
    router.push('/admin/ads');
  }

  if (loading) return <div className="text-sm text-gray-400">Loading...</div>;
  if (error && !form.title) return <div className="text-sm text-red-500">{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">Edit advertisement</p>
        <button type="submit" disabled={saving}
          className="bg-[#dd0000] text-white text-xs font-black px-6 py-2.5 hover:bg-red-700 transition uppercase tracking-widest disabled:opacity-60">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2">{error}</div>}

      <div className="bg-white border border-gray-200 p-6 space-y-4">
        {[
          { label: 'Ad Title', name: 'title', required: true },
          { label: 'Client Name', name: 'clientName', required: true },
          { label: 'Click URL', name: 'linkUrl', required: true, placeholder: 'https://example.com' },
        ].map(f => (
          <div key={f.name}>
            <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">{f.label} {f.required && '*'}</label>
            <input type="text" name={f.name} value={(form as any)[f.name]} onChange={handleChange}
              required={f.required} placeholder={f.placeholder}
              className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#dd0000]" />
          </div>
        ))}

        <ImageUpload
          label="Ad Image"
          value={form.imageUrl}
          onChange={(url) => setForm(prev => ({ ...prev, imageUrl: url }))}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Placement *</label>
            <select name="placement" value={form.placement} onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#dd0000] bg-white">
              {placements.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <input type="checkbox" id="isActive" name="isActive" checked={form.isActive} onChange={handleChange}
              className="w-4 h-4 accent-[#dd0000]" />
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
