FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm --filter @workspace/creative-web-studio run build

WORKDIR /app/artifacts/api-server

RUN pnpm run build

RUN cp -r ../creative-web-studio/dist/public ./public

EXPOSE 3000

CMD ["node", "dist/index.mjs"]
