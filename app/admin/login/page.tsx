'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || 'Login failed'); return; }
    router.push('/admin');
  }

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT: Login Form ── */}
      <div className="flex-1 flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Image src="/logo.png" alt="Insight 24" width={120} height={40} className="h-10 w-auto object-contain" />
          </div>

          <p className="text-xs font-black text-[#dd0000] uppercase tracking-widest mb-1">Admin Panel</p>
          <h1 className="text-2xl font-black text-[#1a1a1a] mb-1">Welcome back</h1>
          <p className="text-sm text-gray-400 mb-8">Sign in to manage your content and settings.</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2.5 mb-5 rounded-sm">
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@insight24.com"
                required
                autoComplete="email"
                className="w-full border border-gray-200 px-4 py-3 text-sm text-[#1a1a1a] focus:outline-none focus:border-[#dd0000] transition bg-gray-50 focus:bg-white placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full border border-gray-200 px-4 py-3 pr-10 text-sm text-[#1a1a1a] focus:outline-none focus:border-[#dd0000] transition bg-gray-50 focus:bg-white placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#dd0000] text-white font-black text-sm py-3.5 hover:bg-red-700 transition uppercase tracking-widest disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">
              Default credentials: <span className="text-gray-600 font-semibold">admin@insight24.com</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Branding Panel ── */}
      <div className="hidden lg:flex w-[480px] xl:w-[560px] bg-[#1a1a1a] flex-col items-center justify-center px-12 relative overflow-hidden">

        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#dd0000]/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#dd0000]/10 rounded-full translate-y-24 -translate-x-24" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-white/5 rounded-full" />

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/logo.png"
              alt="Insight 24"
              width={200}
              height={70}
              className="h-20 w-auto object-contain brightness-0 invert"
            />
          </div>

          <div className="w-12 h-0.5 bg-[#dd0000] mx-auto mb-6" />

          <h2 className="text-2xl font-black text-white mb-3 leading-tight">
            NewsChannel &<br />Advertisement Agency
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto mb-10">
            Manage your news content, advertising campaigns, and engage with your 100,000+ daily readers.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
            {[
              { value: '100K+', label: 'Daily Readers' },
              { value: '2.5M+', label: 'Page Views' },
              { value: '65%', label: 'Return Visitors' },
              { value: '4.2 min', label: 'Avg. Session' },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 px-4 py-3 text-center">
                <p className="text-lg font-black text-white">{s.value}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <p className="absolute bottom-6 text-[10px] text-gray-600 tracking-widest uppercase">
          © {new Date().getFullYear()} Insight 24 — All rights reserved
        </p>
      </div>

    </div>
  );
}
