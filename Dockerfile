# Debian (glibc, linux/amd64), not Alpine. pnpm-workspace.yaml drops musl and
# non-x64 native optional dependencies because Replit is linux-x64.
FROM --platform=linux/amd64 node:22-bookworm-slim

WORKDIR /app

RUN npm install -g pnpm@10.33.3

COPY . .

RUN pnpm install --frozen-lockfile

# Inlined into the static pages at build time. Runtime SITE_URL still covers
# Stripe return URLs and blog canonicals if this was left empty.
ARG VITE_SITE_URL=""
ENV VITE_SITE_URL=${VITE_SITE_URL}

# Frontend first so the API build can copy dist/public into its public folder.
RUN pnpm --filter @workspace/creative-web-studio run build
RUN pnpm --filter @workspace/api-server run build

WORKDIR /app/artifacts/api-server

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/index.mjs"]
