'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const navItems = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'news', label: 'News', href: '/category/world' },
  {
    id: 'categories',
    label: 'Categories',
    href: '#',
    dropdown: [
      { label: 'Business', href: '/category/business' },
      { label: 'Technology', href: '/category/tech' },
      { label: 'World', href: '/category/world' },
      { label: 'Local News', href: '/category/local-news' },
      { label: 'Entertainment', href: '/category/entertainment' },
    ],
  },
  { id: 'advertise', label: 'Advertise With Us', href: '/advertise' },
  { id: 'about', label: 'About Us', href: '/about' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top brand bar */}
      <div className="bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Insight 24"
              width={200}
              height={160}
              className="h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Right: search + sign in */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-[#333] px-3 py-1.5 rounded-sm">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search news..."
                className="bg-transparent text-white text-xs placeholder-gray-400 outline-none w-32"
              />
            </div>
            <Link
              href="/contact"
              className="text-xs font-semibold text-white bg-[#dd0000] px-3 py-1.5 hover:bg-red-700 transition"
            >
              Sign in
            </Link>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop navigation bar */}
      <nav className="hidden lg:block bg-white border-b-2 border-[#dd0000]">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li key={item.id} className="relative group">
                {item.dropdown ? (
                  <>
                    <button className="flex items-center gap-1 px-4 py-3 text-sm font-semibold text-[#1a1a1a] hover:text-[#dd0000] hover:bg-gray-50 transition border-r border-gray-200 h-full">
                      {item.label}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Dropdown */}
                    <div className="absolute left-0 top-full hidden group-hover:block bg-white border border-gray-200 shadow-lg min-w-[180px] z-50">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm text-[#1a1a1a] hover:bg-[#dd0000] hover:text-white transition border-b border-gray-100 last:border-b-0"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-sm font-semibold text-[#1a1a1a] hover:text-[#dd0000] hover:bg-gray-50 transition border-r border-gray-200"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="lg:hidden bg-[#1a1a1a] border-t border-gray-700">
          {navItems.map((item) => (
            <div key={item.id}>
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => setMobileCatOpen(!mobileCatOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800 border-b border-gray-700"
                  >
                    {item.label}
                    <svg
                      className={`w-4 h-4 transition-transform ${mobileCatOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileCatOpen && (
                    <div className="bg-[#222]">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block pl-8 pr-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-700 border-b border-gray-700"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800 border-b border-gray-700"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* Breaking news ticker */}
      <div className="bg-[#dd0000] text-white">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center gap-3 overflow-hidden">
          <span className="text-xs font-black tracking-widest bg-white text-[#dd0000] px-2 py-0.5 shrink-0">
            BREAKING
          </span>
          <div className="overflow-hidden flex-1">
            <p className="text-xs font-medium whitespace-nowrap animate-marquee">
              Global Climate Summit Reaches Historic Agreement &nbsp;•&nbsp; UK Economy Shows Strong Growth in Latest Quarter &nbsp;•&nbsp; Major Breakthrough in Artificial Intelligence Research &nbsp;•&nbsp; Quantum Computer Achieves New Milestone &nbsp;•&nbsp; Olympic Games Preparations Enter Final Phase &nbsp;•&nbsp;
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
