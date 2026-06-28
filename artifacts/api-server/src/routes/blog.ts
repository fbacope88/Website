import { Router } from "express";
import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { marked } from "marked";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

const POSTS_DIR = join(__dirname, "../blog-posts");

const SITE_URL = "https://creativewebstudioexperts.replit.app";
const BRAND = "Creative Web Studio Experts";

interface PostMeta {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  keywords: string[];
  author: string;
}

function getAllPosts(): PostMeta[] {
  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = readFileSync(join(POSTS_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        title: data.title as string,
        slug: data.slug as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        keywords: (data.keywords as string[]) || [],
        author: (data.author as string) || BRAND,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function buildHtmlPage({
  title,
  description,
  slug,
  keywords,
  date,
  author,
  image,
  bodyHtml,
  isIndex,
}: {
  title: string;
  description: string;
  slug?: string;
  keywords: string[];
  date?: string;
  author?: string;
  image?: string;
  bodyHtml: string;
  isIndex: boolean;
}): string {
  const canonicalUrl = isIndex ? `${SITE_URL}/blog` : `${SITE_URL}/blog/${slug}`;
  const ogImage = image ? `${SITE_URL}${image}` : `${SITE_URL}/assets/logo.png`;
  const jsonLd = isIndex
    ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        name: `${BRAND} Blog`,
        url: `${SITE_URL}/blog`,
        description: "Web design tips, guides, and industry insights from Creative Web Studio Experts.",
        publisher: { "@type": "Organization", name: BRAND, url: SITE_URL },
      })
    : JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        image: ogImage,
        url: canonicalUrl,
        datePublished: date,
        dateModified: date,
        author: { "@type": "Organization", name: author || BRAND, url: SITE_URL },
        publisher: { "@type": "Organization", name: BRAND, url: SITE_URL },
        keywords: keywords.join(", "),
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
      });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | ${BRAND}</title>
  <meta name="description" content="${description}" />
  <meta name="keywords" content="${keywords.join(", ")}" />
  <meta name="author" content="${author || BRAND}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta property="og:type" content="${isIndex ? "website" : "article"}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:site_name" content="${BRAND}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="675" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${ogImage}" />
  ${date ? `<meta property="article:published_time" content="${date}" />` : ""}
  <script type="application/ld+json">${jsonLd}</script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { --blue: #0066FF; --dark: #1a1a2e; --gray: #6b7280; --light: #f9fafb; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #374151; line-height: 1.75; background: #fff; }
    a { color: var(--blue); text-decoration: none; }
    a:hover { text-decoration: underline; }

    /* Nav */
    .nav { background: var(--dark); padding: 0 1.5rem; position: sticky; top: 0; z-index: 100; }
    .nav-inner { max-width: 800px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; height: 60px; }
    .nav-brand { color: #fff; font-weight: 700; font-size: 1rem; }
    .nav-links { display: flex; gap: 1.5rem; }
    .nav-links a { color: #9ca3af; font-size: 0.9rem; }
    .nav-links a:hover { color: #fff; text-decoration: none; }

    /* Hero band */
    .hero-band { background: var(--dark); padding: 3rem 1.5rem 3.5rem; }
    .hero-band .inner { max-width: 800px; margin: 0 auto; }
    .hero-band .label { color: var(--blue); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.75rem; }
    .hero-band h1 { color: #fff; font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 800; line-height: 1.2; margin-bottom: 1rem; }
    .hero-band .meta { color: #9ca3af; font-size: 0.875rem; }
    .hero-band .excerpt { color: #d1d5db; font-size: 1.05rem; margin-top: 0.75rem; max-width: 640px; }

    /* Article */
    .article-wrap { max-width: 800px; margin: 0 auto; padding: 3rem 1.5rem 5rem; }
    .article-wrap h1 { display: none; }
    .article-wrap h2 { font-size: 1.4rem; font-weight: 700; color: var(--dark); margin: 2.5rem 0 0.75rem; }
    .article-wrap h3 { font-size: 1.15rem; font-weight: 600; color: var(--dark); margin: 1.75rem 0 0.5rem; }
    .article-wrap p { margin-bottom: 1.25rem; }
    .article-wrap ul, .article-wrap ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
    .article-wrap li { margin-bottom: 0.4rem; }
    .article-wrap strong { color: var(--dark); }
    .article-wrap hr { border: none; border-top: 1px solid #e5e7eb; margin: 2rem 0; }
    .article-wrap a { color: var(--blue); font-weight: 500; }
    .article-wrap a:hover { text-decoration: underline; }

    /* Blog index cards */
    .blog-grid { display: grid; gap: 2rem; margin-top: 2rem; }
    .post-card { border: 1px solid #e5e7eb; border-radius: 1rem; padding: 1.75rem; transition: border-color 0.2s, box-shadow 0.2s; }
    .post-card:hover { border-color: var(--blue); box-shadow: 0 4px 20px rgba(0,102,255,0.1); text-decoration: none; }
    .post-card .date { color: var(--gray); font-size: 0.8rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 0.5rem; }
    .post-card h2 { font-size: 1.2rem; font-weight: 700; color: var(--dark); margin-bottom: 0.6rem; }
    .post-card p { color: #6b7280; font-size: 0.95rem; margin-bottom: 1rem; }
    .post-card .read-more { color: var(--blue); font-weight: 600; font-size: 0.9rem; }

    /* Hero image */
    .post-hero { width: 100%; max-width: 800px; margin: 0 auto; display: block; border-radius: 0 0 1rem 1rem; overflow: hidden; }
    .post-hero img { width: 100%; height: auto; display: block; object-fit: cover; }

    /* CTA box */
    .cta-box { background: #EEF4FF; border-radius: 1rem; padding: 2rem; margin-top: 3rem; border: 1px solid #c7d9ff; }
    .cta-box h3 { color: var(--dark); font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; }
    .cta-box p { color: #4b5563; margin-bottom: 1rem; font-size: 0.95rem; }
    .cta-btn { display: inline-block; background: var(--blue); color: #fff !important; font-weight: 700; padding: 0.7rem 1.5rem; border-radius: 0.6rem; font-size: 0.95rem; }
    .cta-btn:hover { background: #0052cc; text-decoration: none; }

    /* Footer */
    .footer { background: var(--dark); color: #6b7280; text-align: center; padding: 1.5rem; font-size: 0.85rem; }
    .footer a { color: #9ca3af; }

    @media (max-width: 640px) {
      .nav-links { gap: 1rem; }
    }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="nav-inner">
      <a class="nav-brand" href="/">${BRAND}</a>
      <div class="nav-links">
        <a href="/blog">Blog</a>
        <a href="/#services">Services</a>
        <a href="/#pricing">Pricing</a>
        <a href="/#contact">Contact</a>
      </div>
    </div>
  </nav>

  <div class="hero-band">
    <div class="inner">
      <div class="label">${isIndex ? "Blog" : "Article"}</div>
      <h1>${title}</h1>
      ${date ? `<div class="meta">Published ${new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} &bull; ${BRAND}</div>` : ""}
      ${!isIndex ? `<div class="excerpt">${description}</div>` : ""}
    </div>
  </div>

  ${!isIndex && image ? `
  <div class="post-hero">
    <img src="${image}" alt="${title} - ${BRAND}" width="1200" height="675" loading="eager" />
  </div>` : ""}

  <div class="article-wrap">
    ${bodyHtml}

    ${!isIndex ? `
    <div class="cta-box">
      <h3>Ready to get your business online?</h3>
      <p>Professional websites from just £100 — live in as little as 48–72 hours. No hidden fees, no long contracts.</p>
      <a class="cta-btn" href="/#contact">Get a Free Quote</a>
    </div>
    ` : ""}
  </div>

  <footer class="footer">
    &copy; ${new Date().getFullYear()} ${BRAND}. All rights reserved.
    &bull; <a href="/privacy-policy">Privacy Policy</a>
    &bull; <a href="/terms-of-service">Terms of Service</a>
  </footer>
</body>
</html>`;
}

router.get("/api/blog", (_req, res) => {
  const posts = getAllPosts();
  res.json(posts);
});

router.get("/blog", (_req, res) => {
  const posts = getAllPosts();

  const cardsHtml = posts
    .map(
      (p) => `
    <a class="post-card" href="/blog/${p.slug}" style="display:block;text-decoration:none;">
      <div class="date">${new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
      <h2>${p.title}</h2>
      <p>${p.excerpt}</p>
      <span class="read-more">Read article &rarr;</span>
    </a>`
    )
    .join("\n");

  const bodyHtml = `<div class="blog-grid">${cardsHtml}</div>`;

  const html = buildHtmlPage({
    title: "Web Design Blog — Tips, Guides & Insights",
    description:
      "Expert web design tips, business guides, and digital insights from Creative Web Studio Experts. Learn how to grow your business online.",
    keywords: ["web design blog", "website tips", "small business web design", "digital marketing UK"],
    bodyHtml,
    isIndex: true,
  });

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.send(html);
});

router.get("/blog/:slug", (req, res) => {
  const { slug } = req.params;
  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const file = files.find((f) => {
    const raw = readFileSync(join(POSTS_DIR, f), "utf-8");
    const { data } = matter(raw);
    return data.slug === slug;
  });

  if (!file) {
    res.status(404).send("Post not found");
    return;
  }

  const raw = readFileSync(join(POSTS_DIR, file), "utf-8");
  const { data, content } = matter(raw);
  const bodyHtml = marked(content) as string;

  const html = buildHtmlPage({
    title: data.title as string,
    description: data.excerpt as string,
    slug: data.slug as string,
    keywords: (data.keywords as string[]) || [],
    date: data.date as string,
    author: data.author as string,
    image: data.image as string | undefined,
    bodyHtml,
    isIndex: false,
  });

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.send(html);
});

export default router;
