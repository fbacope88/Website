# Deploying off Replit

The site is one Node process. The Vite app is built to static files, the Express server in `artifacts/api-server` is bundled to `dist/index.mjs`, and that process serves the static site plus `/api` and `/blog`.

## Build

From the repository root:

```bash
pnpm install
pnpm build
```

`pnpm build` typechecks, builds the frontend, builds the mockup sandbox, then builds the API server. The API build replaces `artifacts/api-server/public` with `artifacts/creative-web-studio/dist/public` (a plain `cp` into an existing `public` directory nests a second `public/` folder, so the script removes it first).

Run the server:

```bash
PORT=3000 node artifacts/api-server/dist/index.mjs
```

`PORT` is required. Without it the process exits at startup.

## Docker

The root `Dockerfile` installs dependencies, builds the frontend, builds the API server, and runs `node dist/index.mjs` with `PORT=3000`.

```bash
docker build -t creative-web-studio .
docker run --rm -p 3000:3000 \
  -e SITE_URL=https://example.com \
  -e VITE_SITE_URL=https://example.com \
  creative-web-studio
```

`VITE_SITE_URL` is read when the frontend is built, so pass it as a build arg if canonical and Open Graph URLs should be baked into the static pages. The same value is left in the image environment, so the server uses it when `SITE_URL` is not set:

```bash
docker build --build-arg VITE_SITE_URL=https://example.com -t creative-web-studio .
```

The image targets `linux/amd64` Debian. Do not switch the base image to Alpine: the workspace pins away musl builds of esbuild, Rollup, and Tailwind's native packages.

## Environment variables

| Variable | When | What it does |
| --- | --- | --- |
| `SITE_URL` | Runtime | Public origin for Stripe success/cancel URLs and blog canonical tags. No trailing slash required. |
| `VITE_SITE_URL` | Frontend build, and runtime if `SITE_URL` is unset | Baked into page canonical and Open Graph tags. Also the server fallback for Stripe and blog URLs. |
| `PORT` | Runtime | Port the Express server listens on. The Docker image sets `3000`. |
| `STRIPE_SECRET_KEY1` | Runtime, optional | Stripe secret key. If it is unset the server still starts. `POST /api/checkout` returns **503** with an error explaining that Stripe is not configured. Contact and Make webhooks do not use Stripe. |
| `EMAIL_USER` | Runtime, optional | Gmail address used to send contact-form mail. If this or `EMAIL_PASS` is unset, the form still returns success and the Make webhook still runs; email is skipped. |
| `EMAIL_PASS` | Runtime, optional | Gmail app password for `EMAIL_USER`. |
| `MAKE_WEBHOOK_URL` | Runtime, optional | Make.com webhook for contact-form submissions. Skipped when unset. |
| `MAKE_WEBHOOK_PAYMENT_URL` | Runtime, optional | Make.com webhook after a Stripe Checkout session is created. Skipped when unset. |

If neither `SITE_URL` nor `VITE_SITE_URL` is set, Stripe return URLs and blog canonicals use `http://localhost:$PORT` (port `80` when `PORT` is unset).

Set `VITE_SITE_URL` in the environment before `pnpm build` or `docker build`. It is inlined by Vite and does not change on an already built frontend if you only set it at process start.

## Vercel

Vercel is not a fit for this app, and the previous `vercel.json` would not have hosted it.

That file set `outputDirectory` to `artifacts/api-server` and only built the API package. Vercel would have treated a Node server package (source, `node_modules` metadata, and a compiled `dist`) as a static site. It would not run `node dist/index.mjs`, and the frontend build was not part of the command, so the copy into `public/` would fail or serve a stale tree.

This app is a long-running Express process that:

- serves the prerendered SPA and client-side routes from disk
- renders `/blog` from markdown files next to the server
- sends contact email and calls Make webhooks in the same process
- creates Stripe Checkout sessions

Putting that on Vercel means a serverless rewrite: export the app instead of calling `listen`, split static files from the function, and pack the blog posts into the function bundle. A `vercel.json` that only points at the Express package would not do that, so it was removed rather than left as a config that looks deployable and is not.

Use the Docker image, or any host that can run `node artifacts/api-server/dist/index.mjs` with `PORT` set (a VM, Fly.io, Render, Railway, and similar).
