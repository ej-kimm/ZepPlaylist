import type { Tables } from '@/types/supabase'
import { supabase } from '@/utils/supabase/client'

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

export const fetchMusicDetailByMusicId = async (
  musicId: Tables<'music'>['spotify_id'],
) => {
  try {
    const { data: musicDetail, error } = await supabase
      .from('music')
      .select('*')
      .eq('spotify_id', musicId)
      .single()

    if (error) {
      console.error('Error fetching music:', error)
      throw error
    }

    return musicDetail
  } catch (error) {}
}
