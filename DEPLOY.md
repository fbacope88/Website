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

Set `VITE_SITE_URL` in the environment before `pnpm build` or `docker build`. It is inlined by Vite and does not change on an already built frontend if you only set it at process start. If it is missing at build time, Vite leaves the literal `%VITE_SITE_URL%` token in `artifacts/creative-web-studio/index.html` (the JSON-LD block). The page still renders; set the variable for a production build.

## Vercel

A preview deployment serves the Vite build from the CDN and runs the Express app as one Node function. The build writes `artifacts/api-server/dist/vercel.mjs` (the app, without `listen`). `api/index.mjs` is the only function. `/api/*` and `/blog` are rewritten to it. The wrapper keeps the browser path, so Express still renders the markdown blog and the API routes. Everything else is a static file, with a rewrite to `index.html` for client-side routes that were not prerendered.

`vercel.json` already sets the install command, build command, and output directory. Match these in the project settings if the dashboard and the file ever disagree (the file wins on deploy):

| Setting | Value |
| --- | --- |
| Root Directory | Repository root (`.`). Do not set this to `artifacts/creative-web-studio` or `artifacts/api-server`. The function, the markdown, and the Vite app are in different folders. |
| Framework Preset | Other |
| Install Command | `pnpm install --frozen-lockfile` |
| Build Command | `pnpm --filter @workspace/creative-web-studio run build && pnpm --filter @workspace/api-server run build:vercel` |
| Output Directory | `artifacts/creative-web-studio/dist/public` |
| Node.js Version | 22.x |

Leave `NODE_ENV` unset in the project environment. Vercel sets it for the build. Forcing `NODE_ENV=production` on install skips the devDependencies the Vite build needs.

The preview renders with no secrets. Checkout returns 503 until `STRIPE_SECRET_KEY1` is set. Contact still returns success; email and Make are skipped when their variables are empty.

Set these in Project Settings → Environment Variables for Preview (and Production when you promote it). All of them are optional for the pages to load.

| Variable | Needed at | Notes |
| --- | --- | --- |
| `VITE_SITE_URL` | Build | Inlined into canonical and Open Graph tags. Use the public site origin. If it is missing, `%VITE_SITE_URL%` is left in `index.html`. |
| `SITE_URL` | Runtime | Stripe return URLs and blog canonicals. Falls back to `VITE_SITE_URL`, then `http://localhost:$PORT`. |
| `STRIPE_SECRET_KEY1` | Runtime | Optional. Unset means `POST /api/checkout` returns 503. |
| `EMAIL_USER` | Runtime | Optional. Contact form email. |
| `EMAIL_PASS` | Runtime | Optional. Gmail app password. |
| `MAKE_WEBHOOK_URL` | Runtime | Optional. Contact-form Make webhook. |
| `MAKE_WEBHOOK_PAYMENT_URL` | Runtime | Optional. Checkout Make webhook. |

`PORT` is not used on Vercel. The Docker image still requires it.

Blog markdown is included with the function via `functions.includeFiles` (`artifacts/api-server/blog-posts/**`). Do not move those files without updating `vercel.json`.

Check the build locally (this does not deploy):

```bash
pnpm dlx vercel build
```
