export type LeadStatus = "hot" | "warm" | "cold";
export type LeadSource = "instagram" | "linkedin" | "facebook";

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
  website: string;
  tags: string[];
  about: string;
  dealValue: number;
  createdAt: string;
};

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const RAW: Omit<Lead, "id">[] = [
  { name: "Aisha Rahman", company: "Velvet & Co.", role: "Founder", source: "instagram", score: 92, status: "hot", stage: "Negotiation", owner: "Nasir", updated: "2m ago", email: "aisha@velvet.co", phone: "+880 1711 234567", city: "Dhaka, BD", website: "velvet.co", tags: ["VIP", "Apparel"], about: "Founder of a fast-growing premium apparel label, building direct-to-consumer channels across South Asia and the Gulf.", dealValue: 12500, createdAt: "Mar 02, 2026" },
  { name: "Marcus Lin", company: "Northwave Studio", role: "CMO", source: "linkedin", score: 88, status: "hot", stage: "Proposal", owner: "Nasir", updated: "14m ago", email: "marcus@northwave.io", phone: "+1 415 555 0144", city: "San Francisco, US", website: "northwave.io", tags: ["Agency"], about: "Marketing lead at a boutique brand studio serving SaaS and consumer startups.", dealValue: 24800, createdAt: "Feb 18, 2026" },
  { name: "Priya Devi", company: "Saffron Kitchen", role: "Owner", source: "facebook", score: 74, status: "warm", stage: "Qualified", owner: "Sara", updated: "1h ago", email: "priya@saffron.kitchen", phone: "+91 98765 43210", city: "Mumbai, IN", website: "saffron.kitchen", tags: ["F&B", "Local"], about: "Owner of a popular regional cloud kitchen network expanding to tier-1 cities.", dealValue: 4800, createdAt: "Apr 11, 2026" },
  { name: "Jonas Weber", company: "Atlas Logistics", role: "Ops Lead", source: "linkedin", score: 67, status: "warm", stage: "Qualified", owner: "Sara", updated: "3h ago", email: "j.weber@atlas-log.de", phone: "+49 30 9876543", city: "Berlin, DE", website: "atlas-log.de", tags: ["Enterprise"], about: "Heads ground operations for a mid-market EU logistics provider.", dealValue: 38200, createdAt: "Jan 30, 2026" },
  { name: "Camila Reyes", company: "Lumen Health", role: "Marketing", source: "instagram", score: 51, status: "cold", stage: "New", owner: "Nasir", updated: "5h ago", email: "camila@lumenhealth.io", phone: "+34 612 345 678", city: "Madrid, ES", website: "lumenhealth.io", tags: ["Healthcare"], about: "Runs paid social for a women's health subscription brand in EU + LATAM.", dealValue: 6200, createdAt: "May 04, 2026" },
  { name: "David O'Connor", company: "Hearth Realty", role: "Broker", source: "facebook", score: 48, status: "cold", stage: "New", owner: "Mei", updated: "8h ago", email: "david@hearthrealty.com", phone: "+353 1 555 0199", city: "Dublin, IE", website: "hearthrealty.com", tags: ["Real Estate"], about: "Independent broker focused on luxury residential listings.", dealValue: 9100, createdAt: "May 22, 2026" },
  { name: "Yuki Tanaka", company: "Mori Apparel", role: "Founder", source: "instagram", score: 83, status: "hot", stage: "Proposal", owner: "Mei", updated: "1d ago", email: "yuki@moriapparel.jp", phone: "+81 80 1234 5678", city: "Tokyo, JP", website: "moriapparel.jp", tags: ["Apparel", "VIP"], about: "Founder of a heritage-minded apparel brand exporting to North America.", dealValue: 18900, createdAt: "Feb 09, 2026" },
  { name: "Ravi Shah", company: "Bluepeak SaaS", role: "Growth", source: "linkedin", score: 71, status: "warm", stage: "Qualified", owner: "Nasir", updated: "1d ago", email: "ravi@bluepeak.io", phone: "+1 646 555 0123", city: "New York, US", website: "bluepeak.io", tags: ["SaaS"], about: "Growth lead at a vertical SaaS company in the property-management space.", dealValue: 15400, createdAt: "Mar 21, 2026" },
  { name: "Elena Costa", company: "Costa Wines", role: "Director", source: "instagram", score: 78, status: "warm", stage: "Proposal", owner: "Sara", updated: "2d ago", email: "elena@costawines.it", phone: "+39 06 1234 5678", city: "Rome, IT", website: "costawines.it", tags: ["F&B", "Luxury"], about: "Third-generation winery exporting to the US and Asia.", dealValue: 22000, createdAt: "Feb 28, 2026" },
  { name: "Liam Foster", company: "Foster Fitness", role: "Founder", source: "instagram", score: 64, status: "warm", stage: "New", owner: "Mei", updated: "2d ago", email: "liam@fosterfit.com", phone: "+44 20 7946 0958", city: "London, UK", website: "fosterfit.com", tags: ["Fitness"], about: "Online coaching brand with 80k IG followers.", dealValue: 5400, createdAt: "Apr 04, 2026" },
  { name: "Sana Iqbal", company: "Nova Beauty", role: "Marketing", source: "facebook", score: 56, status: "cold", stage: "New", owner: "Nasir", updated: "3d ago", email: "sana@novabeauty.pk", phone: "+92 300 1234567", city: "Karachi, PK", website: "novabeauty.pk", tags: ["Beauty"], about: "DTC beauty brand expanding into the GCC.", dealValue: 3800, createdAt: "May 12, 2026" },
  { name: "Tom Becker", company: "Becker Build Co.", role: "Owner", source: "linkedin", score: 39, status: "cold", stage: "New", owner: "Mei", updated: "4d ago", email: "tom@beckerbuild.com", phone: "+1 312 555 0167", city: "Chicago, US", website: "beckerbuild.com", tags: ["Construction"], about: "Custom-home builder serving the Greater Chicago area.", dealValue: 2400, createdAt: "May 28, 2026" },
  { name: "Mei Wong", company: "Lotus Travel", role: "Founder", source: "instagram", score: 81, status: "hot", stage: "Negotiation", owner: "Sara", updated: "5d ago", email: "mei@lotustravel.sg", phone: "+65 8123 4567", city: "Singapore, SG", website: "lotustravel.sg", tags: ["Travel", "VIP"], about: "Boutique travel curator for HNW clients across APAC.", dealValue: 31000, createdAt: "Jan 15, 2026" },
  { name: "Felix Brandt", company: "Brandt Audio", role: "CEO", source: "linkedin", score: 73, status: "warm", stage: "Proposal", owner: "Nasir", updated: "6d ago", email: "felix@brandtaudio.de", phone: "+49 40 9876543", city: "Hamburg, DE", website: "brandtaudio.de", tags: ["Hardware"], about: "Premium audio hardware brand selling DTC in EU + NA.", dealValue: 14600, createdAt: "Mar 09, 2026" },
  { name: "Aaliyah Khan", company: "Khan Legal", role: "Partner", source: "linkedin", score: 60, status: "warm", stage: "Qualified", owner: "Sara", updated: "1w ago", email: "aaliyah@khanlegal.ae", phone: "+971 4 123 4567", city: "Dubai, AE", website: "khanlegal.ae", tags: ["Legal"], about: "Boutique law firm focused on cross-border corporate work.", dealValue: 8200, createdAt: "Apr 22, 2026" },
];

export const LEADS: Lead[] = RAW.map((l) => ({ ...l, id: slug(l.name) }));

export const getLeadById = (id: string): Lead | undefined =>
  LEADS.find((l) => l.id === id);

export const LEAD_STAGES = ["New", "Qualified", "Proposal", "Negotiation", "Closed-Won"] as const;
export const LEAD_OWNERS = ["Nasir", "Sara", "Mei"] as const;
export const LEAD_SOURCES: LeadSource[] = ["instagram", "linkedin", "facebook"];
