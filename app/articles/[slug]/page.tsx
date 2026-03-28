import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import { getArticleBySlug, getArticlesByCategory, getTrendingArticles, getAllSlugs } from '@/lib/fetch-data';
import { formatDate } from '@/lib/utils';

export const revalidate = 60;

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found – Insight 24',
      description: 'The article you are looking for could not be found.',
    };
  }

  return {
    title: `${article.title} – Insight 24`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-black text-[#1a1a1a] mb-4">Article Not Found</h1>
            <p className="text-gray-500 mb-6">The article you are looking for could not be found.</p>
            <Link href="/" className="text-[#dd0000] hover:underline font-semibold">
              ← Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const [relatedArticlesRaw, trendingArticles] = await Promise.all([
    getArticlesByCategory(article.category, 4),
    getTrendingArticles(5),
  ]);
  const relatedArticles = relatedArticlesRaw.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">

        {/* Breadcrumb */}
        <div className="bg-[#f5f5f5] border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-2.5">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Link href="/" className="hover:text-[#dd0000] transition font-semibold">Home</Link>
              <span>/</span>
              <Link href={`/category/${article.category}`} className="hover:text-[#dd0000] transition font-semibold capitalize">
                {article.categoryName || article.category}
              </Link>
              <span>/</span>
              <span className="text-[#1a1a1a] truncate font-semibold">{article.title}</span>
            </div>
          </div>
        </div>

        {/* Article + Sidebar layout */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

            {/* Article content */}
            <article className="lg:col-span-3">

              {/* Category + date */}
              <div className="flex items-center gap-3 mb-4">
                <Link
                  href={`/category/${article.category}`}
                  className="bg-[#dd0000] text-white text-xs font-black px-3 py-1 uppercase tracking-widest hover:bg-red-700 transition"
                >
                  {article.categoryName || article.category}
                </Link>
                <span className="text-xs text-gray-400">{formatDate(article.publishedAt)}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-4 leading-tight">
                {article.title}
              </h1>

              {/* Excerpt */}
              <p className="text-lg text-gray-600 mb-5 leading-relaxed border-l-4 border-[#dd0000] pl-4">
                {article.excerpt}
              </p>

              {/* Author + share */}
              <div className="flex items-center justify-between py-4 border-y border-gray-200 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#1a1a1a] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-black">{article.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1a1a1a]">By {article.author}</p>
                    <p className="text-xs text-gray-400">Published {formatDate(article.publishedAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full bg-[#1877f2] text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition">f</button>
                  <button className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition">𝕏</button>
                  <button className="w-8 h-8 rounded-full bg-[#0077b5] text-white flex items-center justify-center text-xs font-bold hover:opacity-90 transition">in</button>
                </div>
              </div>

              {/* Featured image */}
              <div className="relative h-80 md:h-[460px] mb-6 overflow-hidden bg-gray-200">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Inline Ad between image and content */}
              <AdBanner size="inline" />

              {/* Article body */}
              <div className="mt-6 space-y-5">
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-base text-[#1a1a1a] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Share footer */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs font-black text-[#1a1a1a] uppercase tracking-widest mb-3">Share this story</p>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 bg-[#1877f2] text-white text-xs font-bold px-4 py-2 hover:opacity-90 transition">
                    <span>f</span> Facebook
                  </button>
                  <button className="flex items-center gap-2 bg-[#1a1a1a] text-white text-xs font-bold px-4 py-2 hover:opacity-90 transition">
                    <span>𝕏</span> Twitter
                  </button>
                  <button className="flex items-center gap-2 bg-gray-200 text-[#1a1a1a] text-xs font-bold px-4 py-2 hover:bg-gray-300 transition">
                    Copy Link
                  </button>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Sidebar Ad */}
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center mb-1">Advertisement</p>
                <div className="bg-gradient-to-b from-gray-100 to-gray-200 border border-dashed border-gray-300 flex flex-col items-center justify-center gap-3 h-64 cursor-pointer hover:from-gray-200 hover:to-gray-300 transition group">
                  <div className="w-10 h-10 bg-[#dd0000] flex items-center justify-center rounded-sm">
                    <span className="text-white text-sm font-black">AD</span>
                  </div>
                  <p className="text-sm font-bold text-gray-600 group-hover:text-[#dd0000] transition text-center px-4">
                    Sidebar Ad
                  </p>
                  <Link href="/advertise" className="text-xs text-[#dd0000] hover:underline font-semibold">
                    Advertise with us
                  </Link>
                </div>
              </div>

              {/* Trending */}
              <div>
                <div className="bg-[#1a1a1a] px-4 py-3">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">Trending Now</h3>
                </div>
                <div className="border border-t-0 border-gray-200 divide-y divide-gray-200">
                  {trendingArticles.map((t, i) => (
                    <Link key={t.id} href={`/articles/${t.slug}`} className="group flex gap-3 p-3 hover:bg-gray-50 transition">
                      <span className="text-lg font-black text-[#dd0000] w-5 shrink-0">{i + 1}</span>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-[#dd0000] uppercase tracking-wider mb-0.5">{t.categoryName || t.category}</p>
                        <h4 className="text-xs font-semibold text-[#1a1a1a] leading-tight line-clamp-3 group-hover:text-[#dd0000] transition">
                          {t.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Second sidebar ad */}
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center mb-1">Advertisement</p>
                <div className="bg-gradient-to-b from-gray-100 to-gray-200 border border-dashed border-gray-300 flex flex-col items-center justify-center gap-3 h-48 cursor-pointer hover:from-gray-200 hover:to-gray-300 transition group">
                  <div className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center rounded-sm">
                    <span className="text-white text-sm font-black">AD</span>
                  </div>
                  <p className="text-xs font-bold text-gray-600 group-hover:text-[#dd0000] transition text-center px-4">
                    300×250
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-[#f5f5f5] py-10 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between border-b-4 border-[#dd0000] pb-2 mb-6">
                <h2 className="text-base font-black text-[#1a1a1a] uppercase tracking-widest">
                  More from {article.categoryName || article.category}
                </h2>
                <Link href={`/category/${article.category}`} className="text-xs text-[#dd0000] hover:underline font-semibold">
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link key={related.id} href={`/articles/${related.slug}`} className="group bg-white border border-gray-200 hover:shadow-md transition block">
                    <div className="relative h-40 overflow-hidden bg-gray-200">
                      <Image src={related.image} alt={related.title} fill className="object-cover group-hover:scale-105 transition" />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-bold text-[#dd0000] uppercase tracking-wider mb-1">{related.categoryName || related.category}</p>
                      <h3 className="text-sm font-bold text-[#1a1a1a] leading-tight line-clamp-3 group-hover:text-[#dd0000] transition">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Advertise CTA */}
        <section className="bg-[#1a1a1a] py-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-gray-400 text-sm mb-2">Reach 100,000+ daily readers</p>
            <Link
              href="/advertise"
              className="inline-block bg-[#dd0000] text-white font-black text-xs px-8 py-3 hover:bg-red-700 transition uppercase tracking-widest"
            >
              Advertise With Insight 24
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
