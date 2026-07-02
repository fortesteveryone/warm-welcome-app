import React from "react";
import { SiFacebook, SiInstagram, SiReddit, SiThreads, SiX } from "react-icons/si";
import { FaLinkedin as SiLinkedIn } from "react-icons/fa";
import { Container, SectionTitle, Tag } from "@/components/home/primitives";

type PlatformEntry = {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  name: string;
  state: "live" | "soon";
  note: string;
};

const platforms: PlatformEntry[] = [
  { icon: SiFacebook,  color: "#1877F2", name: "Facebook",  state: "live", note: "Public groups and pages where business owners ask for website help." },
  { icon: SiLinkedIn,  color: "#0A66C2", name: "LinkedIn",  state: "live", note: "Founder posts, agency requests, and public website service recommendations." },
  { icon: SiInstagram, color: "#E4405F", name: "Instagram", state: "soon", note: "Captions and comments from creators and businesses asking for website support." },
  { icon: SiReddit,    color: "#FF4500", name: "Reddit",    state: "live", note: "Niche communities where people discuss website fixes, rebuilds, and CMS help." },
  { icon: SiX,         color: "#0F0F0F", name: "X (Twitter)", state: "soon", note: "Public posts with service requests, RFPs, and website-intent keywords." },
  { icon: SiThreads,   color: "#0F0F0F", name: "Threads",   state: "soon", note: "Conversation-first posts from creators and small businesses asking for support." },
];

const dailyVolumeStats = [
  { value: "365+",       label: "Fresh website-service posts daily" },
  { value: "Website work", label: "Design, development, redesign, rebuild, and landing pages" },
  { value: "CMS work",   label: "WordPress, Webflow, Wix, Framer, Shopify rebuilds, and migrations" },
];

export function Platforms() {
  return (
    <section id="platforms" className="section-edge section-light">
      <Container className="py-16 md:py-20">
        <SectionTitle
          kicker="Platforms"
          title={<>Monitor the places where <span className="text-[color:var(--signal)]">buyers ask for website help.</span></>}
          lede="Postly currently tracks Facebook, LinkedIn, and Reddit, with Instagram, X, and Threads planned for future coverage."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {dailyVolumeStats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-white p-5">
              <div className="text-2xl font-semibold tracking-[-0.02em] text-foreground">{s.value}</div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 mb-2">
          <span className="inline-flex items-start gap-2 text-xs font-medium text-[color:var(--signal)]">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--signal)]" />
            Daily volume can vary by platform, country, and source activity.
          </span>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.name} className="group rounded-xl border border-border bg-white p-5 transition hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-lg"
                    style={{ color: p.color }}
                  >
                    <Icon className="h-9 w-9" />
                  </div>
                  {p.state === "live" ? <Tag tone="signal">● Live</Tag> : <Tag>○ Soon</Tag>}
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.note}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
