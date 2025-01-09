import { createClient } from '@/utils/supabase/server'

const supabase = createClient()

// music 테이블
export const fetchMusicId = async (): Promise<string[]> => {
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
