import { useState } from "react";
import { Link } from "react-router-dom";
import { BlogEngagement } from "../components/blog/BlogEngagement";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { SeoHead } from "../components/seo/SeoHead";
import { Reveal } from "../components/ui/Reveal";
import { useContent } from "../content/ContentContext";
import {
  formatBlogDate,
  getBlogPostCopy,
  isBlogPostPublic,
  readLikedPostIds,
  sortBlogPostsNewestFirst,
} from "../content/blog";
import { casePostItStyles } from "../data/portfolio";
import { useLocale } from "../i18n/LocaleContext";
import { absoluteUrl, SITE_NAME } from "../seo/siteConfig";

export function EntreJornadasPage() {
  const { locale, t } = useLocale();
  const { content, toggleBlogLike } = useContent();
  const copy = t.blog;
  const [likedIds, setLikedIds] = useState(() => readLikedPostIds());

  const posts = sortBlogPostsNewestFirst(
    content.blogPosts.filter((post) => isBlogPostPublic(post)),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: copy.title,
    description: copy.seoDescription,
    url: absoluteUrl("/entre-jornadas"),
    inLanguage: locale === "pt" ? "pt-BR" : "en",
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    blogPost: posts.map((post) => {
      const postCopy = getBlogPostCopy(post, locale);
      return {
        "@type": "BlogPosting",
        headline: postCopy.title,
        description: postCopy.excerpt,
        datePublished: post.publishedAt ?? post.createdAt,
        url: absoluteUrl(`/entre-jornadas/${post.slug}`),
      };
    }),
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-950">
      <SeoHead
        title={copy.seoTitle}
        description={copy.seoDescription}
        path="/entre-jornadas"
        type="website"
        locale={locale}
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-20 md:pt-24">
        <section className="section-narrative border-t-0">
          <div className="max-w-7xl mx-auto">
            <Reveal className="flex flex-wrap gap-5 items-end justify-between">
              <div className="max-w-3xl">
                <p className="eyebrow mb-5 text-accent">{copy.eyebrow}</p>
                <h1 className="section-h2">{copy.title}</h1>
                <p className="mt-5 body-md md:text-lg text-neutral-600 max-w-2xl">
                  {copy.subtitle}
                </p>
              </div>
              <p className="eyebrow">
                {String(posts.length).padStart(2, "0")}{" "}
                {locale === "en" ? "articles" : "artigos"}
              </p>
            </Reveal>

            {posts.length === 0 ? (
              <p className="mt-10 body-md text-neutral-500">{copy.empty}</p>
            ) : (
              <div className="mt-10 md:mt-12 grid sm:grid-cols-2 gap-5 md:gap-6">
                {posts.map((post, index) => {
                  const postCopy = getBlogPostCopy(post, locale);
                  const accent =
                    casePostItStyles[index % casePostItStyles.length];
                  const dateLabel = formatBlogDate(
                    post.publishedAt || post.createdAt,
                    locale,
                  );
                  const number = String(index + 1).padStart(2, "0");

                  return (
                    <Reveal key={post.id} delay={index * 60} className="h-full">
                      <Link
                        to={`/entre-jornadas/${post.slug}`}
                        className="group block h-full"
                      >
                        <article className="case-card flex h-full flex-col p-6 md:p-8 group-hover:-translate-y-1">
                          <span
                            aria-hidden
                            className={`case-card-accent ${accent.tone}`}
                          />
                          <div className="flex flex-wrap gap-3 items-center mb-4">
                            <span className="text-4xl md:text-5xl font-extrabold leading-none text-neutral-200">
                              {number}
                            </span>
                            <div className="flex flex-col gap-2 min-w-0">
                              <span
                                className={`post-it post-it-tag w-fit ${accent.tone} ${accent.tagRotate}`}
                              >
                                {dateLabel || copy.undated}
                              </span>
                              {post.tags[0] ? (
                                <p className="text-xs text-neutral-500">
                                  {post.tags.slice(0, 2).join(" · ")}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-950 text-balance">
                            {postCopy.title}
                          </h2>
                          {postCopy.excerpt ? (
                            <p className="mt-3 text-sm leading-relaxed text-neutral-500 text-pretty line-clamp-3 flex-1">
                              {postCopy.excerpt}
                            </p>
                          ) : (
                            <div className="flex-1" />
                          )}
                          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                            <BlogEngagement
                              views={post.views}
                              likes={post.likes}
                              liked={likedIds.has(post.id)}
                              onToggleLike={() => {
                                const nextLiked = toggleBlogLike(post.id);
                                setLikedIds((current) => {
                                  const next = new Set(current);
                                  if (nextLiked) next.add(post.id);
                                  else next.delete(post.id);
                                  return next;
                                });
                              }}
                              viewsLabel={copy.viewsLabel}
                              likeLabel={copy.likeLabel}
                              likedLabel={copy.likedLabel}
                              compact
                            />
                            <span className="inline-flex btn-primary text-sm px-5 py-2.5 w-fit">
                              {copy.readMore}
                            </span>
                          </div>
                        </article>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
