'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: '▦' },
  { href: '/admin/articles', label: 'Articles', icon: '📰' },
  { href: '/admin/categories', label: 'Categories', icon: '📂' },
  { href: '/admin/ads', label: 'Advertisements', icon: '📢' },
  { href: '/admin/ad-requests', label: 'Ad Requests', icon: '📩' },
  { href: '/admin/messages', label: 'Messages', icon: '✉️' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't show sidebar on login page
  if (pathname === '/admin/login') return <>{children}</>;

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-[#1a1a1a] transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-700">
          <Image
            src="/logo.png"
            alt="Insight 24"
            width={100}
            height={34}
            className="h-8 w-auto object-contain"
          />
          <span className="text-gray-400 text-xs">Admin</span>
        </div>

        <nav className="px-3 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded transition ${
                pathname === link.href
                  ? 'bg-[#dd0000] text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-3">
          <Link href="/" className="flex items-center gap-2 px-3 py-2 text-xs text-gray-400 hover:text-white transition">
            ← View Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-xs text-gray-400 hover:text-red-400 transition"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1 text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest">
            {navLinks.find((l) => l.href === pathname)?.label || 'Admin Panel'}
          </h1>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
