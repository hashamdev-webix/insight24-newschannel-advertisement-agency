/**
 * Seeder — run with:
 *   npx tsx scripts/seed.ts
 *
 * Seeds: Users, Categories, Articles, Advertisements
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/insight24';

// ── Inline schemas (avoid model caching issues in script context) ──────────

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'editor' },
}, { timestamps: true });

const categorySchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true },
  description: String,
}, { timestamps: true });

const articleSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  excerpt: String,
  content: String,
  category: String,
  categoryName: String,
  author: String,
  image: String,
  views: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  status: { type: String, default: 'published' },
  publishedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const advertisementSchema = new mongoose.Schema({
  title: String,
  clientName: String,
  imageUrl: String,
  linkUrl: String,
  placement: String,
  isActive: { type: Boolean, default: true },
  startDate: Date,
  endDate: Date,
  clicks: { type: Number, default: 0 },
  impressions: { type: Number, default: 0 },
  notes: String,
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);
const CategoryModel = mongoose.model('Category', categorySchema);
const ArticleModel = mongoose.model('Article', articleSchema);
const AdvertisementModel = mongoose.model('Advertisement', advertisementSchema);

// ── Seed data ─────────────────────────────────────────────────────────────

// Passwords are hashed inside seed() to avoid top-level await
const rawUsers = [
  { name: 'Admin User',     email: 'admin@insight24.com', password: 'admin123',  role: 'admin' },
  { name: 'Sarah Mitchell', email: 'sarah@insight24.com', password: 'editor123', role: 'editor' },
  { name: 'James Thompson', email: 'james@insight24.com', password: 'editor123', role: 'editor' },
];

const categories = [
  { name: 'Business', slug: 'business', description: 'Business and finance news' },
  { name: 'Technology', slug: 'tech', description: 'Technology and innovation news' },
  { name: 'World', slug: 'world', description: 'World and international news' },
  { name: 'Local News', slug: 'local-news', description: 'Local and community news' },
  { name: 'Entertainment', slug: 'entertainment', description: 'Entertainment, arts and culture' },
  { name: 'Health', slug: 'health', description: 'Health and wellness news' },
  { name: 'Sport', slug: 'sport', description: 'Sports news and updates' },
  { name: 'Science', slug: 'science', description: 'Science and environment news' },
];

const articles = [
  {
    title: 'Global Climate Summit Reaches Historic Agreement',
    slug: 'climate-summit-agreement',
    excerpt: 'Nations unite on climate action with binding commitments to reduce emissions by 2030.',
    content: 'In a landmark development, world leaders have reached a comprehensive agreement at the Global Climate Summit. The accord commits nations to reduce carbon emissions by at least 45% by 2030 and includes a $100 billion climate fund for developing nations.\n\nThis represents the most ambitious climate agreement since the Paris Accord. Scientists have praised the deal, though environmental groups say more aggressive action is needed.\n\nThe agreement will take effect on January 1st next year, with regular review mechanisms to ensure compliance and progress.',
    category: 'world',
    categoryName: 'World',
    author: 'Sarah Mitchell',
    image: '/images/climate.jpg',
    views: 15420,
    isFeatured: true,
    status: 'published',
    publishedAt: new Date('2024-03-25'),
  },
  {
    title: 'UK Economy Shows Strong Growth in Latest Quarter',
    slug: 'uk-economy-growth',
    excerpt: 'The British economy expands faster than forecasts, boosting confidence in the market.',
    content: 'The UK economy grew by 0.8% in the fourth quarter, significantly outperforming economist predictions of 0.5%. This growth has been driven by strong performance in the service sector and manufacturing.\n\nThe Office for National Statistics reports that consumer spending increased by 1.2%, suggesting improved consumer confidence. Retail sales surged following the early spring season.\n\nHowever, inflation remains a concern with the Bank of England maintaining rates at 5.0%.',
    category: 'business',
    categoryName: 'Business',
    author: 'James Thompson',
    image: '/images/uk-economy.jpg',
    views: 12300,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-24'),
  },
  {
    title: 'Major Breakthrough in Artificial Intelligence Research',
    slug: 'tech-breakthrough-ai',
    excerpt: 'Scientists announce significant advancement in AI efficiency and safety mechanisms.',
    content: 'Researchers have made a substantial breakthrough in AI technology, developing a new algorithm that increases processing efficiency by 300% while reducing energy consumption.\n\nThe advancement addresses one of the major concerns in AI development: the environmental impact of training large models. The new approach uses novel neural network architecture that mimics biological brain functions more closely.\n\nLeading tech companies have already expressed interest in implementing the technology.',
    category: 'tech',
    categoryName: 'Technology',
    author: 'Dr. Emma Chen',
    image: '/images/ai.jpg',
    views: 18900,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-23'),
  },
  {
    title: 'Quantum Computer Achieves New Milestone',
    slug: 'quantum-computing-leap',
    excerpt: 'Scientists demonstrate quantum computing capability previously thought impossible.',
    content: 'A team of physicists has successfully demonstrated quantum error correction at scale, a breakthrough that brings practical quantum computers closer to reality.\n\nThe achievement solves a critical problem that has plagued quantum computing: the instability of quantum bits. The new method maintains quantum information with 99.9% accuracy across multiple operations.\n\nIndustry experts believe this could lead to practical quantum computers within the next five years.',
    category: 'science',
    categoryName: 'Science',
    author: 'Prof. Richard Adams',
    image: '/images/quantum.jpg',
    views: 11200,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-22'),
  },
  {
    title: 'Tech Giant Announces $50 Billion Acquisition',
    slug: 'tech-giant-acquisition',
    excerpt: 'Major technology company completes landmark acquisition in strategic expansion.',
    content: 'One of the world\'s largest technology companies has announced the acquisition of a leading software firm for $50 billion. The deal, approved by regulators after a six-month review, is expected to create significant synergies in cloud computing and AI.\n\nThe acquisition brings together complementary technologies and talent pools. Market analysts predict the combined entity will have even greater market dominance.\n\nThe integration is expected to complete by the end of the year.',
    category: 'business',
    categoryName: 'Business',
    author: 'Michael Reuters',
    image: '/images/tech-deal.jpg',
    views: 9800,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-21'),
  },
  {
    title: 'Breakthrough in Cancer Treatment Shows Promise',
    slug: 'new-cancer-treatment',
    excerpt: 'New immunotherapy approach shows 85% success rate in clinical trials.',
    content: 'Medical researchers have announced successful results from clinical trials of a new cancer immunotherapy. The treatment showed an 85% positive response rate in patients with advanced melanoma.\n\nThe therapy works by enhancing the body\'s own immune system to fight cancer cells more effectively. Patients in the trial experienced fewer side effects compared to traditional chemotherapy.\n\nThe treatment is expected to be reviewed for approval within the next year.',
    category: 'health',
    categoryName: 'Health',
    author: 'Dr. Lisa Johnson',
    image: '/images/health.jpg',
    views: 14600,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-20'),
  },
  {
    title: 'Underdog Team Reaches World Cup Final',
    slug: 'world-cup-upset',
    excerpt: 'Historic achievement as unexpected contender defeats defending champions.',
    content: 'In a shocking upset, an underdog team has defeated the defending world champions to secure a place in the finals. The victory, achieved through a dramatic penalty shootout, has captivated global audiences.\n\nThe team\'s remarkable journey from preliminary rounds to the final represents one of the greatest sports stories in recent history.\n\nCoach praised the team\'s determination and tactical brilliance. The final is scheduled for next month.',
    category: 'sport',
    categoryName: 'Sport',
    author: 'David Foster',
    image: '/images/sports.jpg',
    views: 22100,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-19'),
  },
  {
    title: 'Major Banking Merger Approved by Regulators',
    slug: 'business-merger',
    excerpt: 'Two financial institutions combine to create industry powerhouse.',
    content: 'Banking regulators have approved the merger of two major financial institutions, creating a combined entity with over $2 trillion in assets.\n\nThe merger is expected to generate cost savings and create a more competitive global player. Both institutions\' customers will benefit from expanded services and geographic reach.\n\nThe integration process is expected to take 18 months.',
    category: 'business',
    categoryName: 'Business',
    author: 'Catherine Wells',
    image: '/images/finance.jpg',
    views: 8400,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-18'),
  },
  {
    title: 'Historic Mars Mission Reaches Critical Milestone',
    slug: 'space-exploration',
    excerpt: 'Space agency successfully deploys advanced rover on Mars surface.',
    content: 'Space exploration reached a new milestone as a cutting-edge rover successfully deployed on Mars. The rover is equipped with advanced instruments to search for signs of ancient microbial life.\n\nInitial transmissions show all systems functioning perfectly. The mission represents years of planning and collaboration between multiple space agencies.\n\nData from this mission will inform future crewed missions to Mars.',
    category: 'science',
    categoryName: 'Science',
    author: 'Prof. Alexandra Brown',
    image: '/images/space.jpg',
    views: 16700,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-17'),
  },
  {
    title: 'New Smartphone Technology Revolutionizes Industry',
    slug: 'smartphone-innovation',
    excerpt: 'Innovative display technology delivers unprecedented performance and efficiency.',
    content: 'A major smartphone manufacturer has unveiled revolutionary display technology that pushes the boundaries of mobile computing. The new holographic display offers 4K resolution with zero bezel.\n\nBattery life extends to 7 days on a single charge thanks to new power management. The technology also enables gesture recognition without physical contact.\n\nPre-orders exceed 5 million units within the first 24 hours.',
    category: 'tech',
    categoryName: 'Technology',
    author: 'Marcus Lee',
    image: '/images/tech-phone.jpg',
    views: 19300,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-16'),
  },
  {
    title: 'Election Results Show Major Political Shift',
    slug: 'election-results-analysis',
    excerpt: 'Voters deliver surprising mandate in historic election outcome.',
    content: 'Recent election results have sent shockwaves through the political establishment. The unexpected voter mandate represents a significant shift in political dynamics.\n\nAnalysts are examining the implications for policy and governance. Key issues including economy, healthcare, and climate were decisive factors.',
    category: 'world',
    categoryName: 'World',
    author: 'John Mitchell',
    image: '/images/climate.jpg',
    views: 20100,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-25'),
  },
  {
    title: 'Major Trade Agreement Signed Between Nations',
    slug: 'trade-agreement-signed',
    excerpt: 'Historic trade deal opens new markets and creates opportunities.',
    content: 'Two major economies have finalized a comprehensive trade agreement expected to boost bilateral commerce by 35%. The deal eliminates tariffs on key sectors and creates new investment opportunities.',
    category: 'business',
    categoryName: 'Business',
    author: 'Robert Chen',
    image: '/images/finance.jpg',
    views: 7200,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-24'),
  },
  {
    title: 'Renewable Energy Usage Reaches Record Levels',
    slug: 'renewable-energy-surge',
    excerpt: 'Solar and wind power now account for largest share of energy production.',
    content: 'Global renewable energy capacity has surpassed expectations, now accounting for 42% of worldwide electricity generation. Wind and solar installations continue to accelerate across continents.',
    category: 'world',
    categoryName: 'World',
    author: 'Emma Green',
    image: '/images/climate.jpg',
    views: 13400,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-23'),
  },
  {
    title: 'New Blockbuster Shatters Opening Weekend Box Office Record',
    slug: 'blockbuster-film-record',
    excerpt: 'The highly anticipated sequel breaks all previous records with a $500 million global debut.',
    content: 'The latest installment in one of cinema\'s biggest franchises has obliterated opening weekend records worldwide. The film earned $500 million globally in its first three days.\n\nCritics and audiences alike have praised the film for its stunning visuals and compelling story.\n\nStreaming rights are expected to be negotiated following the theatrical run.',
    category: 'entertainment',
    categoryName: 'Entertainment',
    author: 'Sophie Clarke',
    image: '/images/sports.jpg',
    views: 25300,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-25'),
  },
  {
    title: 'Global Music Awards Celebrate Breakthrough Artists',
    slug: 'music-award-ceremony',
    excerpt: 'Annual ceremony honors the biggest names and rising stars of the music industry.',
    content: 'The Global Music Awards ceremony delivered thrilling performances and surprising wins. Emerging artists dominated multiple categories, signalling a significant shift in the music industry.\n\nThe event, watched by over 50 million viewers worldwide, highlighted diversity and innovation.\n\nIndustry executives predict record-breaking album sales following the exposure.',
    category: 'entertainment',
    categoryName: 'Entertainment',
    author: 'Marcus Gold',
    image: '/images/health.jpg',
    views: 18700,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-23'),
  },
  {
    title: 'Streaming Giants Battle for Subscribers with Exclusive Content',
    slug: 'streaming-war-heats-up',
    excerpt: 'Major platforms announce billion-dollar investments in original programming.',
    content: 'The streaming wars have intensified with multiple platforms announcing major original content investments. Billions of dollars are being committed to exclusive series and films.\n\nSubscriber numbers are the key battleground as platforms compete for audience share.\n\nAnalysts predict further consolidation in the streaming market within the next two years.',
    category: 'entertainment',
    categoryName: 'Entertainment',
    author: 'Diana Reeves',
    image: '/images/tech-deal.jpg',
    views: 14200,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-21'),
  },
  {
    title: 'City Council Approves Major Infrastructure Upgrade',
    slug: 'local-infrastructure-project',
    excerpt: 'Landmark investment in roads, public transport and green spaces to transform city centre.',
    content: 'The city council has approved a comprehensive infrastructure upgrade worth $2 billion. The project covers road improvements, new bus rapid transit routes, and the creation of three new public parks.\n\nConstruction is expected to begin next quarter and complete within four years.\n\nLocal businesses anticipate increased foot traffic following the upgrades.',
    category: 'local-news',
    categoryName: 'Local News',
    author: 'Helen Morris',
    image: '/images/uk-economy.jpg',
    views: 8900,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-24'),
  },
  {
    title: 'Community School Opens New Facilities After Fundraising Drive',
    slug: 'community-school-expansion',
    excerpt: 'Local school celebrates opening of state-of-the-art science labs and sports hall.',
    content: 'A local school celebrated the opening of new science laboratories and a modern sports hall following a successful community fundraising campaign.\n\nOver $1.2 million was raised through donations from parents, local businesses, and council grants.\n\nThe new facilities are also available for community use during evenings and weekends.',
    category: 'local-news',
    categoryName: 'Local News',
    author: 'Daniel Foster',
    image: '/images/health.jpg',
    views: 6400,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-22'),
  },
  {
    title: 'Local Farmers Market Expands to New Weekend Venue',
    slug: 'local-market-expansion',
    excerpt: 'Popular market doubles in size after overwhelming demand from vendors and shoppers.',
    content: 'The popular local farmers market is expanding to a second weekly venue following overwhelming demand. Over 80 new vendors have been approved to join the market.\n\nOrganisers expect the expansion to create over 200 local jobs.\n\nPlans are in place to introduce live music and cooking demonstrations.',
    category: 'local-news',
    categoryName: 'Local News',
    author: 'Anna Blake',
    image: '/images/finance.jpg',
    views: 5200,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-20'),
  },
  {
    title: 'New Hospital Wing Cuts Patient Waiting Times by 40%',
    slug: 'local-hospital-new-wing',
    excerpt: 'Expanded emergency department now handles twice the capacity with improved care.',
    content: 'The regional hospital has opened its new emergency department wing, already delivering a 40% reduction in average patient waiting times. The expansion adds 60 new beds, two additional operating theatres and a dedicated paediatric unit.\n\nThe hospital CEO described it as the most significant improvement in local healthcare in a generation.',
    category: 'local-news',
    categoryName: 'Local News',
    author: 'Carol Simmons',
    image: '/images/health.jpg',
    views: 9700,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-18'),
  },
  {
    title: 'New Drug Shows Potential for Alzheimers Treatment',
    slug: 'pharmaceutical-discovery',
    excerpt: 'Clinical trials demonstrate promising results in neurological disease research.',
    content: 'Pharmaceutical researchers have unveiled a new compound that shows remarkable promise in treating Alzheimers disease. Early trials show slowing of cognitive decline in patients.',
    category: 'health',
    categoryName: 'Health',
    author: 'Dr. Michael Brown',
    image: '/images/health.jpg',
    views: 15200,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-20'),
  },
  {
    title: 'Olympic Games Preparations Enter Final Phase',
    slug: 'olympics-preparation',
    excerpt: 'Host nation completes major venue construction ahead of summer games.',
    content: 'Construction of Olympic venues is nearing completion as the host nation prepares for the upcoming summer games. Athletes from around the world are beginning training camps.',
    category: 'sport',
    categoryName: 'Sport',
    author: 'Tommy Anderson',
    image: '/images/sports.jpg',
    views: 12600,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-19'),
  },
  {
    title: 'Record-Breaking Sports Transfer Shocks Industry',
    slug: 'sports-transfer-news',
    excerpt: 'Athlete signs multi-year mega-deal with major franchise.',
    content: 'In a stunning transfer, a superstar athlete has signed with a major sports franchise for an unprecedented salary. The deal breaks all previous records in professional sports.',
    category: 'sport',
    categoryName: 'Sport',
    author: 'Mark Stevens',
    image: '/images/sports.jpg',
    views: 21300,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-15'),
  },
  {
    title: 'Tech Startups Secure Record Funding Rounds',
    slug: 'innovation-startups-boom',
    excerpt: 'Venture capital flows as investors bet on emerging technologies.',
    content: 'Technology startups have attracted unprecedented venture capital investment this quarter. Investors are particularly focused on AI, biotech, and green energy companies.',
    category: 'tech',
    categoryName: 'Technology',
    author: 'David Park',
    image: '/images/ai.jpg',
    views: 9500,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-21'),
  },
  {
    title: 'Major Cybersecurity Breach Affects Millions',
    slug: 'cybersecurity-threat',
    excerpt: 'Data leak raises concerns about online privacy and security.',
    content: 'A significant cybersecurity breach has exposed personal data of millions of users. Companies are implementing enhanced security measures in response.',
    category: 'tech',
    categoryName: 'Technology',
    author: 'Steven Murphy',
    image: '/images/ai.jpg',
    views: 16700,
    isFeatured: false,
    status: 'published',
    publishedAt: new Date('2024-03-13'),
  },
];

const advertisements = [
  {
    title: 'Summer Sale 2024 — Top Banner',
    clientName: 'TechStore Pro',
    imageUrl: '/placeholder.jpg',
    linkUrl: 'https://example.com',
    placement: 'top-banner',
    isActive: true,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    clicks: 0,
    impressions: 0,
    notes: 'Homepage top leaderboard',
  },
  {
    title: 'Finance App — Sidebar Ad',
    clientName: 'MoneyApp Inc',
    imageUrl: '/placeholder.jpg',
    linkUrl: 'https://example.com',
    placement: 'sidebar',
    isActive: true,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    clicks: 0,
    impressions: 0,
    notes: 'Right sidebar 300x250',
  },
  {
    title: 'Health Insurance — Inline Banner',
    clientName: 'HealthFirst Group',
    imageUrl: '/placeholder.jpg',
    linkUrl: 'https://example.com',
    placement: 'inline',
    isActive: true,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    clicks: 0,
    impressions: 0,
    notes: 'Between article sections',
  },
  {
    title: 'Real Estate — Homepage Featured',
    clientName: 'Prime Properties',
    imageUrl: '/placeholder.jpg',
    linkUrl: 'https://example.com',
    placement: 'homepage-featured',
    isActive: true,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    clicks: 0,
    impressions: 0,
    notes: 'Homepage featured placement',
  },
];

// ── Run seeder ─────────────────────────────────────────────────────────────

async function seed() {
  console.log('🌱 Connecting to MongoDB:', MONGODB_URI);
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected\n');

  // Clear existing data
  console.log('🗑  Clearing existing data...');
  await Promise.all([
    UserModel.deleteMany({}),
    CategoryModel.deleteMany({}),
    ArticleModel.deleteMany({}),
    AdvertisementModel.deleteMany({}),
  ]);
  console.log('✅ Cleared\n');

  // Hash passwords now (inside async function — no top-level await)
  const users = await Promise.all(
    rawUsers.map(async (u) => ({ ...u, password: await bcrypt.hash(u.password, 12) }))
  );

  // Seed users
  console.log('👤 Seeding users...');
  await UserModel.insertMany(users);
  console.log(`✅ ${users.length} users seeded`);
  console.log('   admin@insight24.com  / admin123  (role: admin)');
  console.log('   sarah@insight24.com  / editor123 (role: editor)');
  console.log('   james@insight24.com  / editor123 (role: editor)\n');

  // Seed categories
  console.log('📂 Seeding categories...');
  await CategoryModel.insertMany(categories);
  console.log(`✅ ${categories.length} categories seeded\n`);

  // Seed articles
  console.log('📰 Seeding articles...');
  await ArticleModel.insertMany(articles);
  console.log(`✅ ${articles.length} articles seeded\n`);

  // Seed advertisements
  console.log('📢 Seeding advertisements...');
  await AdvertisementModel.insertMany(advertisements);
  console.log(`✅ ${advertisements.length} advertisements seeded\n`);

  console.log('🎉 Seeding complete!');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
