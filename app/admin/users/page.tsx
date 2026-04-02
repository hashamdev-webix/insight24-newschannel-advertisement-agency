'use client';

import { useEffect, useState } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  createdAt: string;
}

const emptyForm = { name: '', email: '', password: '', role: 'editor' as 'admin' | 'editor' };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState(emptyForm);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    setUsers(data.users || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setError('');
    setModalOpen(true);
  }

  function openEdit(user: User) {
    setEditing(user);
    setForm({ name: user.name, email: user.email, password: '', role: user.role });
    setError('');
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
    setError('');
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const url = editing ? `/api/admin/users/${editing._id}` : '/api/admin/users';
    const method = editing ? 'PUT' : 'POST';

    const body: any = { name: form.name, email: form.email, role: form.role };
    if (form.password) body.password = form.password;
    if (!editing) body.password = form.password;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    setSaving(false);

    if (!res.ok) { setError(data.error || 'Failed to save'); return; }

    setSuccess(editing ? 'User updated!' : 'User created!');
    setTimeout(() => setSuccess(''), 3000);
    closeModal();
    load();
  }

  async function handleDelete(user: User) {
    if (!confirm(`Delete user "${user.name}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/users/${user._id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) { alert(data.error); return; }
    load();
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">{users.length} registered users</p>
        <button
          onClick={openCreate}
          className="bg-[#dd0000] text-white text-xs font-black px-4 py-2 hover:bg-red-700 transition uppercase tracking-wide"
        >
          + New User
        </button>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-xs px-3 py-2">{success}</div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-400">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">No users found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[#1a1a1a] text-white">
              <tr>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-black">Name</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-black hidden md:table-cell">Email</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-black">Role</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-black hidden lg:table-cell">Joined</th>
                <th className="text-right px-4 py-3 text-xs uppercase tracking-widest font-black">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#1a1a1a] rounded-full flex items-center justify-center shrink-0">
                        <span className="text-white text-xs font-black">{user.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <span className="font-semibold text-[#1a1a1a]">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-black px-2 py-0.5 uppercase tracking-wide ${
                      user.role === 'admin'
                        ? 'bg-[#dd0000] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400 hidden lg:table-cell">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => openEdit(user)}
                        className="text-xs font-semibold text-[#1a1a1a] hover:text-[#dd0000] transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user)}
                        className="text-xs font-semibold text-[#dd0000] hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-md shadow-xl">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#1a1a1a]">
              <h2 className="text-sm font-black text-white uppercase tracking-widest">
                {editing ? 'Edit User' : 'Create User'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2">{error}</div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  required
                  placeholder="John Smith"
                  className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#dd0000]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Email Address *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  required
                  placeholder="user@insight24.com"
                  className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#dd0000]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">
                  Password {editing ? '(leave blank to keep current)' : '*'}
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  required={!editing}
                  placeholder="Min 6 characters"
                  minLength={editing ? 0 : 6}
                  className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#dd0000]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Role</label>
                <select
                  value={form.role}
                  onChange={e => setForm(p => ({ ...p, role: e.target.value as 'admin' | 'editor' }))}
                  className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#dd0000] bg-white"
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
                <p className="text-[10px] text-gray-400 mt-1">Admins have full access. Editors can manage content only.</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 border border-gray-300 text-[#1a1a1a] text-xs font-bold py-2.5 hover:bg-gray-50 transition uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-[#dd0000] text-white text-xs font-black py-2.5 hover:bg-red-700 transition uppercase tracking-widest disabled:opacity-60"
                >
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
