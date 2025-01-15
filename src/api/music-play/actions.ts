import type { Tables } from '@/types/supabase'
import { supabase } from '@/utils/supabase/client'

// music 테이블
export const fetchMusicId = async (): Promise<
  Tables<'music'>['spotify_id'][]
> => {
  const { data: musicId, error } = await supabase
    .from('music')
    .select('spotify_id')

  if (error) {
    console.error('Error fetching music:', error)
    throw error
  }

  return musicId.map((item) => item.spotify_id) || []
}

export const fetchMusicDetailByMusicId = async (
  musicId: Tables<'music'>['spotify_id'],
): Promise<Tables<'music'>> => {
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
}

// song_like 테이블
export const fetchSongLike = async ({
  music_id,
  user_id,
}: {
  music_id: Tables<'song_like'>['music_id']
  user_id: Tables<'song_like'>['user_id']
}) => {
  const { data, error } = await supabase
    .from('song_like')
    .select('music_id')
    .eq('user_id', user_id)
    .eq('music_id', music_id)

  if (error) throw new Error(error.message)
  return data.length > 0
}

export const updateSongLike = async ({
  music_id,
  user_id,
}: {
  music_id: Tables<'song_like'>['music_id']
  user_id: Tables<'song_like'>['user_id']
}): Promise<void> => {
  const isLiked = await fetchSongLike({ music_id, user_id })

  // 좋아요가 이미 있으면 삭제
  if (isLiked) {
    const { error: deleteError } = await supabase
      .from('song_like')
      .delete()
      .eq('user_id', user_id)
      .eq('music_id', music_id)

    if (deleteError) throw new Error(deleteError.message)
  } else {
    // 좋아요가 없으면 추가
    const { error: insertError } = await supabase
      .from('song_like')
      .insert({ user_id, music_id })

    if (insertError) throw new Error(insertError.message)
  }
}
