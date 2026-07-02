export type LeadStatus = "hot" | "warm" | "cold";
export type LeadSource = "instagram" | "linkedin" | "facebook";
export type LeadIntent = "High" | "Medium" | "Low";
export type LeadQualification = "qualified" | "disqualified" | "unreviewed";
export type LeadUrgency = "Urgent" | "This week" | "Exploring";
export type LeadPlatform =
  | "facebook" | "linkedin" | "instagram" | "reddit" | "whatsapp" | "twitter" | "x"
  | "youtube" | "tiktok" | "telegram" | "discord" | "snapchat" | "pinterest"
  | "threads" | "wechat" | "line" | "quora" | "medium" | "github"
  | "behance" | "dribbble" | "twitch" | "mastodon" | "other";

/** Website-service categories — Postly's real product scope. */
export const LEAD_CATEGORIES = [
  "Website Design",
  "Website Development",
  "Website Redesign",
  "WordPress",
  "Webflow",
  "Wix",
  "Framer",
  "Shopify",
  "Landing Page",
  "CMS Migration",
] as const;
export type LeadCategory = (typeof LEAD_CATEGORIES)[number];

export const LEAD_INTENTS: LeadIntent[] = ["High", "Medium", "Low"];
export const LEAD_URGENCIES: LeadUrgency[] = ["Urgent", "This week", "Exploring"];
export const LEAD_QUALIFICATIONS: LeadQualification[] = ["qualified", "disqualified", "unreviewed"];

export const LEAD_PLATFORMS: LeadPlatform[] = [
  "facebook", "linkedin", "instagram", "reddit", "twitter", "x", "threads",
  "youtube", "tiktok", "telegram", "discord", "whatsapp", "snapchat", "pinterest",
  "wechat", "line", "quora", "medium", "github", "behance", "dribbble", "twitch",
  "mastodon", "other",
];

export const LEAD_COUNTRIES = [
  "All", "United States", "United Kingdom", "Canada", "Australia", "Germany",
  "France", "Netherlands", "Spain", "Italy", "Ireland", "Sweden", "Singapore",
  "United Arab Emirates", "India", "Bangladesh", "Pakistan", "Japan", "Brazil",
  "Mexico",
] as const;
export type LeadCountry = (typeof LEAD_COUNTRIES)[number];

export type Lead = {
  id: string;
  name: string;
  company: string;
  role: string;
  source: LeadSource;
  score: number;
  status: LeadStatus;
  stage: string;
  owner: string;
  updated: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  website: string;
  tags: string[];
  about: string;
  dealValue: number;
  createdAt: string;
  category: LeadCategory;
  intent: LeadIntent;
  platform: LeadPlatform;
  qualification: LeadQualification;
  favourite: boolean;
  /** Post-style summary shown before opening. */
  headline: string;
  /** Short topic pill. */
  topic: string;
  /** Reply / comment count on the original post. */
  comments: number;
  /** Draft replies prepared. */
  drafts: number;
  /** When the underlying post was published. */
  postedAt: string;

  /* ── Social-post-native fields (new) ── */
  /** 2–4 line quote of the actual public post. */
  postExcerpt: string;
  /** Fake permalink to the source post. */
  postUrl: string;
  /** Public author handle, e.g. "@aisha.rahman". */
  authorHandle: string;
  /** How urgently they need help. */
  urgency: LeadUrgency;
  /** Reactions/likes on the source post. */
  reactions: number;
  /** Shares/reposts on the source post. */
  shares: number;
  /** 3 suggested opener angles the reply workspace can surface. */
  replyAngles: string[];
  /** Country flag emoji. */
  flag: string;
};

/* ─────────── Deterministic PRNG so IDs and content are stable ─────────── */

function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ─────────── Content pools ─────────── */

