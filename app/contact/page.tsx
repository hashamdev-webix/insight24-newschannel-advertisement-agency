import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">

        {/* Hero */}
        <section className="bg-[#1a1a1a] py-14">
          <div className="max-w-4xl mx-auto px-4">
            <span className="text-[#dd0000] text-xs font-black uppercase tracking-widest">Insight 24</span>
            <h1 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">Contact Us</h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              Have a news tip, advertising inquiry or general question? We would love to hear from you.
              Our team responds within 24 hours.
            </p>
          </div>
        </section>

        <div className="h-1.5 bg-[#dd0000]" />

        <section className="max-w-5xl mx-auto px-4 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Contact info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-base font-black text-[#1a1a1a] uppercase tracking-widest mb-4 border-b-4 border-[#dd0000] pb-2 inline-block">
                  Get in Touch
                </h2>
                <div className="space-y-4 mt-4">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 bg-[#dd0000] shrink-0 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</p>
                      <p className="text-sm text-[#1a1a1a] font-semibold">news@insight24.com</p>
                      <p className="text-sm text-[#1a1a1a] font-semibold">ads@insight24.com</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-9 h-9 bg-[#dd0000] shrink-0 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone</p>
                      <p className="text-sm text-[#1a1a1a] font-semibold">+1 (555) 024-2400</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-9 h-9 bg-[#dd0000] shrink-0 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Address</p>
                      <p className="text-sm text-[#1a1a1a] font-semibold leading-relaxed">
                        24 Media House, News Street<br />
                        London, EC1A 1BB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div className="bg-[#f5f5f5] border border-gray-200 p-5">
                <p className="text-[10px] font-black text-[#1a1a1a] uppercase tracking-widest mb-3">Quick Actions</p>
                <div className="space-y-2">
                  <Link href="/advertise" className="flex items-center gap-2 text-sm text-[#dd0000] hover:underline font-semibold">
                    → Advertise With Us
                  </Link>
                  <Link href="/about" className="flex items-center gap-2 text-sm text-[#1a1a1a] hover:text-[#dd0000] transition font-semibold">
                    → About Insight 24
                  </Link>
                  <a href="mailto:news@insight24.com" className="flex items-center gap-2 text-sm text-[#1a1a1a] hover:text-[#dd0000] transition font-semibold">
                    → Submit a News Tip
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <h2 className="text-base font-black text-[#1a1a1a] uppercase tracking-widest mb-4 border-b-4 border-[#dd0000] pb-2 inline-block">
                Send a Message
              </h2>
              <form className="mt-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#dd0000] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#dd0000] transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (000) 000-0000"
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#dd0000] transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">
                    Subject
                  </label>
                  <select className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#dd0000] transition bg-white">
                    <option value="">Select a subject</option>
                    <option>General Enquiry</option>
                    <option>Advertising Enquiry</option>
                    <option>News Tip / Story</option>
                    <option>Editorial Feedback</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Write your message here..."
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#dd0000] transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#dd0000] text-white font-black text-sm py-4 hover:bg-red-700 transition uppercase tracking-widest"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
