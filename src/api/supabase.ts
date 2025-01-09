import type { Tables } from '@/types/supabase'
import { createClient } from '@/utils/supabase/server'

const supabase = createClient()

// music 테이블
export const fetchMusicId = async (): Promise<
  Tables<'music'>['spotify_id'][]
> => {
  try {
    const { data: musicId, error } = await supabase
      .from('music')
      .select('spotify_id')

    if (error) {
      console.error('Error fetching music:', error)
      throw error
    }

    return musicId.map((item) => item.spotify_id) || []
  } catch (error) {
    console.error('Unexpected error:', error)
    return []
  }
}
