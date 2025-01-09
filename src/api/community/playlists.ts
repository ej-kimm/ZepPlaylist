'use server'

import type { Database } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export async function getPlaylists() {
  try {
    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .order('created_at', { ascending: false }) // 최신순으로 정렬해주는 기능

    if (error) {
      console.error('Error fetching playlists:', error)
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    console.error('Unexpected error:', error)
    throw new Error('Unexpected error occurred')
  }
}
