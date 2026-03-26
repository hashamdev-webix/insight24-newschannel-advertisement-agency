import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const team = [
  { name: 'Aisha Rahman', role: 'Editor-in-Chief', initial: 'AR' },
  { name: 'James Thornton', role: 'Head of News', initial: 'JT' },
  { name: 'Sofia Mendez', role: 'Business Editor', initial: 'SM' },
  { name: 'David Park', role: 'Technology Editor', initial: 'DP' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">

        {/* Page hero */}
        <section className="bg-[#1a1a1a] py-14">
          <div className="max-w-4xl mx-auto px-4">
            <span className="text-[#dd0000] text-xs font-black uppercase tracking-widest">Insight 24</span>
            <h1 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">About Us</h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              Insight 24 is a NewsChannel Advertisement Agency dedicated to delivering trusted news
              and powerful advertising solutions to audiences and brands worldwide.
            </p>
          </div>
        </section>

        {/* Red accent bar */}
        <div className="h-1.5 bg-[#dd0000]" />

        {/* Who we are */}
        <section className="max-w-5xl mx-auto px-4 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-black text-[#1a1a1a] uppercase tracking-widest mb-4 border-b-4 border-[#dd0000] pb-2 inline-block">
                Who We Are
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                Insight 24 is a modern news platform and advertisement agency founded to bridge the gap
                between quality journalism and effective brand communication. We publish breaking news,
                in-depth analysis and feature stories across Business, Technology, World, Local News
                and Entertainment.
              </p>
              <p className="text-gray-700 text-base leading-relaxed">
                Our team of experienced journalists and media professionals work around the clock to
                ensure our readers receive accurate, timely and engaging content. We are committed to
                journalistic integrity and editorial independence in everything we publish.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Founded', value: '2020' },
                { label: 'Daily Readers', value: '100K+' },
                { label: 'Articles Published', value: '10,000+' },
                { label: 'Countries Reached', value: '80+' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#f5f5f5] border border-gray-200 p-6 text-center">
                  <p className="text-3xl font-black text-[#dd0000]">{stat.value}</p>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission / Vision / Goal */}
        <section className="bg-[#f5f5f5] py-14">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border-t-4 border-[#dd0000] p-8">
                <div className="w-10 h-10 bg-[#dd0000] flex items-center justify-center mb-4">
                  <span className="text-white font-black text-sm">M</span>
                </div>
                <h3 className="text-base font-black text-[#1a1a1a] uppercase tracking-widest mb-3">Our Mission</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To deliver accurate, impartial and impactful news that informs and empowers our readers,
                  while providing brands with a premium platform to reach engaged and loyal audiences.
                </p>
              </div>
              <div className="bg-white border-t-4 border-[#1a1a1a] p-8">
                <div className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center mb-4">
                  <span className="text-white font-black text-sm">V</span>
                </div>
                <h3 className="text-base font-black text-[#1a1a1a] uppercase tracking-widest mb-3">Our Vision</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To become the most trusted independent news and advertisement platform, known for
                  editorial excellence, community connection and measurable advertising performance.
                </p>
              </div>
              <div className="bg-white border-t-4 border-[#00498f] p-8">
                <div className="w-10 h-10 bg-[#00498f] flex items-center justify-center mb-4">
                  <span className="text-white font-black text-sm">G</span>
                </div>
                <h3 className="text-base font-black text-[#1a1a1a] uppercase tracking-widest mb-3">Our Goal</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To grow a global community of informed readers while helping businesses of all sizes
                  achieve their marketing goals through targeted, contextual and high-quality advertising.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="max-w-5xl mx-auto px-4 py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-[#1a1a1a] uppercase tracking-widest mb-2">Our Services</h2>
            <div className="w-16 h-1 bg-[#dd0000] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4 border border-gray-200 p-6 hover:border-[#dd0000] transition">
              <div className="w-10 h-10 bg-[#dd0000] shrink-0 flex items-center justify-center text-white font-black text-sm">
                N
              </div>
              <div>
                <h3 className="font-bold text-[#1a1a1a] mb-2 text-sm uppercase tracking-wide">News Publishing</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Breaking news, world events, local coverage, business updates, technology, health,
                  sport and entertainment — published daily by our experienced editorial team.
                </p>
              </div>
            </div>
            <div className="flex gap-4 border border-gray-200 p-6 hover:border-[#dd0000] transition">
              <div className="w-10 h-10 bg-[#1a1a1a] shrink-0 flex items-center justify-center text-white font-black text-sm">
                A
              </div>
              <div>
                <h3 className="font-bold text-[#1a1a1a] mb-2 text-sm uppercase tracking-wide">Digital Advertising</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Banner ads, sidebar placements, sponsored articles and homepage features — flexible
                  packages for every budget with full performance reporting.
                </p>
              </div>
            </div>
            <div className="flex gap-4 border border-gray-200 p-6 hover:border-[#dd0000] transition">
              <div className="w-10 h-10 bg-[#00498f] shrink-0 flex items-center justify-center text-white font-black text-sm">
                S
              </div>
              <div>
                <h3 className="font-bold text-[#1a1a1a] mb-2 text-sm uppercase tracking-wide">Sponsored Content</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Editorial-style branded articles that educate your audience, build credibility and
                  deliver long-term organic visibility on our platform.
                </p>
              </div>
            </div>
            <div className="flex gap-4 border border-gray-200 p-6 hover:border-[#dd0000] transition">
              <div className="w-10 h-10 bg-gray-600 shrink-0 flex items-center justify-center text-white font-black text-sm">
                M
              </div>
              <div>
                <h3 className="font-bold text-[#1a1a1a] mb-2 text-sm uppercase tracking-wide">Media Partnerships</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Long-term media partnerships for brands seeking sustained visibility, including
                  category sponsorships, newsletter features and social media amplification.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-[#1a1a1a] py-14">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-2">Our Team</h2>
              <div className="w-16 h-1 bg-[#dd0000] mx-auto" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="w-20 h-20 bg-[#dd0000] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-black text-xl">{member.initial}</span>
                  </div>
                  <p className="text-white font-bold text-sm">{member.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 py-14 text-center">
          <h2 className="text-2xl font-black text-[#1a1a1a] uppercase tracking-widest mb-3">
            Work With Us
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Ready to advertise with Insight 24 or have a story tip? We would love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/advertise"
              className="bg-[#dd0000] text-white font-black text-sm px-8 py-3 hover:bg-red-700 transition uppercase tracking-widest"
            >
              Advertise With Us
            </Link>
            <Link
              href="/contact"
              className="border-2 border-[#1a1a1a] text-[#1a1a1a] font-bold text-sm px-8 py-3 hover:bg-[#1a1a1a] hover:text-white transition uppercase tracking-widest"
            >
              Contact Us
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
