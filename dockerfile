FROM oven/bun:1-slim AS base

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --production --frozen-lockfile

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "src/index.ts"]