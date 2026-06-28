import { build } from "vite";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = process.env.VITE_SITE_URL ?? "";

const routes = [
  {
    path: "/",
    output: "index.html",
    title: "Professional Web Design Agency | Creative Web Studio Experts",
    description:
      "Creative Web Studio Experts — professional web design services for businesses across the UK. Custom website design, SEO-friendly development, and expert web design agency solutions tailored to your brand.",
    robots: "index, follow",
    ogType: "website",
    ogImage: `${SITE_URL}/opengraph.jpg`,
    twitterCard: "summary_large_image",
  },
  {
    path: "/privacy-policy",
    output: "privacy-policy/index.html",
    title: "Privacy Policy | Creative Web Studio Experts",
    description:
      "Read the Creative Web Studio Experts privacy policy to understand how we collect, use, and protect your personal information as a UK-based web design agency.",
    robots: "index, follow",
    ogType: "website",
    ogImage: null,
    twitterCard: "summary",
  },
  {
    path: "/terms-of-service",
    output: "terms-of-service/index.html",
    title: "Terms of Service | Creative Web Studio Experts",
    description:
      "Read the Creative Web Studio Experts terms of service governing your use of our website and professional web design services for UK businesses.",
    robots: "index, follow",
    ogType: "website",
    ogImage: null,
    twitterCard: "summary",
  },
  {
    path: "/payment-success",
    output: "payment-success/index.html",
    title: "Payment Successful | Creative Web Studio Experts",
    description:
      "Your payment was received. Creative Web Studio Experts will be in touch within 24 hours to kick off your web design project.",
    robots: "noindex, nofollow",
    ogType: null,
    ogImage: null,
    twitterCard: null,
  },
  {
    path: "/payment-cancel",
    output: "payment-cancel/index.html",
    title: "Payment Cancelled | Creative Web Studio Experts",
    description:
      "Your payment was cancelled and nothing was charged. Browse our web design packages or contact Creative Web Studio Experts for help choosing the right option.",
    robots: "noindex, nofollow",
    ogType: null,
    ogImage: null,
    twitterCard: null,
  },
];

function esc(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildHeadHtml(route) {
  const url = `${SITE_URL}${route.path}`;
  const parts = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    `<meta name="robots" content="${route.robots}" />`,
    SITE_URL ? `<link rel="canonical" href="${esc(url)}" />` : null,
    route.ogType ? `<meta property="og:type" content="${route.ogType}" />` : null,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    SITE_URL ? `<meta property="og:url" content="${esc(url)}" />` : null,
    route.ogImage
      ? `<meta property="og:image" content="${esc(route.ogImage)}" />`
      : null,
    route.twitterCard
      ? `<meta name="twitter:card" content="${route.twitterCard}" />`
      : null,
    route.twitterCard
      ? `<meta name="twitter:title" content="${esc(route.title)}" />`
      : null,
    route.twitterCard
      ? `<meta name="twitter:description" content="${esc(route.description)}" />`
      : null,
    route.ogImage
      ? `<meta name="twitter:image" content="${esc(route.ogImage)}" />`
      : null,
  ]
    .filter(Boolean)
    .join("\n    ");
  return parts;
}

process.env.PORT = process.env.PORT || "3000";
process.env.BASE_PATH = "/";
process.env.NODE_ENV = "production";

console.log("Building SSR bundle...");
await build({
  configFile: join(__dirname, "vite.config.ts"),
  build: {
    ssr: "src/entry-server.tsx",
    outDir: join(__dirname, "dist/server"),
    emptyOutDir: true,
  },
  logLevel: "warn",
});

const { render } = await import(join(__dirname, "dist/server/entry-server.js"));

const templatePath = join(__dirname, "dist/public/index.html");
const template = readFileSync(templatePath, "utf-8");

for (const route of routes) {
  const headHtml = buildHeadHtml(route);

  let appHtml = "";
  try {
    const result = render(route.path);
    appHtml = result.html;
  } catch (err) {
    console.error(`SSR render failed for ${route.path}:`, err.message);
  }

  const html = template
    .replace("<!--app-head-->", headHtml)
    .replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

  const outFile = join(__dirname, "dist/public", route.output);
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);
  console.log(`Prerendered: ${route.path} → dist/public/${route.output}`);
}

console.log("Prerendering complete.");
