// Real photography (Unsplash) — people, offices, real screens.
const facebookGroupsCover = "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=1600&q=80";
const wordpressVsWebflowCover = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=80";
const wordpressChecklistCover = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80";
const webflowPricingCover = "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80";
const linkedinDmCover = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80";
const discoveryQuestionsCover = "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1600&q=80";
const framerVsWixCover = "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1600&q=80";
const cmsMigrationCover = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80";
const freelancerToAgencyCover = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80";

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

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "find-website-clients-on-facebook-groups",
    title: "How to find website design clients in Facebook groups (without sounding like spam)",
    excerpt:
      "A repeatable, human system for spotting real buying intent in public Facebook groups — how to filter noise, read the signals that actually matter, and send a first message people want to reply to.",
    category: "Lead generation",
    tags: ["Facebook", "Outreach", "Web design"],
    author: { name: "Arifa Rahman", role: "Lead strategist · Postly", avatar: av(47) },
    date: "2026-07-02",
    readMinutes: 9,
    cover: facebookGroupsCover,
    body: [
      { type: "p", text: "Facebook groups are one of the noisiest — and most overlooked — corners of the web for finding website clients. Thousands of small business owners post every day asking for help redesigning their site, migrating away from a builder they've outgrown, or fixing something that's been broken for months. Most freelancers scroll past those posts because the signal is buried under memes, self-promotion, and half-answered questions." },
      { type: "p", text: "The good news: you don't need a growth hack or an AI scraper. You need a filter for real intent and a message that sounds like it was written by a human who actually read the post. This guide walks through both." },
      { type: "h2", text: "Stop chasing every 'need a website' post" },
      { type: "p", text: "Not every request is a real lead. A lot of them are people fishing for free advice, students building portfolios, or scammers baiting responses. Before you type a single word, ask three questions about the post." },
      { type: "list", items: [
        "Is there a specific problem or platform mentioned? 'My WordPress site is slow after the last update' beats 'need a website'.",
        "Is there any signal of budget, urgency, or timeline? Words like 'this month', 'launching soon', or 'we've been quoted $X' are gold.",
        "Does the person's profile look like a real business? A linked page, a location, a headshot — small trust cues that add up.",
      ]},
      { type: "p", text: "If two out of three are true, it's worth writing a reply. If only one is true, save your energy — there are better posts one scroll away." },
      { type: "h2", text: "Read the post like a human, not a keyword scanner" },
      { type: "p", text: "The single biggest mistake freelancers make is treating outreach like search. They see the word 'Webflow' and paste a generic 'I'm a Webflow expert, DM me' comment. The person who posted has read that same reply forty times today and will ignore yours too." },
      { type: "p", text: "Instead, read the whole post. Notice the tone. Notice what they didn't say. Are they frustrated? Overwhelmed? Trying to sound more technical than they are? Your first sentence should reference something specific enough that they know you actually read it — not something you could have written before opening the post." },
      { type: "h2", text: "The one-message framework that consistently gets replies" },
      { type: "list", items: [
        "Sentence 1 — a specific observation from their post (not a compliment).",
        "Sentence 2 — one short, useful thought that hints at how you'd approach it.",
        "Sentence 3 — a low-pressure question they can answer in five seconds.",
      ]},
      { type: "p", text: "That's the whole message. No portfolio. No rates. No 'let me know if you're interested'. The goal of the first message is a reply, not a sale. Once they reply, you've earned the right to send the second one — and that's where the real conversation starts." },
      { type: "quote", text: "If your first message could be sent to a hundred different posts, it's not outreach — it's spam wearing a nicer font." },
      { type: "h2", text: "What to do after the first reply" },
      { type: "p", text: "When someone replies, resist the urge to send your whole pitch in one wall of text. Ask one more clarifying question, then propose a short call — ten to fifteen minutes, framed as 'a quick chat to see if we're a fit'. That framing lowers the stakes for them and protects your calendar." },
      { type: "p", text: "Do this consistently for a few weeks and you'll notice something: the clients who come from a real, specific conversation are almost always the best clients. They pay on time, they respect your process, and they refer other people who post the same kinds of questions." },
    ],
  },
  {
    slug: "wordpress-vs-webflow-2026",
    title: "WordPress vs Webflow in 2026: which one wins your next client project?",
    excerpt:
      "An honest, project-by-project breakdown of when to pick WordPress and when to pick Webflow — including the questions that decide it before you ever open a design tool.",
    category: "WordPress",
    tags: ["WordPress", "Webflow", "CMS"],
    author: { name: "Tanvir Hasan", role: "Senior web developer", avatar: av(12) },
    date: "2026-06-30",
    readMinutes: 11,
    cover: wordpressVsWebflowCover,
    body: [
      { type: "p", text: "The WordPress vs Webflow argument has been running for so long that most articles about it have stopped being useful. They compare features that don't matter to real clients, ignore the operational cost of each platform, and never mention the person who will actually be editing the site six months after launch." },
      { type: "p", text: "In 2026, the honest answer is that both platforms are excellent — and they're excellent at different things. The question isn't which is 'better', it's which is better for this client, this budget, and this timeline." },
      { type: "h2", text: "The three questions that decide it" },
      { type: "list", items: [
        "Who edits the site after launch — the client, a marketing team, or you?",
        "How much of the site is content vs. marketing pages?",
        "What's the client's tolerance for ongoing maintenance and cost?",
      ]},
      { type: "p", text: "If the client edits the site themselves and gets nervous around anything that looks technical, Webflow is almost always the calmer choice. If a marketing team ships new landing pages every week and needs custom fields, WordPress or Webflow can both work — but WordPress wins on flexibility and Webflow wins on speed. If you're the one editing, pick the one you're faster in." },
      { type: "h2", text: "When WordPress still wins" },
      { type: "p", text: "WordPress remains the right answer for content-heavy sites, WooCommerce stores, membership products, sites that need dozens of custom post types, and clients who want to fully own their hosting and code. The plugin ecosystem is still unmatched — for almost any request, there's a mature plugin that solves 80% of it out of the box." },
      { type: "p", text: "It's also the right answer when the client already has an internal team who knows WordPress. Fighting that muscle memory just to move them to Webflow rarely pays off." },
      { type: "h2", text: "When Webflow is the easy answer" },
      { type: "p", text: "Webflow wins on marketing sites, brand-led websites, fast product launches, and any project where design polish and animation matter more than heavy backend logic. The visual editor is genuinely production-grade in 2026, and clients love that they can edit copy without breaking the layout." },
      { type: "p", text: "It's also the safer choice for smaller teams. There are no plugin updates to babysit, no security patches to worry about, and hosting is one line item instead of five." },
      { type: "h2", text: "The trade-offs nobody puts on their sales page" },
      { type: "list", items: [
        "WordPress: more flexible, but you're now on the hook for updates, security, and hosting decisions.",
        "Webflow: faster to ship, but you're locked into one company's roadmap and pricing.",
        "WordPress: cheaper up front, more expensive over 3 years once you count maintenance.",
        "Webflow: predictable monthly cost, harder to move off of once you're deep in it.",
      ]},
      { type: "quote", text: "Pick the platform based on who is editing the site in month six, not the mood in month one." },
      { type: "h2", text: "How we actually decide in a discovery call" },
      { type: "p", text: "We ask the client to describe the last time they edited their current website. If they say 'I asked our developer', we know they don't want to touch code. If they say 'I opened WordPress and updated the homepage myself', we know they're comfortable and we can lean into flexibility. That single question tells us more than any feature checklist." },
      { type: "p", text: "The projects that fail aren't the ones on the wrong platform — they're the ones where the platform was chosen for the developer's preference instead of the client's daily reality. Pick for them, not for you, and both platforms will make you look good." },
    ],
  },
  {
    slug: "wordpress-redesign-checklist",
    title: "The 12-point WordPress redesign checklist we run for every new client",
    excerpt:
      "A practical, no-fluff checklist you can work through in a single afternoon — theme audits, plugin cleanup, speed wins, content structure and the tiny fixes clients always notice.",
    category: "WordPress",
    tags: ["WordPress", "Redesign", "Checklist"],
    author: { name: "Maya Chen", role: "WordPress consultant", avatar: av(32) },
    date: "2026-06-28",
    readMinutes: 8,
    cover: wordpressChecklistCover,
    body: [
      { type: "p", text: "Most WordPress sites don't need a rebuild. They need a focused redesign that fixes the twelve things clients actually notice — and quietly cleans up the mess underneath while you're in there." },
      { type: "p", text: "This is the checklist we run before we ever open the design tool. Every item takes minutes, not hours. Together they save days of back-and-forth later and give you a much stronger baseline to design on top of." },
      { type: "h2", text: "Start with the plumbing" },
      { type: "list", items: [
        "Audit the active theme — is it still maintained, and does it fight you every time you try to change a layout?",
        "Remove every plugin the site doesn't actively use (in most projects this is 30–40% of them).",
        "Update WordPress core, the theme, and every remaining plugin on staging before you touch production.",
        "Compress every image over 200KB and switch to WebP where the theme allows it.",
        "Enable page caching plus a real CDN — even a free one is a huge win.",
      ]},
      { type: "h2", text: "Then fix the structure" },
      { type: "list", items: [
        "Rewrite the main navigation so no menu has more than five items.",
        "Give every page exactly one primary call-to-action — no more competing buttons.",
        "Add breadcrumbs on any deeper page so users always know where they are.",
        "Test the mobile menu on a real phone, not just the device toolbar.",
      ]},
      { type: "h2", text: "Finally, the trust layer" },
      { type: "list", items: [
        "Update the footer year, phone number, and hours — the details clients forget about.",
        "Fix every broken link on the top 20 pages.",
        "Add real social share previews (OG image, description) to every important URL.",
      ]},
      { type: "p", text: "Twelve items. A quiet afternoon. When you show the client the before/after speed score and the cleaned-up navigation, they'll think you rebuilt the whole thing — and you'll have a much healthier site to redesign on top of." },
      { type: "quote", text: "The best WordPress redesigns are the ones where you fixed everything you could before you designed anything." },
    ],
  },
  {
    slug: "webflow-redesign-pricing-guide",
    title: "How to price a Webflow redesign without scaring the client (or underselling yourself)",
    excerpt:
      "Stop quoting flat fees from gut feel. A three-tier pricing structure that makes Webflow redesigns feel safe, predictable, and easy for the client to say yes to.",
    category: "Webflow",
    tags: ["Webflow", "Pricing", "Redesign"],
    author: { name: "Lucas Pereira", role: "Webflow studio owner", avatar: av(15) },
    date: "2026-06-26",
    readMinutes: 7,
    cover: webflowPricingCover,
    body: [
      { type: "p", text: "Most clients flinch at a single big number. Even when they know the work is worth it, one giant quote feels risky — and 'risky' is the exact feeling you don't want them sitting with when they're about to make a decision." },
      { type: "p", text: "The fix is almost embarrassingly simple: break the project into three tiers and let them pick. You're not lowering your price. You're giving them a way to say 'yes' at the level that matches their current appetite for risk." },
      { type: "h2", text: "Tier 1 — Refresh" },
      { type: "p", text: "Keep the sitemap, keep the CMS structure, restyle the visuals. New type, new spacing, new hero, tightened components. This is the fastest path to a 'wow' moment and the easiest yes for a nervous client." },
      { type: "p", text: "It's also a great foot in the door. Refresh projects that go well almost always turn into restructure projects six months later." },
      { type: "h2", text: "Tier 2 — Restructure" },
      { type: "p", text: "New information architecture, new templates, same brand foundation. This is where most Webflow redesigns actually land — and it's the tier that produces the biggest business results because you're fixing the navigation, hierarchy, and conversion paths, not just the paint." },
      { type: "p", text: "Price this with a discovery phase built in. Never quote a restructure blind." },
      { type: "h2", text: "Tier 3 — Rebuild" },
      { type: "p", text: "New everything. New brand direction, new content strategy, new CMS models, new integrations. Quote this as its own phased project with its own discovery, its own kickoff, and its own timeline." },
      { type: "p", text: "Rebuilds are where scope creep goes to die if you don't set boundaries early. Make the phases explicit and bill them separately." },
      { type: "quote", text: "Three tiers turn a scary quote into a confident decision — the client isn't picking whether to work with you, they're picking how deep to go." },
      { type: "h2", text: "The one line that closes it" },
      { type: "p", text: "When you present the tiers, add one sentence at the bottom: 'Most clients your size pick Tier 2, and we can always expand later.' It's honest, it removes decision paralysis, and it points them toward the tier that's usually the right fit — without pressuring them." },
    ],
  },
  {
    slug: "linkedin-cold-dm-template-for-web-agencies",
    title: "The LinkedIn cold DM template that actually books calls for web agencies",
    excerpt:
      "A four-line LinkedIn DM template — with the reasoning behind every line — that consistently books discovery calls without sounding like a script or triggering the mental spam filter.",
    category: "Outreach",
    tags: ["LinkedIn", "Cold outreach", "Templates"],
    author: { name: "Priya Shah", role: "Outreach lead", avatar: av(23) },
    date: "2026-06-25",
    readMinutes: 6,
    cover: linkedinDmCover,
    body: [
      { type: "p", text: "Cold DMs on LinkedIn still work in 2026 — but only when they don't read like cold DMs. The mental spam filter is faster than ever, and one wrong word in the first line is enough to get archived without a reply." },
      { type: "p", text: "The template below is boring on purpose. There's no growth-hack subject line, no fake compliment, no 'hope this finds you well'. Just four lines, in a specific order, doing four specific jobs." },
      { type: "h2", text: "The template" },
      { type: "list", items: [
        "Line 1: Name + one specific observation about their business or website.",
        "Line 2: One sentence on why it caught your eye — a small, credible insight, not a pitch.",
        "Line 3: One short question they can answer in five seconds.",
        "Line 4: A low-pressure call ask, framed around them.",
      ]},
      { type: "h2", text: "Why each line matters" },
      { type: "p", text: "Line 1 proves you read something before you typed. This is the difference between a message and a broadcast. If you can't fill this line in without copying and pasting, don't send the message." },
      { type: "p", text: "Line 2 is the small gift. You're giving them one useful thought — a quick observation about their homepage, their CMS setup, a broken form, a slow page. Not a full audit. Not a pitch. Just enough that they feel you brought something to the conversation." },
      { type: "p", text: "Line 3 makes it easy to reply. 'Are you the right person to talk to about the site?' is a perfect five-second question. If they say yes, you're in. If they say no, they'll usually point you to who is." },
      { type: "p", text: "Line 4 lowers the stakes. 'Open to a 10-minute chat next week to see if it's a fit?' is very different from 'let's hop on a call'. Ten minutes feels safe. A fit-check feels mutual, not one-sided." },
      { type: "quote", text: "If replying takes more than five seconds of thinking, they don't reply. Make replying the easiest thing they do today." },
      { type: "h2", text: "What we do differently in 2026" },
      { type: "p", text: "We stopped sending connection requests with notes attached. In 2026 the plain connection request outperforms the noted one for most agencies — the note itself is now the flag that says 'this person is selling'. We connect first, wait a day, then send the message above." },
      { type: "p", text: "We also stopped opening with the person's job title. Everyone does that now, so it's become invisible. Opening with something they built, wrote, or posted feels a hundred times more human." },
    ],
  },
  {
    slug: "website-rebuild-discovery-questions",
    title: "21 discovery questions for a website rebuild project (that protect your scope)",
    excerpt:
      "Skip the generic intake form. These twenty-one questions surface the real reason your client wants a rebuild — and quietly protect your scope, timeline, and sanity from the start.",
    category: "Web design",
    tags: ["Discovery", "Rebuild", "Process"],
    author: { name: "Eitan Gold", role: "Design lead", avatar: av(7) },
    date: "2026-06-24",
    readMinutes: 10,
    cover: discoveryQuestionsCover,
    body: [
      { type: "p", text: "The first call decides whether a project is fun or painful. Ask better questions and everything downstream — the proposal, the design, the reviews, the launch — gets easier. Ask lazy questions and every phase inherits the ambiguity you left on the discovery call." },
      { type: "p", text: "These are the twenty-one questions we ask on every website rebuild kickoff. They're grouped in three buckets. Don't ask all of them mechanically — pull the ones that fit and let the conversation breathe." },
      { type: "h2", text: "Business questions" },
      { type: "list", items: [
        "What does success look like ninety days after launch — in numbers, not adjectives?",
        "Which page on the current site costs you the most money right now?",
        "Which page makes you the most money?",
        "What would a competitor have to do to genuinely scare you?",
        "If we could only improve one thing on the new site, what should it be?",
        "Who is the ideal visitor and what do they need to feel in the first five seconds?",
        "What's the one story about your business that people always remember?",
      ]},
      { type: "h2", text: "Project questions" },
      { type: "list", items: [
        "Who has final approval, and are they on this call?",
        "What's the real deadline — not the wished deadline?",
        "What happens if we miss it?",
        "Who else is involved in reviews — legal, brand, engineering?",
        "What's the budget range you're comfortable with, before I quote?",
        "What's your rough sitemap idea, and what would you cut if you had to?",
        "How will content be produced — do you have a writer, or are we writing?",
      ]},
      { type: "h2", text: "Technical & ownership questions" },
      { type: "list", items: [
        "What CMS are you on today, and what's the appetite for switching?",
        "Where is the site hosted, and who has access to the DNS?",
        "Which integrations must survive the rebuild (analytics, CRM, forms, payments)?",
        "Are there URLs that must be preserved for SEO — or can we redirect freely?",
        "Who will maintain the site after launch, and what's their comfort level with code?",
        "What accessibility level are we designing for — WCAG AA is our default, is that fine?",
        "Is there anything you're not telling me that I'll find out in week three?",
      ]},
      { type: "quote", text: "Every question you skip in discovery becomes a change-request in month two." },
      { type: "h2", text: "How to end the call" },
      { type: "p", text: "Close with a summary. Read back the three things you heard most clearly — the goal, the deadline, and the biggest risk. If they nod along, you've had a great discovery call. If they correct you, you've just avoided a very expensive miscommunication." },
      { type: "p", text: "That question at the end — 'Is there anything you're not telling me that I'll find out in week three?' — has saved us more headaches than any process document. People almost always laugh, and then they tell you the thing." },
    ],
  },
  {
    slug: "framer-vs-wix-quick-comparison",
    title: "Framer vs Wix: which one should you actually recommend for a small business?",
    excerpt:
      "Two very different tools, two very different clients. A quick, practical framework for knowing which one to recommend in your next sales call — without wasting the client's time.",
    category: "Framer",
    tags: ["Framer", "Wix", "Comparison"],
    author: { name: "Sara Lindqvist", role: "Freelance designer", avatar: av(38) },
    date: "2026-06-22",
    readMinutes: 7,
    cover: framerVsWixCover,
    body: [
      { type: "p", text: "Wix and Framer solve the same surface problem — 'my business needs a website' — but they solve it for completely different people. Recommend the wrong one and you'll spend the next six months explaining why the client can't do the thing they thought they could do." },
      { type: "p", text: "This is the framework we use to decide in less than a minute on a sales call. The goal isn't to pick your favorite tool. It's to pick the one that will make the client's life easier long after you're gone." },
      { type: "h2", text: "Recommend Wix when" },
      { type: "list", items: [
        "The client has zero design vocabulary and gets nervous around 'components' or 'breakpoints'.",
        "The site will rarely change after launch — a handful of updates per year.",
        "The total budget (build + first year) is under $1,500.",
        "The client wants everything in one place — hosting, domain, email, invoices.",
      ]},
      { type: "h2", text: "Recommend Framer when" },
      { type: "list", items: [
        "Brand polish and modern motion actually matter to their audience.",
        "The client (or their team) wants to keep iterating on the site every month.",
        "You'll be the one maintaining it — Framer's editor is much faster for designers.",
        "The site needs to feel like software, not like a template.",
      ]},
      { type: "h2", text: "The honest middle" },
      { type: "p", text: "There's a big grey area where either tool would work. In that grey area, pick the one the client's team will actually open. If they're going to hand it back to you every time anyway, pick Framer and build it properly. If they want to click 'edit' themselves and change a phone number without calling you, Wix is going to feel much more comfortable." },
      { type: "quote", text: "Wix is the easy hand-off. Framer is the design-led upgrade. Pick based on who edits the site after launch, not on what you'd rather build in." },
      { type: "h2", text: "The one thing to say on the call" },
      { type: "p", text: "When the client asks you which one, don't answer with a feature list — answer with a scenario. 'Imagine it's a Sunday night, you notice a typo on your homepage. Do you want to fix it yourself in five minutes, or do you want to text me?' Their answer is your answer." },
    ],
  },
  {
    slug: "cms-migration-playbook",
    title: "The CMS migration playbook: WordPress, Webflow, Wix and Framer without downtime",
    excerpt:
      "How to plan a CMS switch, preserve every URL and ranking, and ship the new site in a weekend — with a boring, honest rollback plan clients actually trust.",
    category: "WordPress",
    tags: ["Migration", "WordPress", "Webflow", "CMS"],
    author: { name: "Jordan Ali", role: "CMS migration specialist", avatar: av(53) },
    date: "2026-06-21",
    readMinutes: 9,
    cover: cmsMigrationCover,
    body: [
      { type: "p", text: "Most CMS migrations fail on the boring stuff. Not the design. Not the theme. The redirects, the form endpoints, the analytics containers, the staging environment that looks nothing like production. The parts nobody wants to talk about in the kickoff." },
      { type: "p", text: "The good news is the boring stuff is also the predictable stuff. Follow a plan and you can move a real business site — with real traffic — from one platform to another in a single weekend without losing a single visitor." },
      { type: "h2", text: "The week before" },
      { type: "list", items: [
        "Freeze content on the old CMS a full week before the switch — new posts on the new platform only.",
        "Export every URL from the old site and map each one to a new URL (301s, not 302s).",
        "Rebuild every form on the new CMS and test submissions end-to-end on staging.",
        "Copy over analytics, tag manager, and any pixel containers — don't rebuild them from memory.",
        "Take a full backup of the old site and store it somewhere neither platform controls.",
      ]},
      { type: "h2", text: "The day of the switch" },
      { type: "list", items: [
        "Move DNS on a low-traffic day and hour — Sunday morning is a classic for a reason.",
        "Lower TTL a few days beforehand so DNS changes propagate faster.",
        "Watch analytics live for the first hour and check top 20 landing pages by hand.",
        "Test forms, checkouts, and any third-party integrations from a fresh incognito window.",
      ]},
      { type: "h2", text: "The week after" },
      { type: "list", items: [
        "Keep the old CMS live but unindexed for thirty days as a rollback safety net.",
        "Submit the new sitemap to Google Search Console and monitor crawl errors daily.",
        "Watch for 404 spikes — every one of them is a redirect you missed.",
      ]},
      { type: "quote", text: "A boring migration is a successful migration. Make yours as boring as possible." },
      { type: "h2", text: "How to talk about it with the client" },
      { type: "p", text: "Clients get nervous when they hear the word 'migration' because they've usually been burned before. Walk them through the plan in plain language, show them the rollback option, and give them a written 'if this goes wrong, here's what happens' paragraph. That single paragraph is what closes the project — not the design mockups." },
      { type: "p", text: "The best migration reviews we've ever gotten used the same phrase: 'I didn't notice anything.' That's the goal. If nobody noticed, you did it right." },
    ],
  },
  {
    slug: "freelancer-to-agency-jump",
    title: "From freelancer to small agency: what actually changes in year one",
    excerpt:
      "Going from solo to a three-person studio is mostly an operations story, not a sales story. Here's what to expect — and how to survive the month you have too many clients.",
    category: "Lead generation",
    tags: ["Agency", "Operations", "Hiring"],
    author: { name: "Noah Whitman", role: "Agency founder", avatar: av(60) },
    date: "2026-06-20",
    readMinutes: 9,
    cover: freelancerToAgencyCover,
    body: [
      { type: "p", text: "The hardest part of turning a freelance business into a small agency isn't finding clients. It's surviving the month you have too many — the month everything you were doing yourself suddenly has to be done by someone else, and the systems you never bothered to write down have to exist overnight." },
      { type: "p", text: "This is what actually changes in the first year, based on the mistakes we've watched dozens of freelancers make. None of these are dealbreakers. But knowing them in advance saves you three or four painful months." },
      { type: "h2", text: "What changes about the work" },
      { type: "list", items: [
        "You stop being the best person on every project. That feels weird for a while — and it's the right thing.",
        "You start reviewing work instead of doing it, and reviews take longer than you expect.",
        "You have to write things down. Loom videos, Notion docs, checklists. If it's only in your head, it doesn't exist.",
      ]},
      { type: "h2", text: "What changes about the money" },
      { type: "list", items: [
        "Cash flow gets worse before it gets better. You now pay other people before clients pay you.",
        "You need a real bookkeeper by month six. Not an accountant — a bookkeeper, weekly, forever.",
        "Your pricing has to change. What worked as a solo rate doesn't cover a team.",
      ]},
      { type: "h2", text: "What changes about hiring" },
      { type: "list", items: [
        "Hiring is the single biggest skill to learn — and you'll get it wrong at least once.",
        "Hire contractors before full-time employees. Give it three real projects before you commit.",
        "Fire faster than you want to. The wrong hire costs more than the empty seat.",
      ]},
      { type: "h2", text: "What changes about the tools" },
      { type: "p", text: "You outgrow the spreadsheet. You need a real CRM, a real project tracker, and a real place clients can see what's happening. It doesn't have to be fancy — it just has to exist. The month you finally set this up is the month the business starts feeling like a business instead of a very busy freelancer." },
      { type: "quote", text: "In year one, you're not building an agency. You're building the operating system that will let an agency exist." },
      { type: "h2", text: "The one thing to protect" },
      { type: "p", text: "Protect the reason you started. The thing you loved about freelance — the craft, the client relationships, the quiet mornings — will get squeezed by everything else if you don't defend it on purpose. Put it on the calendar. Say no to work that threatens it. It's not a nice-to-have. It's the reason the agency has any chance of being better than the freelance life you left." },
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
