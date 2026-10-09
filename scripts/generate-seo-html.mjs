import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  LOCALES,
  SITE_ORIGIN,
  publicPages,
} from "./seo-pages.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "..", "dist");

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceTagContent(html, pattern, replacement) {
  return html.replace(pattern, replacement);
}

function localizePath(locale, barePath) {
  if (barePath === "/") return `/${locale}`;
  return `/${locale}${barePath}`;
}

function applyPageMeta(html, page) {
  const url = `${SITE_ORIGIN}${page.path}`;
  const image = page.image.startsWith("http")
    ? page.image
    : `${SITE_ORIGIN}${page.image.startsWith("/") ? page.image : `/${page.image}`}`;
  const robots = page.robots ?? "index, follow";
  const type = page.type ?? "website";

  let next = html;
  next = replaceTagContent(
    next,
    /<html\s+lang="[^"]*"/i,
    `<html lang="${page.lang}"`,
  );
  next = replaceTagContent(
    next,
    /<title>[^<]*<\/title>/i,
    `<title>${page.title}</title>`,
  );
  next = replaceTagContent(
    next,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${page.description}" />`,
  );
  next = replaceTagContent(
    next,
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="robots" content="${robots}" />`,
  );
  next = replaceTagContent(
    next,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${url}" />`,
  );
  next = replaceTagContent(
    next,
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="${type}" />`,
  );
  next = replaceTagContent(
    next,
    /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:locale" content="${page.locale === "pt" ? "pt_BR" : "en_US"}" />`,
  );
  next = replaceTagContent(
    next,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${url}" />`,
  );
  next = replaceTagContent(
    next,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${page.title}" />`,
  );
  next = replaceTagContent(
    next,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${page.description}" />`,
  );
  next = replaceTagContent(
    next,
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${image}" />`,
  );
  next = replaceTagContent(
    next,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${page.title}" />`,
  );
  next = replaceTagContent(
    next,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${page.description}" />`,
  );
  next = replaceTagContent(
    next,
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${image}" />`,
  );

  // Remove previous hreflang alternates, then inject fresh ones after canonical.
  next = next.replace(
    /<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"\s*\/?>\s*/gi,
    "",
  );
  const alternates = [
    ...LOCALES.map((locale) => {
      const hrefLang = locale === "pt" ? "pt-BR" : "en";
      const href = `${SITE_ORIGIN}${localizePath(locale, page.barePath)}`;
      return `<link rel="alternate" hreflang="${hrefLang}" href="${href}" />`;
    }),
    `<link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${localizePath("pt", page.barePath)}" />`,
  ].join("\n    ");
  next = next.replace(
    /(<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>)/i,
    `$1\n    ${alternates}`,
  );

  next = next.replaceAll(
    new RegExp(escapeRegExp("https://ivydc.cx"), "g"),
    SITE_ORIGIN,
  );

  return next;
}

function outputPathFor(pagePath) {
  const segments = pagePath.replace(/^\//, "").split("/");
  return path.join(distDir, ...segments, "index.html");
}

async function main() {
  const template = await readFile(path.join(distDir, "index.html"), "utf8");

  for (const page of publicPages) {
    const html = applyPageMeta(template, page);
    const outFile = outputPathFor(page.path);
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, html, "utf8");
    console.log(`seo-html: ${page.path} -> ${path.relative(distDir, outFile)}`);
  }

  // Keep root index as a soft entry that mirrors PT home meta (Vercel also redirects / → /pt).
  const ptHome = publicPages.find(
    (page) => page.path === "/pt" && page.locale === "pt",
  );
  if (ptHome) {
    await writeFile(
      path.join(distDir, "index.html"),
      applyPageMeta(template, { ...ptHome, path: "/pt" }),
      "utf8",
    );
    console.log("seo-html: / -> index.html (pt home meta)");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
