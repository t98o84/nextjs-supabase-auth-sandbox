# Next.js Supabase Auth Sandbox

A Next.js application with Docker setup, featuring App Router and Zod validation.

## Technology Stack

- **Docker Compose**: Container orchestration
- **npm**: Package manager
- **Next.js**: React framework with App Router
- **Zod**: TypeScript-first schema validation
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework

All technologies use their latest LTS versions.

## Directory Structure

```
project root
  ├── web/                    # Next.js application
  │   ├── src/
  │   │   ├── app/           # App Router pages
  │   │   └── lib/           # Utility libraries
  │   ├── public/            # Static assets
  │   └── package.json       # Node.js dependencies
  ├── docker/
  │   └── nodejs/
  │       └── Dockerfile     # Docker configuration
  └── compose.yml            # Docker Compose configuration
```

## Getting Started

### Development

1. **Install dependencies:**
   ```bash
   cd web
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production with Docker

1. **Build and run with Docker Compose:**
   ```bash
   docker compose up --build
   ```

2. **Access the application:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Features

- ✅ Next.js 15.x with App Router
- ✅ TypeScript configuration
- ✅ Tailwind CSS for styling
- ✅ Zod schema validation
- ✅ Docker containerization
- ✅ ESLint configuration
- ✅ Production-ready build

## Available Scripts

In the `web` directory:

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Docker Commands

- `docker compose up` - Start services
- `docker compose up --build` - Rebuild and start services
- `docker compose down` - Stop services
- `docker compose logs` - View logs