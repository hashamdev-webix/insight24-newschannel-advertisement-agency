import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import { getArticlesByCategory, getTrendingArticles, getAllSlugs } from '@/lib/fetch-data';
import { formatDate } from '@/lib/utils';

export const revalidate = 60;
export const dynamicParams = true;

const categoryLabels: Record<string, string> = {
  world: 'World News',
  uk: 'UK News',
  business: 'Business',
  tech: 'Technology',
  science: 'Science & Environment',
  health: 'Health',
  sport: 'Sport',
  entertainment: 'Entertainment',
  'local-news': 'Local News',
};

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories: string[] = ['world', 'uk', 'business', 'tech', 'science', 'health', 'sport', 'entertainment', 'local-news'];
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const label = categoryLabels[category] || category;
  return {
    title: `${label} – Insight 24`,
    description: `Latest ${label.toLowerCase()} news from Insight 24`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  let categoryArticles: Awaited<ReturnType<typeof getArticlesByCategory>> = [];
  let trendingArticles: Awaited<ReturnType<typeof getTrendingArticles>> = [];
  try {
    [categoryArticles, trendingArticles] = await Promise.all([
      getArticlesByCategory(category, 20),
      getTrendingArticles(5),
    ]);
  } catch {
    // DB unavailable — render empty state
  }
  const label = categoryLabels[category] || category;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Page header */}
      <div className="bg-[#1a1a1a] border-b-4 border-[#dd0000]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-white">{label}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-widest">{label}</h1>
          <p className="text-gray-400 text-sm mt-1">
            Latest updates and stories from {label.toLowerCase()}
          </p>
        </div>
      </div>

      <main className="flex-1 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Main articles */}
            <div className="lg:col-span-3">
              {categoryArticles.length > 0 ? (
                <>
                  {/* First article featured */}
                  <Link href={`/articles/${categoryArticles[0].slug}`} className="group flex gap-5 mb-6 pb-6 border-b border-gray-200">
                    <div className="relative w-48 h-32 shrink-0 overflow-hidden bg-gray-200">
                      <Image
                        src={categoryArticles[0].image}
                        alt={categoryArticles[0].title}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                        priority
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black text-[#dd0000] uppercase tracking-widest mb-1">{label}</p>
                      <h2 className="text-xl font-black text-[#1a1a1a] leading-tight line-clamp-3 group-hover:text-[#dd0000] transition mb-2">
                        {categoryArticles[0].title}
                      </h2>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{categoryArticles[0].excerpt}</p>
                      <p className="text-xs text-gray-400">{formatDate(categoryArticles[0].publishedAt)}</p>
                    </div>
                  </Link>

                  {/* Remaining articles list */}
                  <div className="divide-y divide-gray-200">
                    {categoryArticles.slice(1).map((article) => (
                      <Link key={article.id} href={`/articles/${article.slug}`} className="group flex gap-4 py-4 hover:bg-gray-50 transition -mx-2 px-2">
                        <div className="relative w-28 h-20 shrink-0 overflow-hidden bg-gray-200">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-[#1a1a1a] leading-tight line-clamp-3 group-hover:text-[#dd0000] transition mb-1">
                            {article.title}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-1">{article.excerpt}</p>
                          <p className="text-xs text-gray-400 mt-1">{formatDate(article.publishedAt)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16 border border-dashed border-gray-300">
                  <p className="text-gray-500 text-base font-semibold">No articles found in this category yet.</p>
                  <Link href="/" className="text-[#dd0000] text-sm mt-3 inline-block hover:underline">← Back to Home</Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Trending */}
              <div>
                <div className="bg-[#1a1a1a] px-4 py-3 mb-0">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">Trending</h3>
                </div>
                <div className="border border-t-0 border-gray-200 divide-y divide-gray-200">
                  {trendingArticles.map((article, i) => (
                    <Link key={article.id} href={`/articles/${article.slug}`} className="group flex gap-3 p-3 hover:bg-gray-50 transition">
                      <span className="text-lg font-black text-[#dd0000] w-5 shrink-0">{i + 1}</span>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-[#dd0000] uppercase tracking-wider mb-0.5">
                          {article.categoryName || article.category}
                        </p>
                        <h4 className="text-xs font-semibold text-[#1a1a1a] leading-tight line-clamp-3 group-hover:text-[#dd0000] transition">
                          {article.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sidebar Ad */}
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center mb-1">Advertisement</p>
                <div className="bg-gradient-to-b from-gray-100 to-gray-200 border border-dashed border-gray-300 flex flex-col items-center justify-center gap-3 h-64 cursor-pointer hover:from-gray-200 hover:to-gray-300 transition group">
                  <div className="w-10 h-10 bg-[#dd0000] flex items-center justify-center rounded-sm">
                    <span className="text-white text-sm font-black">AD</span>
                  </div>
                  <p className="text-sm font-bold text-gray-600 group-hover:text-[#dd0000] transition text-center px-4">
                    Your Ad Here
                  </p>
                  <Link href="/advertise" className="text-xs text-[#dd0000] hover:underline font-semibold">
                    Advertise with us
                  </Link>
                </div>
              </div>

              {/* Categories nav */}
              <div>
                <div className="bg-[#1a1a1a] px-4 py-3">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">Categories</h3>
                </div>
                <div className="border border-t-0 border-gray-200 divide-y divide-gray-200">
                  {['world', 'business', 'tech', 'entertainment', 'local-news', 'health', 'sport'].map((cat) => (
                    <Link
                      key={cat}
                      href={`/category/${cat}`}
                      className="block px-4 py-2.5 text-sm font-semibold text-[#1a1a1a] hover:text-[#dd0000] hover:bg-gray-50 transition"
                    >
                      {categoryLabels[cat] || cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom ad */}
          <div className="mt-8">
            <AdBanner size="inline" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
