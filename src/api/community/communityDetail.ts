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
        play_time,
        album_name
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
    .select(
      `
      id,
      created_at,
      content,
      user_id,
      users:user_id (
        profile_image,
        nickname
      )
    `,
    )
    .eq('playlist_id', playlistId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching comments:', error.message)
    throw new Error('댓글 데이터를 가져오는 데 실패했습니다.')
  }

  const commentsWithUserInfo = data.map((comment) => ({
    ...comment,
    profile_image: comment.users?.profile_image || null,
    nickname: comment.users?.nickname || 'Anonymous',
  }))

  return commentsWithUserInfo
}

export const getCommunityDetail = async (
  playlistId: string,
  cookies: string,
  userId: string,
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
      users(
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

  const isLiked = playlistData.playlist_like.some(
    (like: { user_id: string }) => like.user_id === userId,
  )

  const user = playlistData.users || {
    profile_image: null,
    nickname: 'Anonymous',
  }

  const songs = await getCommunitySongs(playlistId, cookies)
  const comments = await getCommunityComments(playlistId, cookies)

  return {
    songs,
    comments,
    playlistName: playlistData.name,
    description: playlistData.description,
    profileImage: user.profile_image,
    nickname: user.nickname,
    isLiked,
  }
}
