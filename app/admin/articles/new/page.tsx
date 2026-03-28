'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewArticlePage() {
  return <ArticleForm mode="new" />;
}

export function ArticleForm({ mode, initialData, slug }: { mode: 'new' | 'edit'; initialData?: any; slug?: string }) {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    category: initialData?.category || '',
    categoryName: initialData?.categoryName || '',
    author: initialData?.author || '',
    image: initialData?.image || '/placeholder.jpg',
    isFeatured: initialData?.isFeatured || false,
    status: initialData?.status || 'published',
  });

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(d => setCategories(d.categories || []));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm(prev => ({ ...prev, [name]: val }));

    // Auto-set categoryName when category changes
    if (name === 'category') {
      const cat = categories.find(c => c.slug === value);
      if (cat) setForm(prev => ({ ...prev, category: value, categoryName: cat.name }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const url = mode === 'new' ? '/api/articles' : `/api/articles/${slug}`;
    const method = mode === 'new' ? 'POST' : 'PUT';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Failed to save article');
      return;
    }

    setSuccess('Article saved!');
    setTimeout(() => router.push('/admin/articles'), 800);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">{mode === 'new' ? 'Create new article' : 'Edit article'}</p>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#dd0000] text-white text-xs font-black px-6 py-2.5 hover:bg-red-700 transition uppercase tracking-widest disabled:opacity-60"
        >
          {loading ? 'Saving...' : mode === 'new' ? 'Publish Article' : 'Save Changes'}
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 text-xs px-3 py-2">{success}</div>}

      <div className="bg-white border border-gray-200 p-6 space-y-4">
        <Field label="Title" name="title" value={form.title} onChange={handleChange} required />
        <Field label="Excerpt (short description)" name="excerpt" value={form.excerpt} onChange={handleChange} textarea rows={2} required />
        <Field label="Content" name="content" value={form.content} onChange={handleChange} textarea rows={10} required />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#dd0000] bg-white"
            >
              <option value="">Select category</option>
              {categories.map(c => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#dd0000] bg-white"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <Field label="Author" name="author" value={form.author} onChange={handleChange} required />
        <Field label="Image URL" name="image" value={form.image} onChange={handleChange} placeholder="/images/photo.jpg" />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isFeatured"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={handleChange}
            className="w-4 h-4 accent-[#dd0000]"
          />
          <label htmlFor="isFeatured" className="text-xs font-bold text-[#1a1a1a] uppercase tracking-widest">
            Featured Article (show in hero)
          </label>
        </div>
      </div>
    </form>
  );
}

function Field({ label, name, value, onChange, textarea, rows, required, placeholder }: any) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">
        {label} {required && '*'}
      </label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows || 3}
          required={required}
          placeholder={placeholder}
          className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#dd0000] resize-none"
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#dd0000]"
        />
      )}
    </div>
  );
}