const FIRST_NAMES = [
  "Aisha", "Marcus", "Priya", "Jonas", "Camila", "David", "Yuki", "Ravi", "Elena",
  "Liam", "Sana", "Tom", "Mei", "Felix", "Aaliyah", "Nora", "Diego", "Chloe",
  "Ahmed", "Sofia", "Hiro", "Isabelle", "Kwame", "Emma", "Rafael", "Zainab",
  "Lucas", "Ines", "Karim", "Maya", "Owen", "Freya", "Idris", "Nadia", "Oscar",
  "Amelie", "Sami", "Julia", "Bruno", "Anika", "Hugo", "Rania", "Kenji", "Layla",
  "Theo", "Zoe", "Malik", "Ada", "Nikhil", "Salma",
];
const LAST_NAMES = [
  "Rahman", "Lin", "Devi", "Weber", "Reyes", "O'Connor", "Tanaka", "Shah", "Costa",
  "Foster", "Iqbal", "Becker", "Wong", "Brandt", "Khan", "Nakamura", "Silva",
  "Dubois", "Hassan", "Kowalski", "Martinez", "Ito", "Abebe", "Rossi", "Jansen",
  "Nguyen", "Park", "Andersson", "Cohen", "Almeida", "Fischer", "Novak", "Beck",
  "Sato", "El-Sayed", "Petrov", "Kaur", "Perez", "Osei", "Larsen", "Yamada",
];
const COMPANY_SUFFIX = ["Studio", "Labs", "Co.", "Works", "Clinic", "Kitchen", "Homes", "Coffee", "Collective", "Consulting", "Academy", "Bakery", "Boutique", "Fitness", "Legal", "Wines", "Realty", "Travel", "Media", "Agency"];
const COMPANY_ROOT = [
  "Velvet", "Northwave", "Saffron", "Atlas", "Lumen", "Hearth", "Mori", "Bluepeak",
  "Costa", "Foster", "Nova", "Becker", "Lotus", "Brandt", "Khan", "Aurora", "Cedar",
  "Harbor", "Ember", "Ridge", "Marigold", "Pine", "Orbit", "Willow", "Kite",
  "Copper", "Meadow", "Fable", "Union", "Anchor", "Halcyon", "Verve", "Rowan",
  "Sable", "Basil", "Larch", "Juniper", "Fern", "Beacon", "Prism",
];

const CITY_BY_COUNTRY: Record<Exclude<LeadCountry, "All">, { city: string; flag: string; dial: string }[]> = {
  "United States":        [{ city: "San Francisco", flag: "🇺🇸", dial: "+1 415 555" }, { city: "New York", flag: "🇺🇸", dial: "+1 646 555" }, { city: "Austin", flag: "🇺🇸", dial: "+1 512 555" }, { city: "Chicago", flag: "🇺🇸", dial: "+1 312 555" }],
  "United Kingdom":       [{ city: "London", flag: "🇬🇧", dial: "+44 20 7946" }, { city: "Manchester", flag: "🇬🇧", dial: "+44 161 555" }, { city: "Bristol", flag: "🇬🇧", dial: "+44 117 555" }],
  "Canada":               [{ city: "Toronto", flag: "🇨🇦", dial: "+1 416 555" }, { city: "Vancouver", flag: "🇨🇦", dial: "+1 604 555" }],
  "Australia":            [{ city: "Sydney", flag: "🇦🇺", dial: "+61 2 5550" }, { city: "Melbourne", flag: "🇦🇺", dial: "+61 3 5550" }],
  "Germany":              [{ city: "Berlin", flag: "🇩🇪", dial: "+49 30 9876" }, { city: "Hamburg", flag: "🇩🇪", dial: "+49 40 9876" }, { city: "Munich", flag: "🇩🇪", dial: "+49 89 9876" }],
  "France":               [{ city: "Paris", flag: "🇫🇷", dial: "+33 1 4555" }, { city: "Lyon", flag: "🇫🇷", dial: "+33 4 7255" }],
  "Netherlands":          [{ city: "Amsterdam", flag: "🇳🇱", dial: "+31 20 555" }],
  "Spain":                [{ city: "Madrid", flag: "🇪🇸", dial: "+34 612 345" }, { city: "Barcelona", flag: "🇪🇸", dial: "+34 932 555" }],
  "Italy":                [{ city: "Rome", flag: "🇮🇹", dial: "+39 06 1234" }, { city: "Milan", flag: "🇮🇹", dial: "+39 02 1234" }],
  "Ireland":              [{ city: "Dublin", flag: "🇮🇪", dial: "+353 1 555" }],
  "Sweden":               [{ city: "Stockholm", flag: "🇸🇪", dial: "+46 8 555" }],
  "Singapore":            [{ city: "Singapore", flag: "🇸🇬", dial: "+65 8123" }],
  "United Arab Emirates": [{ city: "Dubai", flag: "🇦🇪", dial: "+971 4 123" }, { city: "Abu Dhabi", flag: "🇦🇪", dial: "+971 2 123" }],
  "India":                [{ city: "Mumbai", flag: "🇮🇳", dial: "+91 98765" }, { city: "Bengaluru", flag: "🇮🇳", dial: "+91 80456" }, { city: "Delhi", flag: "🇮🇳", dial: "+91 11555" }],
  "Bangladesh":           [{ city: "Dhaka", flag: "🇧🇩", dial: "+880 1711" }],
  "Pakistan":             [{ city: "Karachi", flag: "🇵🇰", dial: "+92 300 123" }, { city: "Lahore", flag: "🇵🇰", dial: "+92 42 123" }],
  "Japan":                [{ city: "Tokyo", flag: "🇯🇵", dial: "+81 80 1234" }],
  "Brazil":               [{ city: "São Paulo", flag: "🇧🇷", dial: "+55 11 9555" }],
  "Mexico":               [{ city: "Mexico City", flag: "🇲🇽", dial: "+52 55 5555" }],
};

