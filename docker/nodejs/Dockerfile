# Development Dockerfile for Next.js with hot reloading
FROM node:24-slim

# Set working directory
WORKDIR /app

# Install dependencies first (for better caching)
COPY web/package*.json ./
RUN npm install && npm cache clean --force

# Copy web directory contents to /app
COPY web/ .

# Expose the port Next.js runs on
EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=development

# Run as root to handle permission issues at startup, then switch to nextjs user
CMD ["npm", "run", "dev"]