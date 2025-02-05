'use server'

import type { TablesInsert } from '@/types/supabase'
import { createClient } from '@/utils/supabase/server'
type UserInsert = TablesInsert<'users'>
const supabase = createClient()
export const updateProfile = async (
  updateData: Partial<Omit<UserInsert, 'id'>>,
  userId: string,
) => {
  const { data, error } = await supabase
    .from('users')
    .update({
      nickname: updateData.nickname,
      profile_image: updateData.profile_image,
    })
    .eq('id', userId)
    .select()
  if (error) {
    console.log('error', error)
    throw error.message
  }

  return data
}

export const getPlaylists = async (user_id: string) => {
  const { data: playlists, error } = await supabase
    .from('playlists')
    .select(`*, playlist_like(*), playlist_music(* , music(*)) `)
    .eq('user_id', user_id)
  if (error) {
    console.error('error', error)
    throw error.message
  }
  return playlists
}

type Parameter = {
  playlist_id: string
  user_id: string
}

// 토글 쓰게되면
export const toggleLike = async ({ playlist_id, user_id }: Parameter) => {
  const { data: likeCount, error } = await supabase
    .from('playlist_like')
    .select('user_id')
    .eq('playlist_id', playlist_id)
    .eq('user_id', user_id)
    .single()
  if (error) {
    console.error(error.message)
  }
  if (likeCount) {
    const { error: deleteError } = await supabase
      .from('playlist_like')
      .delete()
      .eq('playlist_id', playlist_id)
      .eq('user_id', user_id)
    if (deleteError) {
      console.error(deleteError.message)
    }
    return { status: 'deleting', playlist_id, user_id }
  } else {
    const { error: inError } = await supabase
      .from('playlist_like')
      .insert({ playlist_id, user_id })
    if (inError) {
      console.error(inError.message)
    }
    return { status: 'add', playlist_id, user_id }
  }
}

// 삭제 나중에 파라미터 타입 이거 슈파베이스 뭐 어케해서 바꾸기기
export const deleteLike = async ({ playlist_id, user_id }: Parameter) => {
  const { error } = await supabase
    .from('playlist_like')
    .delete()
    .eq('playlist_id', playlist_id)
    .eq('user_id', user_id)
  if (error) {
    return { succes: false, error: error.message }
  }
  return { succes: true }
}

export const playlistLiked = async ({
  user_id,
  playlist_id,
}: {
  user_id: string
  playlist_id: string
}) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('playlist_like')
    .select('*')
    .eq('user_id', user_id)
    .eq('playlist_id', playlist_id)

  if (error) {
    console.error(error.message)
    return false
  }
  return data.length > 0
}

export const updatePlaylistLike = async ({
  playlist_id,
  user_id,
}: {
  playlist_id: string
  user_id: string
}) => {
  const isLiked = await playlistLiked({ user_id, playlist_id })
  if (isLiked) {
    const { error } = await supabase
      .from('playlist_like')
      .delete()
      .eq('user_id', user_id)
      .eq('playlist_id', playlist_id)
    if (error) throw new Error(error.message)
  } else {
    const { error: insertError } = await supabase
      .from('playlist_like')
      .insert({ playlist_id, user_id })
    if (insertError) throw new Error(insertError.message)
  }
}

export const playlistLikedCount = async ({
  playlist_id,
}: {
  playlist_id: string
}) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('playlist_like')
    .select('user_id')
    .eq('playlist_id', playlist_id)

  if (error) throw new Error(error.message)
  return data
}

export async function fetchLatestAlbumCover(
  playlistId: string,
): Promise<string | null> {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('playlist_music')
      .select(
        `
        music:music_id(
          album_cover
        )
      `,
      )
      .eq('playlist_id', playlistId)
      .order('created_at', { ascending: false })
      .limit(1)

    if (error) throw error

    return data?.[0]?.music?.album_cover || null
  } catch (error) {
    console.error('앨범 커버 가져오기 오류:', error)
    return null
  }
}

export async function getUser() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    console.warn('Supabase 세션이 존재하지 않음. 로그인 필요.')
    return null
  }

  return data.user
}

export async function fetchPlaylists(pageParam = 0, limit = 10) {
  const user = await getUser()

  if (!user?.id) {
    return { data: [], totalCount: 0 }
  }

  const supabase = createClient()
  try {
    const { data, error, count } = await supabase
      .from('playlists')
      .select(`*, playlist_like(user_id)`, { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(pageParam * limit, (pageParam + 1) * limit - 1)

    if (error) throw error

    return { data: data || [], totalCount: count || 0 }
  } catch (error) {
    console.error('플레이리스트 가져오기 오류:', error)
    throw new Error('플레이리스트 데이터를 가져오는 중 문제가 발생했습니다.')
  }
}

export async function fetchPlaylistsWithCovers({
  pageParam = 0,
}: {
  pageParam: number
}) {
  const limit = 10
  const { data: playlists, totalCount } = await fetchPlaylists(pageParam, limit)

  if (!playlists || playlists.length === 0) {
    return {
      data: [],
      nextCursor: undefined,
      prevCursor: undefined,
    }
  }

  const playlistsWithCovers = await Promise.all(
    playlists.map(async (playlist) => {
      const latestSongCover = await fetchLatestAlbumCover(playlist.id)
      return {
        ...playlist,
        latest_song_cover: latestSongCover || '/default-cover.jpg',
      }
    }),
  )

  const nextCursor =
    (pageParam + 1) * limit < totalCount ? pageParam + 1 : undefined
  const prevCursor = pageParam > 0 ? pageParam - 1 : undefined

  return { data: playlistsWithCovers, nextCursor, prevCursor }
}
