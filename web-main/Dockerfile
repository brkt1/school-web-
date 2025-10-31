# Next.js Frontend Dockerfile
FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build CKEditor5 and RichTextEditor first (ignore errors if they don't exist)
RUN npm run build:ckeditor5 || echo "CKEditor5 build skipped" && \
    npm run build:rich-text-editor || echo "RichTextEditor build skipped"

# Build Next.js
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public files
COPY --from=builder /app/public ./public

# Copy standalone build if available, otherwise use regular build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy node_modules if standalone build exists
RUN if [ -d "/app/.next/standalone" ]; then \
      cp -r /app/.next/standalone/node_modules ./node_modules 2>/dev/null || true; \
    fi

# Set the correct permission
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start command - try standalone first, fallback to npm start
CMD if [ -f "server.js" ]; then \
      echo "Starting with standalone server..." && \
      node server.js; \
    elif [ -f ".next/standalone/server.js" ]; then \
      echo "Starting with standalone build..." && \
      node .next/standalone/server.js; \
    else \
      echo "Starting with npm start..." && \
      npm start; \
    fi

