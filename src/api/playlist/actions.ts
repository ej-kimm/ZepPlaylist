'use server'

import { TablesInsert } from '@/types/supabase'
import { createClient } from '@/utils/supabase/server'
// 플리 테이블 insert 정의
type PlaylistInsert = TablesInsert<'playlists'>

// 플리 데이터 가져오기
export async function fetchPlaylists() {
  const supabase = createClient()
  try {
    const { data, error } = await supabase
      .from('playlists')
      .select(
        `
        *,
        playlist_music!inner(
          music:music_id(
            album_cover
          )
        )
        `,
      )
      .order('created_at', { ascending: false, foreignTable: 'playlist_music' })
      .limit(1, { foreignTable: 'playlist_music' })

    if (error) {
      throw error
    }

    return (
      data?.map((playlist) => ({
        ...playlist,
        latest_song_cover:
          playlist.playlist_music?.[0]?.music?.album_cover || null,
      })) || []
    )
  } catch (error) {
    console.error('플레이리스트 가져오기 오류:', error)
    throw new Error('플레이리스트 데이터를 가져오는 중 문제가 발생했습니다.')
  }
}

// 플리 추가
export async function addPlaylist(playlist: Omit<PlaylistInsert, 'id'>) {
  const supabase = createClient()

  try {
    const { error } = await supabase.from('playlists').insert<PlaylistInsert>({
      ...playlist,
    })

    if (error) {
      throw error
    }

    return { success: true }
  } catch (error) {
    console.error('플레이리스트 추가 오류:', error)
    throw new Error('플레이리스트 추가 중 문제가 발생했습니다.')
  }
}

// 플리 업데이트
export async function updatePlaylist(
  playlistId: string,
  updatedData: Partial<Omit<PlaylistInsert, 'id'>>,
) {
  const supabase = createClient()

  try {
    const { error } = await supabase
      .from('playlists')
      .update(updatedData)
      .eq('id', playlistId)

    if (error) {
      throw error
    }

    return { success: true }
  } catch (error) {
    console.error('플레이리스트 수정 오류:', error)
    throw new Error('플레이리스트 수정 중 문제가 발생했습니다.')
  }
}
