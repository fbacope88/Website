import app from "../artifacts/api-server/dist/vercel.mjs";

// Single function for /api and for /blog (rewritten here).
// Vercel keeps the browser path on a normal function. If it passes the
// rewrite destination (/api?__path=...) instead, put the browser path back
// so Express still matches /blog and /api/webhook/make.
export default function handler(req, res) {
  const url = new URL(req.url || "/", "http://localhost");
  const hinted = url.searchParams.get("__path");
  if (hinted && (url.pathname === "/api" || url.pathname === "/api/")) {
    url.searchParams.delete("__path");
    const query = url.searchParams.toString();
    req.url = hinted + (query ? `?${query}` : "");
  }
  return app(req, res);
}
