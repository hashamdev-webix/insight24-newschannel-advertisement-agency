'use client';

import { useEffect, useState } from 'react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data.categories || []);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setLoading(true);
    setError('');

    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, description: newDesc }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) { setError(data.error); return; }
    setNewName('');
    setNewDesc('');
    load();
  }

  async function handleDelete(slug: string, name: string) {
    if (!confirm(`Delete category "${name}"?`)) return;
    await fetch(`/api/categories/${slug}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Add form */}
      <div className="bg-white border border-gray-200 p-6">
        <h2 className="text-xs font-black text-[#1a1a1a] uppercase tracking-widest mb-4">Add Category</h2>
        {error && <p className="text-xs text-red-600 mb-3">{error}</p>}
        <form onSubmit={handleAdd} className="space-y-3">
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Category name (e.g. Business)"
            required
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#dd0000]"
          />
          <input
            type="text"
            value={newDesc}
            onChange={e => setNewDesc(e.target.value)}
            placeholder="Description (optional)"
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#dd0000]"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#dd0000] text-white text-xs font-black px-6 py-2.5 hover:bg-red-700 transition uppercase tracking-widest"
          >
            {loading ? 'Adding...' : 'Add Category'}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="bg-white border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200 bg-[#1a1a1a]">
          <h2 className="text-xs font-black text-white uppercase tracking-widest">All Categories ({categories.length})</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {categories.map(cat => (
            <div key={cat._id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-[#1a1a1a]">{cat.name}</p>
                <p className="text-xs text-gray-400">/category/{cat.slug}</p>
                {cat.description && <p className="text-xs text-gray-500 mt-0.5">{cat.description}</p>}
              </div>
              <button
                onClick={() => handleDelete(cat.slug, cat.name)}
                className="text-xs text-[#dd0000] hover:underline font-semibold"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
