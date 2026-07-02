import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { BLOG_POSTS, getPostBySlug, getRelatedPosts, type BlogPost } from "@/lib/blog-data";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { FinalCTA } from "@/components/final-cta";
import { Container, Mono } from "@/components/blog/primitives";
import { PostCard } from "@/components/blog/post-card";
import { ShareRail } from "@/components/blog/share-rail";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post, related: getRelatedPosts(params.slug, 3) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    const url = `https://friendly-code-place.lovable.app/blog/${post.slug}`;
    return {
      meta: [
        { title: `${post.title} — Postly Blog` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:image", content: post.cover },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.excerpt },
        { name: "twitter:image", content: post.cover },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-3 md:px-6 py-32 text-center">
        <p className="font-mono text-[11px] uppercase tracking-tight text-muted-foreground">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Post not found</h1>
        <p className="mt-3 text-muted-foreground">That article doesn't exist or has been moved.</p>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-sm hover:border-[color:var(--signal)]/40">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to blog
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-3 md:px-6 py-32 text-center">
        <p className="font-mono text-[11px] uppercase tracking-tight text-destructive">Error</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Could not load post</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
  component: BlogDetail,
});

function BlogDetail() {
  const { post, related } = Route.useLoaderData() as { post: BlogPost; related: BlogPost[] };

  // Highlight last word of title in signal green (matches home/PageShell)
  const titleNode = (() => {
    const parts = post.title.trim().split(/\s+/);
    if (parts.length < 2) return post.title;
    const last = parts.pop();
    return (
      <>
        {parts.join(" ")}{" "}
        <span className="text-[color:var(--signal)]">{last}</span>
      </>
    );
  })();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero — matches PageShell / contact breadcrumb */}
      <section className="relative overflow-hidden section-edge section-dark">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(1_0_0/0.05),transparent_60%)]" />
        </div>
        <Container className="py-14 md:py-20">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> All articles
          </Link>
          <Mono className="mt-6 block text-[color:var(--signal)]">{post.category}</Mono>
          <h1 className="mt-3 max-w-5xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem]">
            {titleNode}
          </h1>
          <p className="mt-4 max-w-4xl text-base text-muted-foreground md:text-lg">{post.excerpt}</p>
        </Container>
      </section>

      {/* Body */}
      <section className="section-edge section-light">
        <Container className="py-14 md:py-20">
          <div className="overflow-hidden rounded-2xl border border-border bg-white">
            <img src={post.cover} alt={post.title} className="aspect-[16/8] w-full object-cover" />
          </div>

          <div className="mt-12 grid gap-12 md:grid-cols-[1fr_220px]">
            <article className="min-w-0">
              {post.body.map((b, i) => {
                if (b.type === "h2") return <h2 key={i} className="mt-10 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{b.text}</h2>;
                if (b.type === "quote") return (
                  <blockquote key={i} className="my-8 border-l-2 border-[color:var(--signal)] pl-5 text-lg italic text-foreground/90">{b.text}</blockquote>
                );
                if (b.type === "list") return (
                  <ul key={i} className="my-5 space-y-2">
                    {b.items?.map((it) => (
                      <li key={it} className="flex gap-3 text-base leading-relaxed text-foreground/90">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-md bg-[color:var(--signal)]" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                );
                return <p key={i} className="my-5 text-base leading-relaxed text-foreground/85 md:text-[17px]">{b.text}</p>;
              })}

              <div className="mt-10 flex flex-wrap gap-1.5 border-t border-border pt-6">
                {post.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border bg-white px-2.5 py-1 text-xs text-muted-foreground">#{t}</span>
                ))}
              </div>
            </article>

            <ShareRail slug={post.slug} title={post.title} excerpt={post.excerpt} />
          </div>
        </Container>
      </section>

      <FinalCTA />

      {related.length > 0 && (
        <section className="section-edge section-light">
          <Container className="py-16 md:py-20">
            <div className="flex items-end justify-between gap-6">
              <div>
                <Mono className="text-muted-foreground">Keep reading</Mono>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  Related <span className="text-[color:var(--signal)]">articles</span>
                </h2>
              </div>
              <Link to="/blog" className="hidden items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground sm:inline-flex">
                Browse all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <PostCard key={p.slug} p={p} />)}
            </div>
          </Container>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}

/* keep BLOG_POSTS import referenced when tree-shaking (no-op) */
void BLOG_POSTS;
