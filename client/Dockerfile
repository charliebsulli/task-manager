# similar to server Dockerfile, build this image from home directory to access shared types

FROM node:18-alpine AS base

# install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app/client
COPY client/package*.json .
RUN npm ci

FROM base AS builder

ARG NEXT_PUBLIC_API_URL

WORKDIR /app
COPY shared ./shared

WORKDIR /app/client
COPY --from=deps /app/client/node_modules ./node_modules
COPY client .
RUN npm run build

FROM base AS runner
WORKDIR /app/client
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/client/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/client/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/client/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]