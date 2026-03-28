import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import Link from 'next/link';
import Image from 'next/image';
import {
  getFeaturedArticle,
  getTrendingArticles,
  getArticlesByCategory,
  getAllPublishedArticles,
  type Article,
} from '@/lib/fetch-data';

export const revalidate = 60; // revalidate every 60 seconds

export default async function Home() {
  const [
    featuredArticle,
    trendingArticles,
    worldArticles,
    businessArticles,
    techArticles,
    healthArticles,
    sportArticles,
    entertainmentArticles,
    localArticles,
    allArticles,
  ] = await Promise.all([
    getFeaturedArticle(),
    getTrendingArticles(6),
    getArticlesByCategory('world', 4),
    getArticlesByCategory('business', 3),
    getArticlesByCategory('tech', 4),
    getArticlesByCategory('health', 3),
    getArticlesByCategory('sport', 3),
    getArticlesByCategory('entertainment', 3),
    getArticlesByCategory('local-news', 4),
    getAllPublishedArticles(25),
  ]);

  if (!featuredArticle) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-sm">No articles published yet. Run the seeder first.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Top Leaderboard Ad */}
      <div className="max-w-7xl mx-auto px-4 pt-3 w-full">
        <AdBanner size="leaderboard" />
      </div>

      <main className="flex-1">

        {/* ── HERO SECTION ── */}
        <section className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-gray-200">

            {/* Main featured story */}
            <div className="lg:col-span-2 border-r border-gray-200">
              <Link href={`/articles/${featuredArticle.slug}`} className="group block">
                <div className="relative h-72 md:h-96 overflow-hidden bg-gray-200">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-xs font-black bg-[#dd0000] text-white px-2 py-1 mr-2">● LIVE</span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {featuredArticle.categoryName || featuredArticle.category}
                    </span>
                    <h1 className="text-white text-2xl md:text-3xl font-bold mt-2 leading-tight group-hover:text-gray-200 transition line-clamp-3">
                      {featuredArticle.title}
                    </h1>
                    <p className="text-gray-300 text-sm mt-1 line-clamp-2 hidden md:block">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right sidebar – top stories */}
            <div className="divide-y divide-gray-200">
              <div className="px-4 py-3 bg-[#1a1a1a]">
                <h2 className="text-sm font-black text-white uppercase tracking-widest">Top Stories</h2>
              </div>
              {trendingArticles.slice(0, 5).map((article) => (
                <Link key={article._id} href={`/articles/${article.slug}`} className="group flex gap-3 p-3 hover:bg-gray-50 transition">
                  <div className="relative w-20 h-16 shrink-0 bg-gray-200 overflow-hidden">
                    <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-[#dd0000] uppercase tracking-wider mb-0.5">
                      {article.categoryName || article.category}
                    </p>
                    <h3 className="text-sm font-semibold text-[#1a1a1a] leading-tight line-clamp-3 group-hover:text-[#dd0000] transition">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── WORLD NEWS ── */}
        {worldArticles.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 mb-8">
            <SectionHeader title="World" href="/category/world" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-200 border-t-0">
              {worldArticles.map((article, i) => (
                <Link
                  key={article._id}
                  href={`/articles/${article.slug}`}
                  className={`group block p-4 hover:bg-gray-50 transition ${i < worldArticles.length - 1 ? 'border-r border-gray-200' : ''}`}
                >
                  <div className="relative h-36 overflow-hidden bg-gray-200 mb-3">
                    <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <h3 className="text-sm font-bold text-[#1a1a1a] leading-tight line-clamp-3 group-hover:text-[#dd0000] transition">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{article.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── INLINE AD ── */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <AdBanner size="inline" />
        </div>

        {/* ── BUSINESS + SIDEBAR AD ── */}
        {businessArticles.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <SectionHeader title="Business" href="/category/business" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200 border-t-0">
                  {businessArticles.map((article, i) => (
                    <Link
                      key={article._id}
                      href={`/articles/${article.slug}`}
                      className={`group block p-4 hover:bg-gray-50 transition ${i < businessArticles.length - 1 ? 'border-r border-gray-200' : ''}`}
                    >
                      <div className="relative h-40 overflow-hidden bg-gray-200 mb-3">
                        <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition duration-300" />
                      </div>
                      <h3 className="text-sm font-bold text-[#1a1a1a] leading-tight line-clamp-3 group-hover:text-[#dd0000] transition">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{article.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
              {/* Sidebar Ad */}
              <div className="lg:col-span-1">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center mb-1">Advertisement</p>
                <div className="bg-gradient-to-b from-gray-100 to-gray-200 border border-dashed border-gray-300 flex flex-col items-center justify-center gap-3 h-64 cursor-pointer hover:from-gray-200 hover:to-gray-300 transition group">
                  <div className="w-10 h-10 bg-[#dd0000] flex items-center justify-center rounded-sm">
                    <span className="text-white text-sm font-black">AD</span>
                  </div>
                  <p className="text-sm font-bold text-gray-600 group-hover:text-[#dd0000] transition text-center px-4">Sidebar Ad</p>
                  <p className="text-xs text-gray-400 text-center px-4">300×250</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── ENTERTAINMENT ── */}
        {entertainmentArticles.length > 0 && (
          <section className="bg-[#f5f5f5] py-8 mb-0">
            <div className="max-w-7xl mx-auto px-4">
              <SectionHeader title="Entertainment" href="/category/entertainment" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {entertainmentArticles.map((article) => (
                  <Link key={article._id} href={`/articles/${article.slug}`} className="group bg-white border border-gray-200 hover:shadow-md transition block">
                    <div className="relative h-44 overflow-hidden bg-gray-200">
                      <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition duration-300" />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-bold text-[#dd0000] uppercase tracking-wider mb-1">Entertainment</p>
                      <h3 className="text-sm font-bold text-[#1a1a1a] leading-tight line-clamp-3 group-hover:text-[#dd0000] transition">
                        {article.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── INLINE AD #2 ── */}
        <div className="max-w-7xl mx-auto px-4 my-8">
          <AdBanner size="inline" />
        </div>

        {/* ── TECHNOLOGY ── */}
        {techArticles.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 mb-8">
            <SectionHeader title="Technology" href="/category/tech" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-200 border-t-0">
              {techArticles.map((article, i) => (
                <Link
                  key={article._id}
                  href={`/articles/${article.slug}`}
                  className={`group block p-4 hover:bg-gray-50 transition ${i < techArticles.length - 1 ? 'border-r border-gray-200' : ''}`}
                >
                  <div className="relative h-32 overflow-hidden bg-gray-200 mb-3">
                    <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <h3 className="text-sm font-bold text-[#1a1a1a] leading-tight line-clamp-3 group-hover:text-[#dd0000] transition">
                    {article.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── LOCAL NEWS + SIDEBAR ── */}
        <section className="max-w-7xl mx-auto px-4 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <SectionHeader title="Local News" href="/category/local-news" />
              {localArticles.length > 0 ? (
                <div className="divide-y divide-gray-200 border border-gray-200 border-t-0">
                  {localArticles.map((article) => (
                    <Link key={article._id} href={`/articles/${article.slug}`} className="group flex gap-4 p-4 hover:bg-gray-50 transition">
                      <div className="relative w-28 h-20 shrink-0 overflow-hidden bg-gray-200">
                        <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-[#dd0000] uppercase tracking-wider mb-1">Local News</p>
                        <h3 className="text-sm font-bold text-[#1a1a1a] leading-tight line-clamp-2 group-hover:text-[#dd0000] transition">
                          {article.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{article.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="border border-gray-200 border-t-0 p-8 text-center text-xs text-gray-400">
                  No local news articles yet.
                </div>
              )}
            </div>
            {/* Sidebar Half Page Ad */}
            <div className="lg:col-span-1">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center mb-1">Advertisement</p>
              <div className="bg-gradient-to-b from-gray-100 to-gray-200 border border-dashed border-gray-300 flex flex-col items-center justify-center gap-3 h-72 cursor-pointer hover:from-gray-200 hover:to-gray-300 transition group">
                <div className="w-10 h-10 bg-[#dd0000] flex items-center justify-center rounded-sm">
                  <span className="text-white text-sm font-black">AD</span>
                </div>
                <p className="text-sm font-bold text-gray-600 group-hover:text-[#dd0000] transition text-center px-4">Sidebar Ad</p>
                <p className="text-xs text-gray-400 text-center px-4">300×600</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── HEALTH & SPORT ── */}
        <section className="bg-[#1a1a1a] py-8 mb-0">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-600">
                  <h2 className="text-base font-black text-white uppercase tracking-widest">Health</h2>
                  <Link href="/category/health" className="text-xs text-[#dd0000] hover:underline font-semibold">View all</Link>
                </div>
                <div className="space-y-3">
                  {healthArticles.map((article) => (
                    <Link key={article._id} href={`/articles/${article.slug}`} className="group flex gap-3">
                      <div className="relative w-20 h-16 shrink-0 overflow-hidden bg-gray-700">
                        <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition" />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-200 leading-tight line-clamp-3 group-hover:text-white transition">
                        {article.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-600">
                  <h2 className="text-base font-black text-white uppercase tracking-widest">Sport</h2>
                  <Link href="/category/sport" className="text-xs text-[#dd0000] hover:underline font-semibold">View all</Link>
                </div>
                <div className="space-y-3">
                  {sportArticles.map((article) => (
                    <Link key={article._id} href={`/articles/${article.slug}`} className="group flex gap-3">
                      <div className="relative w-20 h-16 shrink-0 overflow-hidden bg-gray-700">
                        <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition" />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-200 leading-tight line-clamp-3 group-hover:text-white transition">
                        {article.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MORE STORIES ── */}
        {allArticles.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 py-8 mb-4">
            <SectionHeader title="More Stories" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {allArticles.slice(10, 25).map((article) => (
                <Link key={article._id} href={`/articles/${article.slug}`} className="group block">
                  <div className="relative h-28 overflow-hidden bg-gray-200 mb-2">
                    <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <p className="text-[10px] font-bold text-[#dd0000] uppercase tracking-wider mb-0.5">
                    {article.categoryName || article.category}
                  </p>
                  <h3 className="text-xs font-semibold text-[#1a1a1a] leading-tight line-clamp-3 group-hover:text-[#dd0000] transition">
                    {article.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── ADVERTISE WITH US CTA ── */}
        <section className="bg-[#dd0000] py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Advertise With Insight 24</h2>
            <p className="text-red-100 text-base mb-6 max-w-2xl mx-auto">
              Reach over 100,000 daily readers across our platform. Banner ads, sponsored articles,
              sidebar placements and more — tailored to your audience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/advertise" className="bg-white text-[#dd0000] font-black text-sm px-8 py-3 hover:bg-gray-100 transition uppercase tracking-widest">
                Request Advertisement
              </Link>
              <Link href="/contact" className="border-2 border-white text-white font-bold text-sm px-8 py-3 hover:bg-white/10 transition uppercase tracking-widest">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-center justify-between border-b-4 border-[#dd0000] mb-0 pb-2">
      <h2 className="text-base font-black text-[#1a1a1a] uppercase tracking-widest">{title}</h2>
      {href && (
        <Link href={href} className="text-xs text-[#dd0000] hover:underline font-semibold">
          View all
        </Link>
      )}
    </div>
  );
}
