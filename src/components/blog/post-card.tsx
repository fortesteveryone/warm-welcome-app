import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";

export function PostCard({ p }: { p: BlogPost }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: p.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition hover:-translate-y-0.5 hover:border-[color:var(--signal)]/40 hover:shadow-[0_20px_60px_-30px_oklch(0.72_0.19_145/0.35)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={p.cover} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 font-mono text-[10px] uppercase tracking-tight text-foreground shadow-sm backdrop-blur">
          {p.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-foreground md:text-base">{p.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <div className="flex flex-wrap gap-1.5">
            {p.tags.slice(0, 2).map((t) => (
              <span key={t} className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] text-muted-foreground">#{t}</span>
            ))}
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-[color:var(--signal)]" />
        </div>
      </div>
    </Link>
  );
}
