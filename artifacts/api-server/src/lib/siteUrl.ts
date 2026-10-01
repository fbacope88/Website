/**
 * Public origin used for Stripe return URLs and blog canonical tags.
 * SITE_URL wins, then VITE_SITE_URL (already used by the frontend build),
 * then a local origin so the server can run without either variable.
 */
export function resolveSiteUrl(): string {
  const configured = (process.env["SITE_URL"] || process.env["VITE_SITE_URL"] || "")
    .trim()
    .replace(/\/+$/, "");
  if (configured) return configured;

  const port = (process.env["PORT"] || "80").trim();
  return `http://localhost:${port}`;
}
