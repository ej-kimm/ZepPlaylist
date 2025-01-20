'use server'

import type { Database } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'

const createServerSupabaseClient = (cookies: string) => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          cookie: cookies,
        },
      },
    },
  )
}

export const getCommunitySongs = async (
  playlistId: string,
  cookies: string,
) => {
  const supabase = createServerSupabaseClient(cookies)

  const { data, error } = await supabase
    .from('playlist_music')
    .select(
      `
      music_id,
      music:music_id (
        spotify_id,
        title,
        artist,
        album_cover,
        play_time
      )
    `,
    )
    .eq('playlist_id', playlistId)

  if (error) {
    console.error('Error fetching songs:', error.message)
    throw new Error('플레이리스트 곡 데이터를 가져오는 데 실패했습니다.')
  }

  return data?.map((item) => item.music) || []
}

export const getCommunityComments = async (
  playlistId: string,
  cookies: string,
) => {
  const supabase = createServerSupabaseClient(cookies)

  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('playlist_id', playlistId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching comments:', error.message)
    throw new Error('댓글 데이터를 가져오는 데 실패했습니다.')
  }

  return data || []
}

export const getCommunityDetail = async (
  playlistId: string,
  cookies: string,
) => {
  const supabase = createServerSupabaseClient(cookies)

  const { data: playlistData, error: playlistError } = await supabase
    .from('playlists')
    .select(
      `
      name,
      description,
      playlist_like (
        user_id
      ),
      users:user_id (
        profile_image,
        nickname
      )
    `,
    )
    .eq('id', playlistId)
    .single()

  if (playlistError) {
    console.error('Error fetching playlist details:', playlistError.message)
    throw new Error('플레이리스트 정보를 가져오는 데 실패했습니다.')
  }

  const likeCount = playlistData.playlist_like.length
  const user = playlistData.users || {
    profile_image: null,
    nickname: 'Anonymous',
  }

  const songs = await getCommunitySongs(playlistId, cookies)
  const comments = await getCommunityComments(playlistId, cookies)

  return {
    songs,
    songCount: songs.length,
    comments,
    playlistName: playlistData.name,
    description: playlistData.description,
    likeCount,
    profileImage: user.profile_image,
    nickname: user.nickname,
  }
}
