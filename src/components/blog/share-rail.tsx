import { useEffect, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { toast } from "sonner";
import { Mono } from "@/components/blog/primitives";
import {
  FacebookIcon, LinkedInIcon, RedditIcon, TelegramIcon, WhatsAppIcon, XIcon,
} from "@/components/blog/share-icons";

export function ShareRail({ slug, title, excerpt }: { slug: string; title: string; excerpt: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState(`https://growbylead.com/blog/${slug}`);
  useEffect(() => {
    if (typeof window !== "undefined") setUrl(window.location.href);
  }, [slug]);
  const enc = encodeURIComponent;
  const shareText = `${title} — ${excerpt}`;

  const shareLinks = [
    { name: "X",        Icon: XIcon,        brand: "#000000", href: `https://twitter.com/intent/tweet?text=${enc(shareText)}&url=${enc(url)}` },
    { name: "LinkedIn", Icon: LinkedInIcon, brand: "#0A66C2", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { name: "Facebook", Icon: FacebookIcon, brand: "#1877F2", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { name: "WhatsApp", Icon: WhatsAppIcon, brand: "#25D366", href: `https://api.whatsapp.com/send?text=${enc(shareText + " " + url)}` },
    { name: "Reddit",   Icon: RedditIcon,   brand: "#FF4500", href: `https://reddit.com/submit?url=${enc(url)}&title=${enc(title)}` },
    { name: "Telegram", Icon: TelegramIcon, brand: "#26A5E4", href: `https://t.me/share/url?url=${enc(url)}&text=${enc(shareText)}` },
  ];

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Copy failed — please copy the URL manually");
    }
  };

  return (
    <aside className="md:sticky md:top-20 md:self-start">
      <div className="rounded-2xl border border-border bg-white p-5">
        <Mono className="text-muted-foreground">Share this article</Mono>
        <p className="mt-2 text-sm text-foreground/70">Found this useful? Send it to someone who needs it.</p>

        <div className="mt-4 grid grid-cols-6 gap-1.5 sm:gap-2 md:grid-cols-3">
          {shareLinks.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${s.name}`}
              title={`Share on ${s.name}`}
              style={{ ["--brand" as string]: s.brand, color: s.brand }}
              className="group/share relative flex aspect-square min-w-0 items-center justify-center rounded-xl border border-border bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:text-white hover:shadow-[0_10px_24px_-12px_var(--brand)] hover:bg-[color:var(--brand)]"
            >
              <s.Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </a>
          ))}
        </div>


        <button
          type="button"
          onClick={onCopy}
          className="mt-3 flex w-full items-center gap-2 rounded-xl border border-border bg-[oklch(0.98_0_0)] px-3 py-2.5 text-left text-xs transition hover:border-[color:var(--signal)]/40"
        >
          {copied ? (
            <Check className="h-4 w-4 shrink-0 text-[color:var(--signal)]" />
          ) : (
            <Link2 className="h-4 w-4 shrink-0 text-muted-foreground" />
          )}
          <span className="flex-1 truncate font-mono text-[11px] text-muted-foreground">
            {copied ? "Link copied to clipboard" : url.replace(/^https?:\/\//, "")}
          </span>
          <span className="shrink-0 rounded-md bg-foreground px-2 py-1 text-[10px] font-medium text-background">
            {copied ? "Copied" : "Copy"}
          </span>
        </button>
      </div>
    </aside>
  );
}
