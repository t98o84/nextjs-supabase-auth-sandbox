'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signInWithGoogle() {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_WEB_URL}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    console.error('OAuth error:', error)
    throw new Error(`OAuth error: ${error.message}`)
  }

  if (data.url) {
    // Convert host.docker.internal to localhost for browser access
    const browserUrl = data.url.replace(process.env.SUPABASE_INTERNAL_API_URL!, process.env.NEXT_PUBLIC_SUPABASE_API_URL!)
    redirect(browserUrl)
  }
}

export async function signOut() {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Sign out error:', error)
    throw new Error(`Sign out error: ${error.message}`)
  }
  
  redirect('/')
}
