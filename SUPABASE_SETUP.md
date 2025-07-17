# Supabase Environment Setup

This document describes the Supabase configuration for the Next.js application.

## Overview

The project is configured with:
- **Supabase CLI**: Initialized for local development
- **@supabase/supabase-js@2.51.0**: Latest Supabase JavaScript client
- **@supabase/ssr@0.6.1**: Latest Supabase SSR utilities for Next.js App Router

## File Structure

```
supabase/                    # Supabase CLI configuration
├── config.toml             # Local development configuration
├── .gitignore             # Supabase-specific gitignore
└── .temp/                 # Temporary files (gitignored)

web/src/lib/supabase/       # Supabase client utilities
├── client.ts              # Browser-side client
├── server.ts              # Server-side client
└── middleware.ts          # Middleware for auth handling

web/.env.local             # Environment variables (gitignored)
```

## Environment Variables

The following environment variables are configured in `web/.env.local`:

```bash
# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOuOKXrr8kCXo31HvpLdYNqpMPvdAJXNWJW0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZhBYfYdKNX3FVDCXjGx7WBm2Xhbfp3GXSqU
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

## Getting Started

### 1. Start Supabase Local Development

```bash
npx supabase start
```

This will start all Supabase services locally:
- Database: http://127.0.0.1:54322
- API: http://127.0.0.1:54321
- Studio: http://127.0.0.1:54323
- Inbucket (Email testing): http://127.0.0.1:54324

### 2. Start Next.js Development Server

```bash
cd web
npm run dev
```

### 3. Access the Application

Open http://localhost:3000 to see the application with Supabase status.

## Usage Examples

### Browser-side Client

```typescript
import { createClient } from '@/lib/supabase/client'

export default function MyComponent() {
  const supabase = createClient()
  
  // Use supabase client for browser-side operations
}
```

### Server-side Client

```typescript
import { createClient } from '@/lib/supabase/server'

export default async function MyServerComponent() {
  const supabase = await createClient()
  
  // Use supabase client for server-side operations
}
```

## Features Configured

- ✅ Local Supabase development environment
- ✅ Authentication ready (not implemented yet)
- ✅ Database ready
- ✅ Storage ready
- ✅ Edge functions ready
- ✅ Realtime ready
- ✅ Next.js App Router integration
- ✅ TypeScript support

## Next Steps

1. Start implementing authentication features
2. Create database schemas and migrations
3. Add database seed data
4. Implement protected routes
5. Add user management features