# Development Dockerfile for Next.js with hot reloading
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Create a non-root user with matching host UID/GID for proper volume permissions
RUN addgroup -g 118 -S nodejs
RUN adduser -S -u 1001 -G nodejs nextjs

# Install dependencies first (for better caching)
COPY web/package*.json ./
RUN npm install && npm cache clean --force

# Change ownership
RUN chown -R nextjs:nodejs /app

# Expose the port Next.js runs on
EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=development

# Run as root to handle permission issues at startup, then switch to nextjs user
CMD sh -c 'mkdir -p /app/.next && chown -R nextjs:nodejs /app/.next /app/node_modules 2>/dev/null || true && exec su nextjs -s /bin/sh -c "cd /app && npx next dev --hostname 0.0.0.0"'