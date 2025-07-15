# Use the latest Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy package files
COPY web/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY web/ .

# Build the application
RUN npm run build

# Change ownership to nextjs user
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose the port Next.js runs on
EXPOSE 3000

ENV PORT=3000

# Start the application
CMD ["npm", "start"]