const ROLE_POOL = ["Founder", "Owner", "CMO", "Marketing Lead", "Ops Lead", "Head of Growth", "Product Manager", "Director", "Partner", "Freelancer", "CEO"];

/** Website-service post templates keyed by category. */
const POST_TEMPLATES: Record<LeadCategory, { headline: string; excerpt: string; topic: string }[]> = {
  "Website Design": [
    { headline: "Looking for a website designer for a new SaaS marketing site — clean, modern feel.", excerpt: "We just closed our seed round and need a proper marketing site — 6–8 pages, clean and modern. Not looking for a big agency, ideally a designer who's shipped SaaS sites before. DM me with portfolio?", topic: "Designer for SaaS marketing site" },
    { headline: "Need a website designer for our physiotherapy clinic — booking-focused, mobile-first.", excerpt: "Our current site looks stuck in 2015. Want a fresh design focused on getting people to book online. Mobile-first is a must — 90% of our traffic is phone. Anyone available in the next 2–3 weeks?", topic: "Clinic website designer" },
    { headline: "Anyone freelance for a coffee shop chain website? 3 locations, need something photo-heavy.", excerpt: "We've got great photography from a recent shoot — need someone who can build a site around it. Menu, locations, story page, simple ordering. Budget is reasonable but not agency-level.", topic: "Photo-heavy small-biz site" },
  ],
  "Website Development": [
    { headline: "Need a website developer to build out a Figma design — 12 pages, no CMS needed.", excerpt: "Designer is done, files are clean, we just need dev. Static site or Next.js is fine. Deadline is end of the month. If you've done marketing-site dev before please DM with rate.", topic: "Figma → live site" },
    { headline: "Looking for a dev to build a members-only community site — auth + gated content.", excerpt: "We're launching a paid community and need a proper members area — Stripe auth, gated pages, simple search. Nothing crazy on features, but stability matters. Recommendations welcome.", topic: "Gated members site" },
    { headline: "Need a developer to finish a half-built site — previous dev disappeared 😩", excerpt: "Site is about 60% done in Astro. Previous person stopped replying. Need someone who can pick it up, finish the last few templates, and get it live. Would rather rewrite messy sections than glue over them.", topic: "Rescue project" },
  ],
  "Website Redesign": [
    { headline: "Time for a full website redesign — our site hasn't been touched in 5 years.", excerpt: "Brand has evolved a lot and the current site is embarrassing at this point. Would love a redesign that actually reflects what we do now — B2B fintech, 4 products, ~40 people. Open to studio or freelancer.", topic: "B2B redesign" },
    { headline: "Redesigning our website — need someone who can rethink the info architecture, not just skin it.", excerpt: "The visual layer is one problem, but the bigger issue is the site's structure. Anyone who can audit content and propose a cleaner IA before jumping into designs?", topic: "IA + visual redesign" },
    { headline: "Our conversion rate on the homepage is terrible — looking for a redesign focused on CRO.", excerpt: "We get decent traffic but very few demo requests. Need someone with CRO chops — happy to share analytics. Not looking for a pretty site, looking for one that converts.", topic: "CRO-focused redesign" },
  ],
  "WordPress": [
    { headline: "Looking for a WordPress developer to fix WooCommerce checkout — losing sales daily.", excerpt: "Something broke after the last plugin update and checkout is failing on mobile Safari. Losing orders every day this drags on. Can pay for urgent fix today or tomorrow.", topic: "Urgent WooCommerce fix" },
    { headline: "Need a WordPress dev to build a custom theme from our Figma files.", excerpt: "Not a page-builder fan, want a proper custom theme with ACF. Site is a professional services firm — about 25 pages plus a blog. Availability question first, then we can talk scope.", topic: "Custom theme build" },
    { headline: "WordPress help — site is getting hacked repeatedly, need security overhaul.", excerpt: "Third malware infection this year. Current host isn't helping. Need someone to clean, harden, and set up proper backups + monitoring. Long-term maintenance retainer likely.", topic: "Security cleanup" },
  ],
  "Webflow": [
    { headline: "Need a Webflow expert to rebuild our startup site — moving off WordPress.", excerpt: "Marketing team wants full control without dev tickets. Site is ~15 pages plus a blog and a resource library. Want it done in Webflow, CMS-first. Please share Webflow work you're proud of.", topic: "WP → Webflow rebuild" },
    { headline: "Looking for a Webflow developer to build interactions from a motion prototype.", excerpt: "Design is finished, motion is in Rive/Lottie. Need someone strong with Webflow interactions and IX2. Timeline is 3 weeks. Portfolio must show real interaction work, not just static pages.", topic: "Webflow IX2 build" },
    { headline: "Webflow help — CMS structure is a mess after 2 years of ad-hoc changes.", excerpt: "We've hit the limits of our current CMS setup. Collections are duplicated, references are broken, staging is unusable. Would love someone who can plan a cleaner structure and migrate content.", topic: "Webflow CMS cleanup" },
  ],
  "Wix": [
    { headline: "Wix site help — need someone to customize a template beyond what the editor allows.", excerpt: "We picked a Wix template that's 80% right, but the last 20% is fighting us. Need custom CSS/Velo help to get the details right. Not a full rebuild — polish and edge-case fixes.", topic: "Wix + Velo polish" },
    { headline: "Looking for a Wix expert to migrate our blog and set up proper SEO.", excerpt: "Blog is on a different platform, want it in Wix so the team can post easily. Also need proper redirects and SEO setup done right. About 60 posts to move.", topic: "Wix blog migration" },
  ],
  "Framer": [
    { headline: "Need a Framer designer/dev to rebuild our portfolio site — should feel premium.", excerpt: "Independent studio site. Want the Framer craft — smooth transitions, tasteful motion, a real point of view. About 8 pages plus a case-study CMS. Budget is fair for good work.", topic: "Framer portfolio" },
    { headline: "Anyone available to update a Framer site? Adding 3 new sections + a pricing page.", excerpt: "Site was built in Framer 6 months ago. Need to extend, not rebuild — keep the existing components, add new sections, add a pricing page with a toggle. Should be a couple of days for the right person.", topic: "Framer extension" },
    { headline: "Looking for someone to migrate a Webflow marketing site into Framer.", excerpt: "Marketing team wants to be on Framer for the collaboration experience. About 12 pages plus a CMS blog. Not a redesign — mostly a faithful port with a few improvements.", topic: "Webflow → Framer" },
  ],
  "Shopify": [
    { headline: "Need a Shopify → Shopify redesign — current theme feels dated, sales are stagnant.", excerpt: "We do ~$40k/month on Shopify but the site is holding us back. Would love a redesign focused on premium feel — apparel brand, strong photography. Ideally someone who's done DTC apparel before.", topic: "Shopify apparel redesign" },
    { headline: "Looking for a Shopify developer to fix a slow site — Core Web Vitals are red.", excerpt: "Site is on Dawn but we've added a lot over time and it's dragging. Need a proper performance pass. Would love an audit + fix rather than a full rebuild.", topic: "Shopify performance" },
    { headline: "Shopify website rebuild — leaving a big-box agency, looking for freelancer.", excerpt: "Been with the same agency for years and the relationship isn't working. Want to move to a freelancer or small team. About 40 SKUs, custom PDP, subscription integration. Referrals welcome.", topic: "Shopify rebuild" },
  ],
  "Landing Page": [
    { headline: "Need a landing page for a new service launch — 1 page, 2 weeks, must convert.", excerpt: "Launching a new offer next month and want a proper landing page — not a template. Hero, value props, social proof, pricing, FAQ, CTA. Copy is already in a doc. Design + build please.", topic: "Launch landing page" },
    { headline: "Looking for a designer/dev for a webinar landing page + thank-you flow.", excerpt: "Running a webinar in 3 weeks and need a landing page + signup form + thank-you page + email trigger. Small scope but I want it to actually convert. Zapier/Mailchimp integrated ideally.", topic: "Webinar funnel" },
    { headline: "Landing page work — need 6 variations for A/B testing our ad campaign.", excerpt: "Running paid ads and need proper LP variants — different hero, different social proof, different CTAs. Not looking for pretty, looking for a designer who thinks about conversion.", topic: "LP variants for ads" },
  ],
  "CMS Migration": [
    { headline: "CMS migration help — moving off Contentful, evaluating Sanity vs Storyblok.", excerpt: "About 400 entries, custom content model, English + German. Would love someone who's actually done this before and can recommend based on our setup. Not just \"whatever's cheapest.\"", topic: "CMS platform migration" },
    { headline: "Need someone to move us from Wix to WordPress — 30+ pages, SEO must be preserved.", excerpt: "Site is on Wix, hitting its limits, need to move to WordPress. Content isn't huge but SEO matters — we rank for a lot of terms. Redirects, sitemaps, everything needs to be right.", topic: "Wix → WordPress" },
    { headline: "Looking for help migrating from Squarespace to Webflow, keeping the blog intact.", excerpt: "Squarespace has been fine but we've outgrown it. Want to move to Webflow so we can build proper case studies. Blog needs to come across with authors, categories, and images.", topic: "Squarespace → Webflow" },
  ],
};

