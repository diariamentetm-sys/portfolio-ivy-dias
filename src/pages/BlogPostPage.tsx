import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { BlogBody } from "../components/blog/BlogBody";
import { BlogEngagement } from "../components/blog/BlogEngagement";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { SeoHead } from "../components/seo/SeoHead";
import { PostItTag } from "../components/ui/PostItTag";
import { Reveal } from "../components/ui/Reveal";
import { useContent } from "../content/ContentContext";
import {
  formatBlogDate,
  getBlogPostCopy,
  getRelatedBlogPosts,
  isBlogPostPublic,
  readLikedPostIds,
} from "../content/blog";
import { casePostItStyles } from "../data/portfolio";
import { useLocale } from "../i18n/LocaleContext";
import { absoluteUrl, SITE_NAME } from "../seo/siteConfig";

export function BlogPostPage() {
  const { slug } = useParams();
  const { locale, t } = useLocale();
  const { content, recordBlogView, toggleBlogLike } = useContent();
  const copy = t.blog;

  const post = content.blogPosts.find(
    (item) => item.slug === slug && isBlogPostPublic(item),
  );

  const [liked, setLiked] = useState(false);

  const related = useMemo(() => {
    if (!post) return [];
    return getRelatedBlogPosts(content.blogPosts, post, 2);
  }, [content.blogPosts, post]);

  useEffect(() => {
    if (!post) return;
    recordBlogView(post.id);
    setLiked(readLikedPostIds().has(post.id));
  }, [post?.id, recordBlogView]);

  if (!post) {
    return <Navigate to="/entre-jornadas" replace />;
  }

  const postCopy = getBlogPostCopy(post, locale);
  const dateLabel = formatBlogDate(post.publishedAt || post.createdAt, locale);
  const path = `/entre-jornadas/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: postCopy.title,
    description: postCopy.excerpt || postCopy.title,
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt,
    interactionStatistic: [
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/ReadAction",
        userInteractionCount: post.views,
      },
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/LikeAction",
        userInteractionCount: post.likes,
      },
    ],
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: absoluteUrl(path),
    inLanguage: locale === "pt" ? "pt-BR" : "en",
    keywords: post.tags.join(", "),
    image: post.coverImage ? absoluteUrl(post.coverImage) : undefined,
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-950">
      <SeoHead
        title={`${postCopy.title} | ${copy.eyebrow}`}
        description={postCopy.excerpt || postCopy.title}
        path={path}
        image={post.coverImage || undefined}
        type="article"
        locale={locale}
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-20 md:pt-24">
        <article>
          <header className="section-narrative border-t-0 pb-10 md:pb-12">
            <div className="max-w-7xl mx-auto">
              <Link
                to="/entre-jornadas"
                className="text-sm font-semibold text-neutral-500 hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {copy.back}
              </Link>
              <p className="eyebrow mt-8 mb-5 text-accent">{copy.eyebrow}</p>
              <h1 className="section-h2 max-w-4xl">{postCopy.title}</h1>
              {postCopy.excerpt ? (
                <p className="mt-6 max-w-3xl text-lg md:text-xl leading-relaxed text-neutral-600 text-pretty">
                  {postCopy.excerpt}
                </p>
              ) : null}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {dateLabel ? <PostItTag index={0}>{dateLabel}</PostItTag> : null}
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold uppercase tracking-wide text-neutral-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <BlogEngagement
                  views={post.views}
                  likes={post.likes}
                  liked={liked}
                  onToggleLike={() => setLiked(toggleBlogLike(post.id))}
                  viewsLabel={copy.viewsLabel}
                  likeLabel={copy.likeLabel}
                  likedLabel={copy.likedLabel}
                />
              </div>
            </div>
          </header>

          {post.coverImage ? (
            <div className="max-w-7xl mx-auto px-5 md:px-16 mb-10">
              <img
                src={post.coverImage}
                alt=""
                className="w-full h-auto rounded-xl border border-neutral-200"
                loading="eager"
                decoding="async"
              />
            </div>
          ) : null}

          <div className="section-narrative bg-white pt-10 md:pt-14">
            <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-8">
                <BlogBody body={postCopy.body} />
                <div className="mt-8 pt-8 border-t border-neutral-200">
                  <BlogEngagement
                    views={post.views}
                    likes={post.likes}
                    liked={liked}
                    onToggleLike={() => setLiked(toggleBlogLike(post.id))}
                    viewsLabel={copy.viewsLabel}
                    likeLabel={copy.likeLabel}
                    likedLabel={copy.likedLabel}
                  />
                </div>
              </div>
            </div>
          </div>

          {related.length > 0 ? (
            <section className="section-narrative">
              <div className="max-w-7xl mx-auto">
                <Reveal>
                  <p className="eyebrow mb-5 text-accent">{copy.eyebrow}</p>
                  <h2 className="section-h2">{copy.relatedTitle}</h2>
                </Reveal>
                <div className="mt-10 md:mt-12 grid sm:grid-cols-2 gap-5 md:gap-6">
                  {related.map((item, index) => {
                    const relatedCopy = getBlogPostCopy(item, locale);
                    const accent =
                      casePostItStyles[index % casePostItStyles.length];
                    const relatedDate = formatBlogDate(
                      item.publishedAt || item.createdAt,
                      locale,
                    );

                    return (
                      <Reveal key={item.id} delay={index * 60} className="h-full">
                        <Link
                          to={`/entre-jornadas/${item.slug}`}
                          className="group block h-full"
                        >
                          <article className="case-card flex h-full flex-col p-6 md:p-8 group-hover:-translate-y-1">
                            <span
                              aria-hidden
                              className={`case-card-accent ${accent.tone}`}
                            />
                            <div className="flex flex-wrap gap-3 items-center mb-4">
                              <span
                                className={`post-it post-it-tag w-fit ${accent.tone} ${accent.tagRotate}`}
                              >
                                {relatedDate || copy.undated}
                              </span>
                              {item.tags[0] ? (
                                <p className="text-xs text-neutral-500">
                                  {item.tags.slice(0, 2).join(" · ")}
                                </p>
                              ) : null}
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-950 text-balance">
                              {relatedCopy.title}
                            </h3>
                            {relatedCopy.excerpt ? (
                              <p className="mt-3 text-sm leading-relaxed text-neutral-500 text-pretty line-clamp-3 flex-1">
                                {relatedCopy.excerpt}
                              </p>
                            ) : (
                              <div className="flex-1" />
                            )}
                            <span className="inline-flex mt-6 btn-primary text-sm px-5 py-2.5 w-fit">
                              {copy.readMore}
                            </span>
                          </article>
                        </Link>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </section>
          ) : null}
        </article>
      </main>

      <Footer />
    </div>
  );
}
