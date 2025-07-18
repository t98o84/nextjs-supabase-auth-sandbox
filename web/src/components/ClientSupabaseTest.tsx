'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ClientSupabaseTest() {
  const [status, setStatus] = useState<string>('Testing...')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    async function testConnection() {
      try {
        const supabase = createClient()
        
        // Test the connection by attempting a simple query
        const { error } = await supabase.from('test').select('*').limit(1)
        
        if (error) {
          // This is expected if the table doesn't exist - indicates connection is working
          if (error.code === 'PGRST116') {
            setStatus('✅ Connected (ready for tables)')
          } else {
            setStatus(`⚠️ Connected with issue: ${error.message}`)
          }
        } else {
          setStatus('✅ Connected')
        }
      } catch (error) {
        setStatus(`❌ Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    testConnection()
  }, [])

  if (!isClient) {
    return <span>Loading...</span>
  }

  return <span>{status}</span>
}