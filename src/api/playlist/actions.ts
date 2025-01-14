'use server'

import { PlaylistInsert, PlaylistRow, PlaylistUpdate } from '@/types/playlist'
import { createClient } from '@/utils/supabase/server'

// 사용자 정보 가져오기
export async function getUser() {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.error('사용자 정보 가져오기 오류:', error)
    throw new Error('사용자 정보를 가져오는 중 문제가 발생했습니다.')
  }

  return user
}

// 사용자 ID를 기준으로 플레이리스트 가져오기
export async function fetchPlaylists(): Promise<PlaylistRow[]> {
  const user = await getUser() // 로그인된 사용자 정보 가져오기

  if (!user?.id) {
    throw new Error('로그인된 사용자 ID를 확인할 수 없습니다.')
  }

  const supabase = createClient()

  try {
    // 사용자 ID 기준으로 플레이리스트 가져오기
    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .eq('user_id', user.id) // 사용자 ID로 필터링
      .order('created_at', { ascending: false }) // 최신 순 정렬

    if (error) throw error

    return data || []
  } catch (error) {
    console.error('플레이리스트 가져오기 오류:', error)
    throw new Error('플레이리스트 데이터를 가져오는 중 문제가 발생했습니다.')
  }
}

// 최신 음악 커버 가져오기
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
      .order('created_at', { ascending: false }) // 최신 순 정렬
      .limit(1)

    if (error) throw error

    return data?.[0]?.music?.album_cover || null
  } catch (error) {
    console.error('앨범 커버 가져오기 오류:', error)
    return null
  }
}

// 사용자 ID를 기준으로 플레이리스트와 최신 음악 커버 통합 가져오기
export async function fetchPlaylistsWithCovers(): Promise<PlaylistRow[]> {
  const playlists = await fetchPlaylists() // 사용자 ID로 필터링된 플레이리스트 가져오기

  // 각 플레이리스트에 최신 음악 커버 추가
  const playlistsWithCovers = await Promise.all(
    playlists.map(async (playlist) => {
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
  const user = await getUser() // 로그인된 사용자 정보 가져오기

  if (!user?.id) {
    throw new Error('로그인된 사용자 ID가 필요합니다.')
  }

  const supabase = createClient()

  try {
    const { error } = await supabase.from('playlists').insert({
      ...playlistData,
      user_id: user.id, // 사용자 ID 추가
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
  const user = await getUser() // 로그인된 사용자 정보 가져오기

  if (!user?.id) {
    throw new Error('로그인된 사용자 ID가 필요합니다.')
  }

  const supabase = createClient()

  try {
    const { error } = await supabase
      .from('playlists')
      .update(updatedData)
      .eq('id', playlistId)
      .eq('user_id', user.id) // 사용자 ID 필터 추가

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('플레이리스트 수정 오류:', error)
    throw new Error('플레이리스트를 수정하는 중 문제가 발생했습니다.')
  }
}
