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

# Copy package.json and node_modules for fallback (if standalone doesn't have them)
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules /tmp/builder_node_modules
RUN if [ ! -d "/app/node_modules" ] || [ ! "$(ls -A /app/node_modules 2>/dev/null)" ]; then \
      echo "Copying node_modules from builder..." && \
      cp -r /app/.next/standalone/node_modules ./node_modules 2>/dev/null || \
      cp -r /tmp/builder_node_modules ./node_modules 2>/dev/null || true; \
    fi

# Set the correct permission
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Create startup script
RUN printf '#!/bin/sh\n\
set -e\n\
if [ -f "server.js" ]; then\n\
  echo "Starting with standalone server..."\n\
  exec node server.js\n\
elif [ -f ".next/standalone/server.js" ]; then\n\
  echo "Starting with standalone build..."\n\
  exec node .next/standalone/server.js\n\
else\n\
  echo "Starting with npm start..."\n\
  exec npm start\n\
fi\n' > /app/start.sh && chmod +x /app/start.sh

# Use exec form to properly handle signals
CMD ["/app/start.sh"]

