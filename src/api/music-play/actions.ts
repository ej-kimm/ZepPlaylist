'use server'
import type { Tables } from '@/types/supabase'
import { createClient } from '@/utils/supabase/server'

// music 테이블
export const insertMusicLyrics = async ({
  spotifyId,
  lyrics,
}: {
  spotifyId: Tables<'music'>['spotify_id']
  lyrics: string
}): Promise<void> => {
  const supabase = createClient()
  const { error } = await supabase
    .from('music')
    .update({ lyrics })
    .eq('spotify_id', spotifyId)

  if (error) {
    console.error('Failed to update music lyrics:', error)
    throw new Error('Lyrics 업데이트에 실패했습니다.')
  }
}

export const fetchMusicDetailByMusicId = async (
  musicId: Tables<'music'>['spotify_id'],
): Promise<Tables<'music'>> => {
  const supabase = createClient()
  const { data: musicDetail, error } = await supabase
    .from('music')
    .select('*')
    .eq('spotify_id', musicId)
    .maybeSingle()

  if (error) {
    console.error('Error fetching music:', error)
    throw error
  }

  if (!musicDetail) {
    throw new Error('Music not found')
  }

  return musicDetail
}

export const fetchMusicLyricsByMusicId = async (
  musicId: Tables<'music'>['spotify_id'],
): Promise<Tables<'music'>['lyrics'] | null> => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('music')
    .select('lyrics')
    .eq('spotify_id', musicId)
    .single()

  if (error) {
    console.error(`Failed to fetch lyrics for musicId: ${musicId}`, error)
    return null
  }

  return data?.lyrics || null
}

// song_like 테이블
export const isSongLiked = async ({
  music_id,
  user_id,
}: {
  music_id: Tables<'song_like'>['music_id']
  user_id: Tables<'song_like'>['user_id']
}) => {
  const supabase = createClient()
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
  const supabase = createClient()
  const isLiked = await isSongLiked({ music_id, user_id })

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