const REPLY_ANGLE_TEMPLATES = [
  (name: string, cat: string) => `Hi ${name}, saw your post about the ${cat.toLowerCase()} — I've shipped a few of these recently and can share 2-3 relevant examples if useful.`,
  (name: string, cat: string) => `Hey ${name}, quick note on your ${cat.toLowerCase()} post: happy to jump on a 15-min call this week if you want to talk scope before shortlisting.`,
  (name: string, cat: string) => `Hi ${name}, before you shortlist for the ${cat.toLowerCase()} work — I put together a short Loom walking through how I'd approach it. Want me to send it over?`,
];

const TAG_POOL: Partial<Record<LeadCategory, string[]>> = {
  "WordPress": ["WordPress", "WooCommerce"],
  "Webflow": ["Webflow", "CMS"],
  "Wix": ["Wix", "Velo"],
  "Framer": ["Framer", "Motion"],
  "Shopify": ["Shopify", "DTC"],
  "Landing Page": ["Landing", "Conversion"],
  "CMS Migration": ["Migration", "CMS"],
  "Website Design": ["Design"],
  "Website Development": ["Dev"],
  "Website Redesign": ["Redesign"],
};

const PLATFORM_MIX: LeadPlatform[] = [
  "facebook", "facebook", "facebook",
  "linkedin", "linkedin", "linkedin", "linkedin",
  "reddit", "reddit", "reddit",
  "instagram", "instagram",
  "x", "x",
  "threads",
];

