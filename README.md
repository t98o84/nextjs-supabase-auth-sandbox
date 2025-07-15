# Next.js Supabase Auth Sandbox

A Next.js application with Docker setup, featuring App Router.

## Technology Stack

- **Docker Compose**: Container orchestration
- **npm**: Package manager
- **Next.js**: React framework with App Router
- **Supabase**: Backend-as-a-Service with authentication and database
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework

All technologies use their latest LTS versions.

## Directory Structure

```
project_root
  ├── web/                    # Next.js application
  ├── supabase/              # Supabase configuration
  │   └── config.toml        # Local development settings
  ├── docker/
  │   └── nodejs/
  │       └── Dockerfile     # Docker configuration
  ├── compose.yml            # Docker Compose configuration
  ├── .env                   # Environment variables (local)
  ├── .env.example           # Environment variables template
  └── GOOGLE_OAUTH.md        # Google OAuth setup guide
```

## Getting Started

### Prerequisites

Before starting, make sure you have the following installed:
- **Docker** and **Docker Compose**
- **Node.js** (for Supabase CLI)

### Setup

1. **Copy environment variables:**
   ```bash
   cp .env.example .env
   ```

2. **Google OAuth Setup:**  
   Get your Google OAuth credentials from [Google Cloud Console](https://console.cloud.google.com/) and set them in your `.env` file:
   ```text
   GOOGLE_OAUTH_CLIENT_ID=your-google-client-id
   GOOGLE_OAUTH_CLIENT_SECRET=your-google-client-secret
   ```
   
   For detailed setup instructions and important notes, see [GOOGLE_OAUTH.md](./GOOGLE_OAUTH.md).

### Start Supabase (Required)

Start the local Supabase stack for authentication and database functionality:

```bash
npx supabase start
```

This provides:

- Local PostgreSQL database
- Authentication service
- Storage service
- Dashboard UI at http://127.0.0.1:54323

### Start Next.js Application

1. **Start the development server:**

   ```bash
   docker compose up web --build
   ```

2. **Access the application:**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

The development server runs inside a Docker container with hot reloading enabled. Any changes to your code will automatically reload the application.

