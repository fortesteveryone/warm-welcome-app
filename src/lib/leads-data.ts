export type LeadStatus = "hot" | "warm" | "cold";
export type LeadSource = "instagram" | "linkedin" | "facebook";
export type LeadIntent = "High" | "Medium" | "Low";
export type LeadQualification = "qualified" | "disqualified" | "unreviewed";
export type LeadPlatform =
  | "facebook" | "linkedin" | "instagram" | "reddit" | "whatsapp" | "twitter" | "x"
  | "youtube" | "tiktok" | "telegram" | "discord" | "snapchat" | "pinterest"
  | "threads" | "wechat" | "line" | "quora" | "medium" | "github"
  | "behance" | "dribbble" | "twitch" | "mastodon" | "other";

export const LEAD_CATEGORIES = [
  "Digital marketing", "Video Editor", "Website", "Graphic design",
  "SaaS", "E-commerce", "Coaching", "Real Estate", "F&B", "Healthcare",
] as const;
export type LeadCategory = (typeof LEAD_CATEGORIES)[number];

export const LEAD_INTENTS: LeadIntent[] = ["High", "Medium", "Low"];
export const LEAD_QUALIFICATIONS: LeadQualification[] = ["qualified", "disqualified", "unreviewed"];

export const LEAD_PLATFORMS: LeadPlatform[] = [
  "facebook", "linkedin", "instagram", "reddit", "whatsapp", "twitter", "x",
  "youtube", "tiktok", "telegram", "discord", "snapchat", "pinterest",
  "threads", "wechat", "line", "quora", "medium", "github",
  "behance", "dribbble", "twitch", "mastodon", "other",
];

export const LEAD_COUNTRIES = [
  "All", "Bangladesh", "United States", "India", "Germany", "Spain",
  "Ireland", "Japan", "Italy", "United Kingdom", "Pakistan", "Singapore",
  "United Arab Emirates",
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
  /** Post-style summary the user reads before spending a credit to open. */
  headline: string;
  /** Short topic / title pill rendered under the headline. */
  topic: string;
  /** Replies / comments on the original post. */
  comments: number;
  /** Drafts the team has prepared for this lead. */
  drafts: number;
  /** When the underlying post was published, e.g. "14-06-2026 | 17:52". */
  postedAt: string;
};

const HEADLINES: Record<LeadCategory, { headline: (n: string, c: string) => string; topic: string }> = {
  "Digital marketing": { headline: (n, c) => `${n} from ${c} is looking for a digital marketer to run paid ads and grow their pipeline this quarter.`, topic: "Paid ads & growth marketer" },
  "Video Editor":      { headline: (n)    => `${n} is hiring a video editor for a YouTube vlogger with 20k subscribers, needs 3 long-form edits per week.`, topic: "Video editor for YouTube vlog" },
  "Website":           { headline: (n, c) => `${n} is looking for a website developer to work on a ${c} portfolio website update and a fresh landing page.`, topic: "Website developer for portfolio" },
  "Graphic design":    { headline: (n, c) => `${n} from ${c} needs a graphic designer for an upcoming product launch — logo refresh, social kit and ad creatives.`, topic: "Graphic designer for launch kit" },
  "SaaS":              { headline: (n, c) => `${n} at ${c} is evaluating SaaS tools to replace their current CRM and asked for a 30-minute demo this week.`, topic: "Evaluating a new SaaS CRM" },
  "E-commerce":        { headline: (n, c) => `${n} runs ${c} on Shopify and is searching for help with conversion-rate optimisation and email flows.`, topic: "Shopify CRO + email flows" },
  "Coaching":          { headline: (n)    => `${n} wants a 1:1 sales coach to help close higher-ticket coaching offers and structure a new programme.`, topic: "Sales coach for high-ticket offers" },
  "Real Estate":       { headline: (n, c) => `${n} from ${c} is hiring a marketing partner to generate qualified seller leads in their local market.`, topic: "Local seller-lead generation" },
  "F&B":               { headline: (n, c) => `${n} owns ${c} and needs help building a delivery-first brand presence across Instagram and TikTok.`, topic: "F&B social presence" },
  "Healthcare":        { headline: (n, c) => `${n} at ${c} is looking for a paid social specialist with healthcare compliance experience to run patient-acquisition ads.`, topic: "Healthcare patient acquisition" },
};

function enrich(l: Omit<Lead, "id" | "headline" | "topic" | "comments" | "drafts" | "postedAt">, i: number): Lead {
  const tmpl = HEADLINES[l.category];
  const headline = tmpl.headline(l.name.split(" ")[0], l.company);
  const day = String(((i * 3) % 27) + 1).padStart(2, "0");
  const hh = String(((i * 7) % 22) + 1).padStart(2, "0");
  const mm = String(((i * 11) % 59)).padStart(2, "0");
  return {
    ...l,
    id: slug(l.name),
    headline,
    topic: tmpl.topic,
    comments: (i * 5) % 14,
    drafts: (i % 5) + 1,
    postedAt: `${day}-06-2026 | ${hh}:${mm}`,
  };
}

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type RawLead = Omit<Lead, "id">;