const OWNER_POOL = ["Nasir", "Sara", "Mei"];
const STAGE_POOL = ["New", "Qualified", "Proposal", "Negotiation"];

const slug = (s: string, i: number) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + `-${i.toString(36)}`;

function pick<T>(rng: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function generateLeads(count: number): Lead[] {
  const rng = mulberry32(20260702);
  const countries = (LEAD_COUNTRIES.filter((c) => c !== "All") as Exclude<LeadCountry, "All">[]);
  const cats = LEAD_CATEGORIES;
  const out: Lead[] = [];

  for (let i = 0; i < count; i++) {
    const first = pick(rng, FIRST_NAMES);
    const last = pick(rng, LAST_NAMES);
    const name = `${first} ${last}`;
    const company = `${pick(rng, COMPANY_ROOT)} ${pick(rng, COMPANY_SUFFIX)}`;
    const role = pick(rng, ROLE_POOL);
    const country = pick(rng, countries);
    const loc = pick(rng, CITY_BY_COUNTRY[country]);
    const platform = pick(rng, PLATFORM_MIX);
    const category = pick(rng, cats);
    const tmplList = POST_TEMPLATES[category];
    const tmpl = tmplList[Math.floor(rng() * tmplList.length)];

    const score = 40 + Math.floor(rng() * 60); // 40-99
    const status: LeadStatus = score >= 80 ? "hot" : score >= 60 ? "warm" : "cold";
    const intent: LeadIntent = score >= 80 ? "High" : score >= 60 ? "Medium" : "Low";
    const urgency: LeadUrgency = score >= 82 ? "Urgent" : score >= 62 ? "This week" : "Exploring";
    const qualification: LeadQualification =
      rng() < 0.55 ? "unreviewed" : rng() < 0.75 ? "qualified" : "disqualified";
    const source: LeadSource =
      platform === "linkedin" ? "linkedin" :
      platform === "facebook" ? "facebook" : "instagram";

    const handle = "@" + (first + "." + last).toLowerCase().replace(/[^a-z.]/g, "");
    const domain = company.toLowerCase().replace(/[^a-z0-9]+/g, "") + pick(rng, [".com", ".co", ".io", ".studio"]);
    const email = `${first}@${domain}`.toLowerCase();
    const phone = `${loc.dial} ${String(1000 + Math.floor(rng() * 8999))}`;

    const day = ((i * 3) % 27) + 1;
    const hh = ((i * 7) % 22) + 1;
    const mm = (i * 11) % 59;
    const pad = (n: number) => String(n).padStart(2, "0");
    const postedAt = `${pad(day)}-06-2026 | ${pad(hh)}:${pad(mm)}`;

    // Age → "updated" label
    const ageMinutes = Math.floor(rng() * 60 * 24 * 10);
    const updated =
      ageMinutes < 60      ? `${ageMinutes}m ago` :
      ageMinutes < 60 * 24 ? `${Math.floor(ageMinutes / 60)}h ago` :
                             `${Math.floor(ageMinutes / (60 * 24))}d ago`;

    const tags = TAG_POOL[category] ?? [];
    const dealValue = 800 + Math.floor(rng() * 24_200);
    const comments = Math.floor(rng() * 22);
    const reactions = Math.max(1, Math.floor(rng() * 60) + (status === "hot" ? 15 : 0));
    const shares = Math.floor(rng() * 8);
    const drafts = Math.floor(rng() * 4);

    const postId = Math.floor(rng() * 900_000_000) + 100_000_000;
    const postUrl =
      platform === "linkedin" ? `https://www.linkedin.com/posts/${first.toLowerCase()}-${last.toLowerCase()}-${postId}` :
      platform === "reddit"   ? `https://www.reddit.com/r/webdev/comments/${postId.toString(36)}/` :
      platform === "x"        ? `https://x.com/${first.toLowerCase()}${last.toLowerCase()}/status/${postId}` :
      platform === "threads"  ? `https://www.threads.net/${first.toLowerCase()}.${last.toLowerCase()}/post/${postId.toString(36)}` :
      platform === "instagram"? `https://www.instagram.com/p/${postId.toString(36)}/` :
                                 `https://www.facebook.com/${first.toLowerCase()}.${last.toLowerCase()}/posts/${postId}`;

    const replyAngles = REPLY_ANGLE_TEMPLATES.map((fn) => fn(first, category));

    out.push({
      id: slug(name, i),
      name, company, role, source, score, status,
      stage: pick(rng, STAGE_POOL),
      owner: pick(rng, OWNER_POOL),
      updated,
      email, phone,
      city: `${loc.city}, ${country.split(" ").map(w => w[0]).join("")}`,
      country,
      website: domain,
      tags,
      about: tmpl.excerpt,
      dealValue,
      createdAt: `Jun ${pad(day)}, 2026`,
      category, intent, platform, qualification,
      favourite: rng() < 0.18,
      headline: tmpl.headline,
      topic: tmpl.topic,
      comments, drafts, postedAt,
      postExcerpt: tmpl.excerpt,
      postUrl,
      authorHandle: handle,
      urgency,
      reactions, shares,
      replyAngles,
      flag: loc.flag,
    });
  }
  return out;
}

export const LEADS: Lead[] = generateLeads(100);

export const getLeadById = (id: string): Lead | undefined =>
  LEADS.find((l) => l.id === id);

export const LEAD_STAGES = ["New", "Qualified", "Proposal", "Negotiation", "Closed-Won"] as const;
export const LEAD_OWNERS = ["Nasir", "Sara", "Mei"] as const;
export const LEAD_SOURCES: LeadSource[] = ["instagram", "linkedin", "facebook"];
