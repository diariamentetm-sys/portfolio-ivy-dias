import { Link, Navigate, useParams } from "react-router-dom";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { SeoHead } from "../components/seo/SeoHead";
import { PostItTag } from "../components/ui/PostItTag";
import { useContent } from "../content/ContentContext";
import {
  blogBodyParagraphs,
  formatBlogDate,
  getBlogPostCopy,
  isBlogPostPublic,
} from "../content/blog";
import { useLocale } from "../i18n/LocaleContext";
import { absoluteUrl, SITE_NAME } from "../seo/siteConfig";

export function BlogPostPage() {
  const { slug } = useParams();
  const { locale, t } = useLocale();
  const { content } = useContent();
  const copy = t.blog;

  const post = content.blogPosts.find(
    (item) => item.slug === slug && isBlogPostPublic(item),
  );

  if (!post) {
    return <Navigate to="/entre-jornadas" replace />;
  }

  const postCopy = getBlogPostCopy(post, locale);
  const paragraphs = blogBodyParagraphs(postCopy.body);
  const dateLabel = formatBlogDate(post.publishedAt || post.createdAt, locale);
  const path = `/entre-jornadas/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: postCopy.title,
    description: postCopy.excerpt || postCopy.title,
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt,
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
    image: post.coverImage
      ? absoluteUrl(post.coverImage)
      : undefined,
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-950">
      <SeoHead
        title={`${postCopy.title} | Entre Jornadas`}
        description={postCopy.excerpt || postCopy.title}
        path={path}
        image={post.coverImage || undefined}
        type="article"
        locale={locale}
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pt-28 md:pt-32">
        <article>
          <header className="max-w-3xl mx-auto px-5 md:px-16 pb-10">
            <Link
              to="/entre-jornadas"
              className="text-sm font-semibold text-neutral-500 hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {copy.back}
            </Link>
            <p className="eyebrow mt-8 mb-5 text-accent">{copy.eyebrow}</p>
            <h1 className="display-h1">{postCopy.title}</h1>
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
          </header>

          {post.coverImage ? (
            <div className="max-w-4xl mx-auto px-5 md:px-16 mb-10">
              <img
                src={post.coverImage}
                alt=""
                className="w-full h-auto rounded-xl border border-neutral-200"
                loading="eager"
                decoding="async"
              />
            </div>
          ) : null}

          <div className="max-w-3xl mx-auto px-5 md:px-16 pb-20 flex flex-col gap-5">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="body-lg text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
