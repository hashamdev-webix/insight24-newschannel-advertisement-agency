import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const adPackages = [
  {
    name: 'Leaderboard Banner',
    size: '970×90 px',
    placement: 'Top of every page',
    reach: '100,000+ daily',
    price: '$299 / week',
    color: 'bg-[#dd0000]',
    icon: '▬',
  },
  {
    name: 'Sidebar Rectangle',
    size: '300×250 px',
    placement: 'Right sidebar on all pages',
    reach: '80,000+ daily',
    price: '$199 / week',
    color: 'bg-[#1a1a1a]',
    icon: '▪',
  },
  {
    name: 'Sponsored Article',
    size: 'Full article format',
    placement: 'Homepage featured + category pages',
    reach: '50,000+ readers',
    price: '$499 / article',
    color: 'bg-[#00498f]',
    icon: '✦',
  },
  {
    name: 'Homepage Featured Ad',
    size: '728×90 px',
    placement: 'Between homepage sections',
    reach: '120,000+ daily',
    price: '$399 / week',
    color: 'bg-[#333]',
    icon: '★',
  },
];

const stats = [
  { value: '100K+', label: 'Daily Readers' },
  { value: '2.5M+', label: 'Monthly Page Views' },
  { value: '65%', label: 'Return Visitors' },
  { value: '4.2 min', label: 'Avg. Time on Site' },
];

export default function AdvertisePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">

        {/* Hero */}
        <section className="bg-[#1a1a1a] py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="text-[#dd0000] text-xs font-black uppercase tracking-widest">Insight 24</span>
            <h1 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4 leading-tight">
              Advertise With Us
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              Connect your brand with over 100,000 engaged daily readers across news, business,
              technology and entertainment. Professional placements, real results.
            </p>
            <a
              href="#contact-form"
              className="inline-block bg-[#dd0000] text-white font-black text-sm px-10 py-4 hover:bg-red-700 transition uppercase tracking-widest"
            >
              Request Advertisement
            </a>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-[#dd0000] py-6">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                  <p className="text-red-200 text-xs font-semibold uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why advertise */}
        <section className="max-w-5xl mx-auto px-4 py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-[#1a1a1a] uppercase tracking-widest mb-2">
              Why Advertise with Insight 24?
            </h2>
            <div className="w-16 h-1 bg-[#dd0000] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Highly Engaged Audience',
                desc: 'Our readers spend an average of 4+ minutes per visit, actively consuming news and information — ideal for brand recall.',
                icon: '👁',
              },
              {
                title: 'Targeted Reach',
                desc: 'Place ads alongside relevant content — Business, Technology, World, Entertainment — ensuring your message reaches the right readers.',
                icon: '🎯',
              },
              {
                title: 'Professional Placements',
                desc: 'Premium ad positions on a credible news platform lend authority and trust to your brand through association.',
                icon: '✅',
              },
              {
                title: 'Flexible Packages',
                desc: 'Whether you are a local business or a global brand, we have ad packages to suit every budget and objective.',
                icon: '📦',
              },
              {
                title: 'Performance Reporting',
                desc: 'Receive detailed weekly reports on impressions, clicks and engagement so you always know your return on investment.',
                icon: '📊',
              },
              {
                title: 'Sponsored Content',
                desc: 'Publish branded articles written in our editorial style to educate your audience and build thought leadership.',
                icon: '✍️',
              },
            ].map((item) => (
              <div key={item.title} className="border border-gray-200 p-6 hover:border-[#dd0000] transition">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#1a1a1a] mb-2 text-sm uppercase tracking-wide">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ad packages */}
        <section className="bg-[#f5f5f5] py-14">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-black text-[#1a1a1a] uppercase tracking-widest mb-2">
                Advertising Packages
              </h2>
              <div className="w-16 h-1 bg-[#dd0000] mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adPackages.map((pkg) => (
                <div key={pkg.name} className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition">
                  <div className={`${pkg.color} px-6 py-4 flex items-center gap-3`}>
                    <span className="text-white text-2xl">{pkg.icon}</span>
                    <h3 className="text-white font-black text-base uppercase tracking-wide">{pkg.name}</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Size</p>
                        <p className="text-sm font-semibold text-[#1a1a1a]">{pkg.size}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Daily Reach</p>
                        <p className="text-sm font-semibold text-[#1a1a1a]">{pkg.reach}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Placement</p>
                        <p className="text-sm font-semibold text-[#1a1a1a]">{pkg.placement}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <p className="text-xl font-black text-[#dd0000]">{pkg.price}</p>
                      <a
                        href="#contact-form"
                        className="bg-[#1a1a1a] text-white text-xs font-bold px-4 py-2 hover:bg-[#dd0000] transition uppercase tracking-wide"
                      >
                        Request
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact / Request Form */}
        <section id="contact-form" className="max-w-3xl mx-auto px-4 py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-[#1a1a1a] uppercase tracking-widest mb-2">
              Request Advertisement
            </h2>
            <div className="w-16 h-1 bg-[#dd0000] mx-auto mb-4" />
            <p className="text-gray-600 text-sm">
              Fill in the form below and our advertising team will respond within 24 hours.
            </p>
          </div>
          <form className="space-y-5 border border-gray-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Name *</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#dd0000] transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Email *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#dd0000] transition"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Phone</label>
                <input
                  type="tel"
                  placeholder="+1 (000) 000-0000"
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#dd0000] transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Ad Package</label>
                <select className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#dd0000] transition bg-white">
                  <option value="">Select a package</option>
                  <option>Leaderboard Banner — $299/week</option>
                  <option>Sidebar Rectangle — $199/week</option>
                  <option>Sponsored Article — $499/article</option>
                  <option>Homepage Featured Ad — $399/week</option>
                  <option>Custom Package</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about your advertising goals, target audience, and any specific requirements..."
                className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#dd0000] transition resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#dd0000] text-white font-black text-sm py-4 hover:bg-red-700 transition uppercase tracking-widest"
            >
              Request Advertisement
            </button>
          </form>
        </section>

      </main>

      <Footer />
    </div>
  );
}
