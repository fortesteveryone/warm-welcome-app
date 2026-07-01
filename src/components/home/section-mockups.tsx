import React from "react";
import feedImg from "@/assets/dashboard-feed.jpg";
import filtersImg from "@/assets/dashboard-filters.jpg";
import scoreImg from "@/assets/dashboard-score.jpg";
import outreachImg from "@/assets/dashboard-outreach.jpg";
import sourcesImg from "@/assets/dashboard-sources.jpg";

function Shot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5)]">
      <img
        src={src}
        alt={alt}
        width={1280}
        height={896}
        loading="lazy"
        className="block h-auto w-full"
      />
    </div>
  );
}

export function MockFilters()  { return <Shot src={filtersImg}  alt="Dashboard filters screenshot" />; }
export function MockFeed()     { return <Shot src={feedImg}     alt="Dashboard opportunity feed screenshot" />; }
export function MockScore()    { return <Shot src={scoreImg}    alt="Dashboard lead score screenshot" />; }
export function MockOutreach() { return <Shot src={outreachImg} alt="Dashboard outreach draft screenshot" />; }
export function MockSources()  { return <Shot src={sourcesImg}  alt="Dashboard sources monitored screenshot" />; }