const RAW: RawLead[] = [
  { name: "Aisha Rahman", company: "Velvet & Co.", role: "Founder", source: "instagram", score: 92, status: "hot", stage: "Negotiation", owner: "Nasir", updated: "2m ago", email: "aisha@velvet.co", phone: "+880 1711 234567", city: "Dhaka, BD", country: "Bangladesh", website: "velvet.co", tags: ["VIP", "Apparel"], about: "Founder of a fast-growing premium apparel label, building direct-to-consumer channels across South Asia and the Gulf.", dealValue: 12500, createdAt: "Mar 02, 2026", category: "E-commerce", intent: "High", platform: "instagram", qualification: "qualified", favourite: true },
  { name: "Marcus Lin", company: "Northwave Studio", role: "CMO", source: "linkedin", score: 88, status: "hot", stage: "Proposal", owner: "Nasir", updated: "14m ago", email: "marcus@northwave.io", phone: "+1 415 555 0144", city: "San Francisco, US", country: "United States", website: "northwave.io", tags: ["Agency"], about: "Marketing lead at a boutique brand studio serving SaaS and consumer startups.", dealValue: 24800, createdAt: "Feb 18, 2026", category: "Digital marketing", intent: "High", platform: "linkedin", qualification: "qualified", favourite: true },
  { name: "Priya Devi", company: "Saffron Kitchen", role: "Owner", source: "facebook", score: 74, status: "warm", stage: "Qualified", owner: "Sara", updated: "1h ago", email: "priya@saffron.kitchen", phone: "+91 98765 43210", city: "Mumbai, IN", country: "India", website: "saffron.kitchen", tags: ["F&B", "Local"], about: "Owner of a popular regional cloud kitchen network expanding to tier-1 cities.", dealValue: 4800, createdAt: "Apr 11, 2026", category: "F&B", intent: "Medium", platform: "facebook", qualification: "qualified", favourite: false },
  { name: "Jonas Weber", company: "Atlas Logistics", role: "Ops Lead", source: "linkedin", score: 67, status: "warm", stage: "Qualified", owner: "Sara", updated: "3h ago", email: "j.weber@atlas-log.de", phone: "+49 30 9876543", city: "Berlin, DE", country: "Germany", website: "atlas-log.de", tags: ["Enterprise"], about: "Heads ground operations for a mid-market EU logistics provider.", dealValue: 38200, createdAt: "Jan 30, 2026", category: "SaaS", intent: "Medium", platform: "linkedin", qualification: "unreviewed", favourite: false },
  { name: "Camila Reyes", company: "Lumen Health", role: "Marketing", source: "instagram", score: 51, status: "cold", stage: "New", owner: "Nasir", updated: "5h ago", email: "camila@lumenhealth.io", phone: "+34 612 345 678", city: "Madrid, ES", country: "Spain", website: "lumenhealth.io", tags: ["Healthcare"], about: "Runs paid social for a women's health subscription brand in EU + LATAM.", dealValue: 6200, createdAt: "May 04, 2026", category: "Healthcare", intent: "Low", platform: "instagram", qualification: "unreviewed", favourite: false },
  { name: "David O'Connor", company: "Hearth Realty", role: "Broker", source: "facebook", score: 48, status: "cold", stage: "New", owner: "Mei", updated: "8h ago", email: "david@hearthrealty.com", phone: "+353 1 555 0199", city: "Dublin, IE", country: "Ireland", website: "hearthrealty.com", tags: ["Real Estate"], about: "Independent broker focused on luxury residential listings.", dealValue: 9100, createdAt: "May 22, 2026", category: "Real Estate", intent: "Low", platform: "facebook", qualification: "disqualified", favourite: false },
  { name: "Yuki Tanaka", company: "Mori Apparel", role: "Founder", source: "instagram", score: 83, status: "hot", stage: "Proposal", owner: "Mei", updated: "1d ago", email: "yuki@moriapparel.jp", phone: "+81 80 1234 5678", city: "Tokyo, JP", country: "Japan", website: "moriapparel.jp", tags: ["Apparel", "VIP"], about: "Founder of a heritage-minded apparel brand exporting to North America.", dealValue: 18900, createdAt: "Feb 09, 2026", category: "E-commerce", intent: "High", platform: "tiktok", qualification: "qualified", favourite: true },
  { name: "Ravi Shah", company: "Bluepeak SaaS", role: "Growth", source: "linkedin", score: 71, status: "warm", stage: "Qualified", owner: "Nasir", updated: "1d ago", email: "ravi@bluepeak.io", phone: "+1 646 555 0123", city: "New York, US", country: "United States", website: "bluepeak.io", tags: ["SaaS"], about: "Growth lead at a vertical SaaS company in the property-management space.", dealValue: 15400, createdAt: "Mar 21, 2026", category: "SaaS", intent: "Medium", platform: "twitter", qualification: "qualified", favourite: false },
  { name: "Elena Costa", company: "Costa Wines", role: "Director", source: "instagram", score: 78, status: "warm", stage: "Proposal", owner: "Sara", updated: "2d ago", email: "elena@costawines.it", phone: "+39 06 1234 5678", city: "Rome, IT", country: "Italy", website: "costawines.it", tags: ["F&B", "Luxury"], about: "Third-generation winery exporting to the US and Asia.", dealValue: 22000, createdAt: "Feb 28, 2026", category: "F&B", intent: "High", platform: "instagram", qualification: "qualified", favourite: true },
  { name: "Liam Foster", company: "Foster Fitness", role: "Founder", source: "instagram", score: 64, status: "warm", stage: "New", owner: "Mei", updated: "2d ago", email: "liam@fosterfit.com", phone: "+44 20 7946 0958", city: "London, UK", country: "United Kingdom", website: "fosterfit.com", tags: ["Fitness"], about: "Online coaching brand with 80k IG followers.", dealValue: 5400, createdAt: "Apr 04, 2026", category: "Coaching", intent: "Medium", platform: "youtube", qualification: "unreviewed", favourite: false },
  { name: "Sana Iqbal", company: "Nova Beauty", role: "Marketing", source: "facebook", score: 56, status: "cold", stage: "New", owner: "Nasir", updated: "3d ago", email: "sana@novabeauty.pk", phone: "+92 300 1234567", city: "Karachi, PK", country: "Pakistan", website: "novabeauty.pk", tags: ["Beauty"], about: "DTC beauty brand expanding into the GCC.", dealValue: 3800, createdAt: "May 12, 2026", category: "Digital marketing", intent: "Low", platform: "facebook", qualification: "unreviewed", favourite: false },
  { name: "Tom Becker", company: "Becker Build Co.", role: "Owner", source: "linkedin", score: 39, status: "cold", stage: "New", owner: "Mei", updated: "4d ago", email: "tom@beckerbuild.com", phone: "+1 312 555 0167", city: "Chicago, US", country: "United States", website: "beckerbuild.com", tags: ["Construction"], about: "Custom-home builder serving the Greater Chicago area.", dealValue: 2400, createdAt: "May 28, 2026", category: "Website", intent: "Low", platform: "linkedin", qualification: "disqualified", favourite: false },
  { name: "Mei Wong", company: "Lotus Travel", role: "Founder", source: "instagram", score: 81, status: "hot", stage: "Negotiation", owner: "Sara", updated: "5d ago", email: "mei@lotustravel.sg", phone: "+65 8123 4567", city: "Singapore, SG", country: "Singapore", website: "lotustravel.sg", tags: ["Travel", "VIP"], about: "Boutique travel curator for HNW clients across APAC.", dealValue: 31000, createdAt: "Jan 15, 2026", category: "Video Editor", intent: "High", platform: "instagram", qualification: "qualified", favourite: true },
  { name: "Felix Brandt", company: "Brandt Audio", role: "CEO", source: "linkedin", score: 73, status: "warm", stage: "Proposal", owner: "Nasir", updated: "6d ago", email: "felix@brandtaudio.de", phone: "+49 40 9876543", city: "Hamburg, DE", country: "Germany", website: "brandtaudio.de", tags: ["Hardware"], about: "Premium audio hardware brand selling DTC in EU + NA.", dealValue: 14600, createdAt: "Mar 09, 2026", category: "E-commerce", intent: "Medium", platform: "youtube", qualification: "qualified", favourite: false },
  { name: "Aaliyah Khan", company: "Khan Legal", role: "Partner", source: "linkedin", score: 60, status: "warm", stage: "Qualified", owner: "Sara", updated: "1w ago", email: "aaliyah@khanlegal.ae", phone: "+971 4 123 4567", city: "Dubai, AE", country: "United Arab Emirates", website: "khanlegal.ae", tags: ["Legal"], about: "Boutique law firm focused on cross-border corporate work.", dealValue: 8200, createdAt: "Apr 22, 2026", category: "Graphic design", intent: "Medium", platform: "linkedin", qualification: "unreviewed", favourite: false },
];

export const LEADS: Lead[] = RAW.map((l) => ({ ...l, id: slug(l.name) }));

export const getLeadById = (id: string): Lead | undefined =>
  LEADS.find((l) => l.id === id);

export const LEAD_STAGES = ["New", "Qualified", "Proposal", "Negotiation", "Closed-Won"] as const;
export const LEAD_OWNERS = ["Nasir", "Sara", "Mei"] as const;
export const LEAD_SOURCES: LeadSource[] = ["instagram", "linkedin", "facebook"];
