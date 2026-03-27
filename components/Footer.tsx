import Link from 'next/link';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'News', href: '/category/world' },
  { label: 'Business', href: '/category/business' },
  { label: 'Technology', href: '/category/tech' },
  { label: 'World', href: '/category/world' },
  { label: 'Local News', href: '/category/local-news' },
  { label: 'Entertainment', href: '/category/entertainment' },
  { label: 'Health', href: '/category/health' },
  { label: 'Sport', href: '/category/sport' },
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Advertise With Us', href: '/advertise' },
  { label: 'Terms of Use', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-[#dd0000] px-2 py-1 flex items-center justify-center">
                <span className="text-white font-black text-lg tracking-widest leading-none">INSIGHT</span>
              </div>
              <div className="bg-white px-2 py-1 flex items-center justify-center">
                <span className="text-[#1a1a1a] font-black text-lg tracking-widest leading-none">24</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted source for breaking news, in-depth reporting, and professional advertising opportunities.
            </p>
            {/* Social media icons */}
            <div className="flex items-center gap-3 mt-5">
              <a href="https://www.facebook.com/1nsight24/" aria-label="Facebook" className="w-8 h-8 bg-[#333] hover:bg-[#dd0000] flex items-center justify-center transition rounded-sm">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
             
              <a href="https://www.instagram.com/insight_24_/	" aria-label="Instagram" className="w-8 h-8 bg-[#333] hover:bg-[#dd0000] flex items-center justify-center transition rounded-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@insight24talks" aria-label="YouTube" className="w-8 h-8 bg-[#333] hover:bg-[#dd0000] flex items-center justify-center transition rounded-sm">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon fill="#1a1a1a" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest mb-4 text-white border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.slice(0, 5).map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest mb-4 text-white border-b border-gray-700 pb-2">
              Categories
            </h3>
            <ul className="space-y-2">
              {quickLinks.slice(5).map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest mb-4 text-white border-b border-gray-700 pb-2">
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Advertise CTA */}
            <Link
              href="/advertise"
              className="inline-block mt-5 bg-[#dd0000] text-white text-xs font-black px-4 py-2 hover:bg-red-700 transition uppercase tracking-widest"
            >
              Advertise With Us
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-[#dd0000] px-1.5 py-0.5">
              <span className="text-white font-black text-xs tracking-widest">INSIGHT</span>
            </div>
            <div className="bg-white px-1.5 py-0.5">
              <span className="text-[#1a1a1a] font-black text-xs tracking-widest">24</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs text-center">
            © {new Date().getFullYear()} Insight 24 – NewsChannel Advertisement Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-500 hover:text-white transition text-xs">Terms</a>
            <a href="#" className="text-gray-500 hover:text-white transition text-xs">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-white transition text-xs">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
