# Supabase + Next.js Setup Guide for Docker Environment

This document explains the important considerations and required configurations when running Supabase and Next.js in a Docker environment.

## 📋 Overview

This environment operates with the following configuration:

- **Supabase**: Running with Supabase CLI
- **Next.js**: Running with Docker Compose

## 🔧 Required Configuration

### 1. Environment Variables Configuration

Copy `.env.example` to `.env` and configure the following settings:

```bash
# Supabase Environment Variables
SUPABASE_API_PORT=54321
SUPABASE_API_URL=http://127.0.0.1:${SUPABASE_API_PORT}
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0

# Next.js Environment Variables
WEB_URL=http://localhost:3000
# URL for accessing Supabase API from server-side
SUPABASE_INTERNAL_API_URL=http://host.docker.internal:${SUPABASE_API_PORT}
# URL for accessing Supabase API from client-side
NEXT_PUBLIC_SUPABASE_API_URL=${SUPABASE_API_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}

# Google OAuth Configuration
# Get these from Google Cloud Console: https://console.cloud.google.com/
GOOGLE_OAUTH_CLIENT_ID=your-google-client-id # 🚨 Client ID issued by Google Cloud Console
GOOGLE_OAUTH_CLIENT_SECRET=your-google-client-secret # 🚨 Client secret issued by Google Cloud Console
GOOGLE_OAUTH_CALLBACK_URL=${SUPABASE_API_URL}/auth/v1/callback
```

### 1.1. Google Cloud Console Configuration (OAuth 2.0 Credentials)

Important configuration items when creating and setting up OAuth 2.0 Client ID in Google Cloud Console:

#### 📍 Authorized JavaScript Origins

Configure the following URLs:

```
http://localhost:3000
```

**Configuration Reason:**

- `http://localhost:3000`: Next.js application URL

#### 📍 Authorized Redirect URIs

Configure the following URLs:

```
http://127.0.0.1:54321/auth/v1/callback
```

**Configuration Reason:**

- Supabase OAuth callback endpoint

### 2. Supabase Configuration (`supabase/config.toml`)

#### Authentication Settings

```toml
[auth]
enabled = true
# 🚨 Important: Set your Next.js app URL
site_url = "env(WEB_URL)"
# 🚨 Important: Allowed redirect URL patterns
additional_redirect_urls = ["env(WEB_URL)/**"]
jwt_expiry = 3600
enable_refresh_token_rotation = true
refresh_token_reuse_interval = 10
enable_signup = true

# Google OAuth Configuration
[auth.external.google]
enabled = true
client_id = "env(GOOGLE_OAUTH_CLIENT_ID)"
secret = "env(GOOGLE_OAUTH_CLIENT_SECRET)"
redirect_uri = "env(GOOGLE_OAUTH_CALLBACK_URL)"
url = ""
# 🚨 Important: Required for local development
skip_nonce_check = true
```

### 2. Docker Compose Configuration Points

#### Important settings in `compose.yml`:

```yaml
services:
  web:
    # ...
    extra_hosts:
      - host.docker.internal:host-gateway # 🚨 Important: Access to host machine
```

## 🌐 Important Network Configuration Points

### URL Configuration Usage

| Purpose     | URL                                 | Description                       |
| ----------- | ----------------------------------- | --------------------------------- |
| Client-side | `http://127.0.0.1:54321`            | From browser to Supabase          |
| Server-side | `http://host.docker.internal:54321` | From Docker container to Supabase |

### Implementation in Configuration Files:

#### Client-side (`src/lib/supabase/client.ts`)

```typescript
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_API_URL!, // http://127.0.0.1:54321
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        name: "auth-token", // 🚨 Important: Must match server-side (default is sb-127-auth-token with the leading IP after sb-)
      },
    }
  );
}
```

#### Server-side (`src/lib/supabase/server.ts`)

```typescript
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.SUPABASE_INTERNAL_API_URL!, // http://host.docker.internal:54321
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        name: "auth-token", // 🚨 Important: Must match client-side (default is sb-host-auth-token with subdomain name after sb-)
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignore when called from Server Component
          }
        },
      },
    }
  );
}
```

## 🔄 Critical URL Conversion for OAuth Flow

### Google OAuth URL Handling in Docker Environment

When implementing Google OAuth in a Docker environment, a critical URL conversion is required in the authentication flow:

```typescript
// src/app/actions/auth.ts
export async function signInWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error("OAuth error:", error);
    throw new Error(`OAuth error: ${error.message}`);
  }

  if (data.url) {
    // 🚨 CRITICAL: Convert host.docker.internal to localhost for browser access
    const browserUrl = data.url.replace(
      process.env.SUPABASE_INTERNAL_API_URL!, // http://host.docker.internal:54321
      process.env.NEXT_PUBLIC_SUPABASE_API_URL! // http://127.0.0.1:54321
    );
    redirect(browserUrl);
  }
}
```

### Why This Conversion Is Essential

| Stage            | Environment      | URL Used                            | Reason                                        |
| ---------------- | ---------------- | ----------------------------------- | --------------------------------------------- |
| Server Action    | Docker Container | `http://host.docker.internal:54321` | Container needs to access host Supabase       |
| Browser Redirect | User's Browser   | `http://127.0.0.1:54321`            | Browser cannot resolve `host.docker.internal` |

**The Problem:**

- Supabase returns OAuth URLs using the server-side URL (`host.docker.internal`)
- User's browser cannot access `host.docker.internal` URLs
- Direct redirect would result in connection failure

**The Solution:**

- Intercept the OAuth URL from Supabase response
- Replace the server-side URL with client-side URL
- Redirect browser to the converted URL

### URL Conversion Examples

```bash
# Original URL from Supabase (won't work in browser):
http://host.docker.internal:54321/auth/v1/authorize?provider=google&...

# Converted URL for browser (works correctly):
http://127.0.0.1:54321/auth/v1/authorize?provider=google&...
```

This conversion ensures seamless OAuth flow between Docker container and browser environments.

## 🌐 Important Network Configuration Points
