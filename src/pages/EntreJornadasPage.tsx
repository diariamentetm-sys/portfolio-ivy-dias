import { Link } from "react-router-dom";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
import { SeoHead } from "../components/seo/SeoHead";
import { PostItTag } from "../components/ui/PostItTag";
import { useContent } from "../content/ContentContext";
import {
  formatBlogDate,
  getBlogPostCopy,
  isBlogPostPublic,
  sortBlogPostsNewestFirst,
} from "../content/blog";
import { useLocale } from "../i18n/LocaleContext";
import { absoluteUrl, SITE_NAME } from "../seo/siteConfig";

export function EntreJornadasPage() {
  const { locale, t } = useLocale();
  const { content } = useContent();
  const copy = t.blog;

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

      <main className="pt-28 md:pt-32">
        <header className="max-w-5xl mx-auto px-5 md:px-16 pb-12 md:pb-16">
          <p className="eyebrow mb-5 text-accent">{copy.eyebrow}</p>
          <h1 className="display-h1 max-w-3xl">{copy.title}</h1>
          <p className="mt-6 max-w-2xl body-lg">{copy.subtitle}</p>
        </header>

        <section className="max-w-5xl mx-auto px-5 md:px-16 pb-20">
          {posts.length === 0 ? (
            <p className="body-md text-neutral-500">{copy.empty}</p>
          ) : (
            <ul className="flex flex-col gap-8 md:gap-10">
              {posts.map((post, index) => {
                const postCopy = getBlogPostCopy(post, locale);
                const dateLabel = formatBlogDate(
                  post.publishedAt || post.createdAt,
                  locale,
                );

                return (
                  <li key={post.id}>
                    <article className="border-b border-neutral-200 pb-8 md:pb-10 last:border-b-0">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <PostItTag index={index}>
                          {dateLabel || copy.undated}
                        </PostItTag>
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-semibold uppercase tracking-wide text-neutral-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="section-h2 max-w-3xl">
                        <Link
                          to={`/entre-jornadas/${post.slug}`}
                          className="hover:text-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                          {postCopy.title}
                        </Link>
                      </h2>
                      {postCopy.excerpt ? (
                        <p className="mt-4 max-w-2xl body-md text-neutral-600">
                          {postCopy.excerpt}
                        </p>
                      ) : null}
                      <Link
                        to={`/entre-jornadas/${post.slug}`}
                        className="inline-block mt-5 text-sm font-semibold text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {copy.readMore}
                      </Link>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
