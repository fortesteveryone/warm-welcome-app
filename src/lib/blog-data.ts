export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  author: { name: string; role: string; avatar: string };
  date: string;
  readMinutes: number;
  cover: string;
  body: { type: "p" | "h2" | "quote" | "list"; text?: string; items?: string[] }[];
};

export const BLOG_CATEGORIES = [
  "All",
  "Web design",
  "Web development",
  "WordPress",
  "Webflow",
  "Wix",
  "Framer",
  "Lead generation",
  "Outreach",
] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

const av = (n: number) => `https://i.pravatar.cc/160?img=${n}`;
const cover = (id: string, w = 1200, h = 700) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "find-website-clients-on-facebook-groups",
    title: "How to find website design clients in Facebook groups (without spamming)",
    excerpt:
      "A repeatable system to spot real buying intent in public Facebook groups — and reach out without sounding like every other freelancer.",
    category: "Lead generation",
    tags: ["Facebook", "Outreach", "Web design"],
    author: { name: "Arifa Rahman", role: "Lead strategist · Postly", avatar: av(47) },
    date: "2026-06-02",
    readMinutes: 7,
    cover: cover("1611926653458-09294b3142bf"),
    body: [
      { type: "p", text: "Facebook groups are one of the noisiest — and most overlooked — places to find website clients. Most people scroll past the posts that matter because they don't know what to look for." },
      { type: "h2", text: "Stop chasing every post" },
      { type: "p", text: "Not every 'need a website' post is a real lead. Filter for three things: a clear problem, a hint of budget or timeline, and a profile that looks like a real business." },
      { type: "list", items: ["A specific platform mention (WordPress, Shopify, Webflow)", "Words like 'urgent', 'this week', 'small budget'", "A linked website or business page"] },
      { type: "h2", text: "Reach out like a human" },
      { type: "p", text: "Reference something specific from their post. Skip the portfolio dump. Ask one clarifying question and propose a 10-minute call. That's it." },
      { type: "quote", text: "If your first message could be sent to 100 different posts, it's not outreach — it's spam." },
    ],
  },
  {
    slug: "wordpress-vs-webflow-2026",
    title: "WordPress vs Webflow in 2026: which one wins your next client project?",
    excerpt:
      "Honest tradeoffs for agencies and freelancers choosing between WordPress and Webflow for client websites this year.",
    category: "WordPress",
    tags: ["WordPress", "Webflow", "CMS"],
    author: { name: "Tanvir Hasan", role: "Senior web developer", avatar: av(12) },
    date: "2026-05-21",
    readMinutes: 9,
    cover: cover("1517292987719-0369a794ec0f"),
    body: [
      { type: "p", text: "The WordPress vs Webflow debate isn't about which tool is better — it's about which tool is better for this client, this budget, this timeline." },
      { type: "h2", text: "When WordPress still wins" },
      { type: "p", text: "Heavy content needs, WooCommerce stores, custom plugins, and clients who want full ownership of hosting and code." },
      { type: "h2", text: "When Webflow is the easy answer" },
      { type: "p", text: "Marketing sites, fast launches, design-led brands, and clients who want to edit content without breaking the page." },
      { type: "list", items: ["WordPress: more flexible, more maintenance", "Webflow: faster to ship, locked into one platform", "Always price for the long-term, not just the build"] },
    ],
  },
  {
    slug: "wordpress-redesign-checklist",
    title: "The 12-point WordPress redesign checklist we run for every new client",
    excerpt:
      "A practical WordPress redesign checklist you can run in an afternoon — theme audit, plugin cleanup, page speed and content structure.",
    category: "WordPress",
    tags: ["WordPress", "Redesign", "Checklist"],
    author: { name: "Maya Chen", role: "WordPress consultant", avatar: av(32) },
    date: "2026-05-12",
    readMinutes: 6,
    cover: cover("1432888498266-38ffec3eaf0a"),
    body: [
      { type: "p", text: "Most WordPress sites don't need a rebuild — they need a focused redesign that fixes the 12 things clients actually notice." },
      { type: "h2", text: "Start with theme & plugins" },
      { type: "list", items: ["Audit active theme — is it still maintained?", "Remove unused plugins (usually 30-40% of them)", "Update the core, theme and every plugin on staging first", "Compress every image over 200kb", "Enable a caching + CDN layer"] },
      { type: "h2", text: "Then fix the structure" },
      { type: "p", text: "Clear top nav, one call-to-action per page, mobile checked on real devices. Most clients notice these fixes more than any design flourish." },
    ],
  },
  {
    slug: "webflow-redesign-pricing-guide",
    title: "How to price a Webflow redesign without scaring the client",
    excerpt:
      "Stop quoting flat fees from gut feel. Use this 3-tier pricing structure to make Webflow redesigns feel safe and predictable.",
    category: "Webflow",
    tags: ["Webflow", "Pricing", "Redesign"],
    author: { name: "Lucas Pereira", role: "Webflow studio owner", avatar: av(15) },
    date: "2026-04-30",
    readMinutes: 5,
    cover: cover("1467232004584-a241de8bcf5d"),
    body: [
      { type: "p", text: "Most clients flinch at a single big number. Break the project into three tiers and let them pick." },
      { type: "h2", text: "Tier 1 — refresh" },
      { type: "p", text: "Keep the structure, restyle the visuals. Fastest path to a 'wow' moment without rebuilding the CMS." },
      { type: "h2", text: "Tier 2 — restructure" },
      { type: "p", text: "New IA, new templates, same brand. This is where most projects land." },
      { type: "h2", text: "Tier 3 — rebuild" },
      { type: "p", text: "New everything. Quote it as a separate phase with its own discovery." },
    ],
  },
  {
    slug: "linkedin-cold-dm-template-for-web-agencies",
    title: "The LinkedIn cold DM template that actually books calls",
    excerpt:
      "A 4-line LinkedIn DM template — with the reasoning behind every line — that consistently books discovery calls for web agencies.",
    category: "Outreach",
    tags: ["LinkedIn", "Cold outreach", "Templates"],
    author: { name: "Priya Shah", role: "Outreach lead", avatar: av(23) },
    date: "2026-04-18",
    readMinutes: 4,
    cover: cover("1556761175-5973dc0f32e7"),
    body: [
      { type: "p", text: "Cold DMs work — when they don't read like cold DMs." },
      { type: "h2", text: "The template" },
      { type: "list", items: ["Line 1: name + one specific observation", "Line 2: one sentence on why it caught your eye", "Line 3: one short question they can answer in 5 seconds", "Line 4: low-pressure call ask"] },
      { type: "quote", text: "If they have to think, they don't reply. Make replying the easiest thing they do today." },
    ],
  },
  {
    slug: "website-rebuild-discovery-questions",
    title: "21 discovery questions for a website rebuild project",
    excerpt:
      "Skip the generic intake form. These 21 questions surface the real reason your client wants a rebuild — and protect your scope.",
    category: "Web design",
    tags: ["Discovery", "Rebuild", "Process"],
    author: { name: "Eitan Gold", role: "Design lead", avatar: av(7) },
    date: "2026-04-04",
    readMinutes: 8,
    cover: cover("1559136555-9303baea8ebd"),
    body: [
      { type: "p", text: "The first call decides whether a project is fun or painful. Ask better questions and the rest of the project gets easier." },
      { type: "h2", text: "Business questions" },
      { type: "list", items: ["What does success look like 90 days after launch?", "Which page on the current site costs you the most money?", "What would a competitor have to do to scare you?"] },
      { type: "h2", text: "Project questions" },
      { type: "list", items: ["Who has final approval?", "What's the real deadline (not the wished deadline)?", "What happens if we miss it?"] },
    ],
  },
  {
    slug: "framer-vs-wix-quick-comparison",
    title: "Framer vs Wix: which one should you recommend for small businesses?",
    excerpt:
      "Two very different tools, two very different clients. A quick framework to know which one to recommend in your next sales call.",
    category: "Framer",
    tags: ["Framer", "Wix", "Comparison"],
    author: { name: "Sara Lindqvist", role: "Freelance designer", avatar: av(38) },
    date: "2026-03-25",
    readMinutes: 5,
    cover: cover("1498050108023-c5249f4df085"),
    body: [
      { type: "p", text: "Wix is the easy hand-off. Framer is the design-led upgrade. Pick based on who is editing the site after launch, not on what you'd personally prefer to build in." },
      { type: "h2", text: "Recommend Wix when" },
      { type: "list", items: ["Client has zero design vocabulary", "Site will rarely change", "Budget is below $1.5k"] },
      { type: "h2", text: "Recommend Framer when" },
      { type: "list", items: ["Brand polish matters", "Client wants motion and modern design", "You'll keep maintaining the site"] },
    ],
  },
  {
    slug: "cms-migration-playbook",
    title: "The CMS migration playbook: WordPress, Webflow, Wix and Framer without downtime",
    excerpt:
      "How to plan a CMS switch, keep SEO equity intact, and ship the new site in a weekend — with a rollback plan clients trust.",
    category: "WordPress",
    tags: ["Migration", "WordPress", "Webflow", "CMS"],
    author: { name: "Jordan Ali", role: "CMS migration specialist", avatar: av(53) },
    date: "2026-03-11",
    readMinutes: 6,
    cover: cover("1460925895917-afdab827c52f"),
    body: [
      { type: "p", text: "Most CMS migrations fail on the boring stuff: redirects, form endpoints, and staging that doesn't match production." },
      { type: "list", items: ["Freeze content on the old CMS one week before switch", "Map every old URL to a new one (301s, not 302s)", "Rebuild forms and test submissions on staging", "Copy over analytics + tag manager containers", "Move DNS on a low-traffic day", "Keep the old CMS live for 30 days as a rollback"] },
    ],
  },
  {
    slug: "freelancer-to-agency-jump",
    title: "From freelancer to small agency: what changes in year one",
    excerpt:
      "Going from solo to a 3-person agency is mostly an operations story, not a sales story. Here's what to expect.",
    category: "Lead generation",
    tags: ["Agency", "Operations", "Hiring"],
    author: { name: "Noah Whitman", role: "Agency founder", avatar: av(60) },
    date: "2026-02-28",
    readMinutes: 7,
    cover: cover("1521737604893-d14cc237f11d"),
    body: [
      { type: "p", text: "The hardest part isn't finding clients — it's surviving the month where you have too many." },
      { type: "h2", text: "What changes" },
      { type: "list", items: ["You stop being the best person on every project", "Hiring is the single biggest skill to learn", "Cash flow swings get worse before they get better", "You need a real CRM, not a spreadsheet"] },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3) {
  const current = getPostBySlug(slug);
  if (!current) return [];
  return BLOG_POSTS.filter((p) => p.slug !== slug)
    .map((p) => {
      const sameCat = p.category === current.category ? 2 : 0;
      const shared = p.tags.filter((t) => current.tags.includes(t)).length;
      return { p, score: sameCat + shared };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
