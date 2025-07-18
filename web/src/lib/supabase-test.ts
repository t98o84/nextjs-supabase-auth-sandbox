// Test file to verify Supabase client configurations
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'

/**
 * This file verifies that both server and client Supabase configurations are working correctly.
 * 
 * Server client: Uses createServerClient from @supabase/ssr with cookies for SSR support
 * Browser client: Uses createBrowserClient from @supabase/ssr for client-side operations
 * 
 * Both clients should be configured with the same environment variables:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

export async function testServerClient() {
  const supabase = await createServerClient()
  return supabase
}

export function testBrowserClient() {
  const supabase = createBrowserClient()
  return supabase
}

// Export types for reuse
export type SupabaseClient = ReturnType<typeof createBrowserClient>
export type SupabaseServerClient = Awaited<ReturnType<typeof createServerClient>>