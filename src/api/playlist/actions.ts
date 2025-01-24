'use server'

import { PlaylistInsert, PlaylistRow, PlaylistUpdate } from '@/types/playlist'
import { createClient } from '@/utils/supabase/server'

// 유저 정보 가져오기
export async function getUser() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    console.warn('Supabase 세션이 존재하지 않음. 로그인 필요.')
    return null //오류를 던지지않고 널을 반환하면...되나?
  }

  return data.user
}

// 플리 가져오기
export async function fetchPlaylists(): Promise<PlaylistRow[] | null> {
  const user = await getUser()

  if (!user?.id) {
    return null
  }

  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return data || []
  } catch (error) {
    console.error('플레이리스트 가져오기 오류:', error)
    throw new Error('플레이리스트 데이터를 가져오는 중 문제가 발생했습니다.')
  }
}

// 플리에서 음악앨범 커버 이미지 가져오기
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

export async function fetchPlaylistsWithCovers(): Promise<PlaylistRow[]> {
  const playlists = await fetchPlaylists()

  // 각 플레이리스트에 최신 음악 커버 보여주기
  const playlistsWithCovers = await Promise.all(
    playlists!.map(async (playlist) => {
      const latestSongCover = await fetchLatestAlbumCover(playlist.id)
      return {
        ...playlist,
        latest_song_cover: latestSongCover,
      }
    }),
  )

  return playlistsWithCovers
}

// 새 플레이리스트 추가
export async function addPlaylist(
  playlistData: PlaylistInsert,
): Promise<{ success: boolean }> {
  const user = await getUser()

  if (!user?.id) {
    throw new Error('로그인된 사용자 ID가 필요합니다.')
  }

  const supabase = createClient()

  try {
    const { error } = await supabase.from('playlists').insert({
      ...playlistData,
      user_id: user.id,
    })

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('플레이리스트 추가 오류:', error)
    throw new Error('플레이리스트를 추가하는 중 문제가 발생했습니다.')
  }
}

// 플레이리스트 업데이트
export async function updatePlaylist(
  playlistId: string,
  updatedData: PlaylistUpdate,
): Promise<{ success: boolean }> {
  const user = await getUser()
  if (!user?.id) {
    throw new Error('로그인된 사용자 ID가 필요합니다.')
  }

  const supabase = createClient()

  try {
    const { error } = await supabase
      .from('playlists')
      .update(updatedData)
      .eq('id', playlistId)
      .eq('user_id', user.id)
    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('플레이리스트 수정 오류:', error)
    throw new Error('플레이리스트를 수정하는 중 문제가 발생했습니다.')
  }
}

export async function fetchLikedSongs(userId: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('song_like')
      .select(
        `
        music:music_id (
          title,
          album_cover,
          artist
        ),
        created_at
      `,
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return data || []
  } catch (error) {
    console.error('좋아요 리스트 가져오기 오류:', error)
    throw new Error('좋아요 리스트를 가져오는 중 문제가 발생했습니다.')
  }
}

// 최신 좋아요 곡의 커버 이미지 가져오기
export async function fetchLatestLikedSongCover(userId: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('song_like')
      .select(
        `
        music:music_id (
          album_cover
        )
      `,
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)

    if (error) throw error

    return data?.[0]?.music?.album_cover || null
  } catch (error) {
    console.error('최신 좋아요 곡 커버 가져오기 오류:', error)
    return null
  }
}

// 플리 삭제...
export async function deletePlaylist(
  playlistId: string,
): Promise<{ success: boolean }> {
  const user = await getUser()

  if (!user?.id) {
    throw new Error('로그인된 사용자 ID를 확인할 수 없습니다.')
  }

  const supabase = createClient()

  try {
    const { error } = await supabase
      .from('playlists')
      .delete()
      .eq('id', playlistId)
      .eq('user_id', user.id)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('플레이리스트 삭제 오류:', error)
    throw new Error('플레이리스트를 삭제하는 중 문제가 발생했습니다.')
  }
}
