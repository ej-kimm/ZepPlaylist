'use server'

import { PlaylistDetails, Song } from '@/types/song'
import { createClient } from '@/utils/supabase/server'

function formatPlayTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0분'
  const minutes = Math.floor(seconds / 60)
  return `${minutes}분`
}

export async function fetchPlaylistDetails(
  playlistId: string,
): Promise<PlaylistDetails | null> {
  try {
    const supabase = createClient()

    // 플레이리스트 기본 정보 가져오기
    const { data: playlist, error: playlistError } = await supabase
      .from('playlists')
      .select('id, name, description')
      .eq('id', playlistId)
      .single()

    if (playlistError) {
      console.error('플레이리스트 정보 가져오기 오류:', playlistError.message)
      return null
    }

    // 곡 정보 가져오기
    const { data: playlistMusic, error: playlistMusicError } = await supabase
      .from('playlist_music')
      .select(
        `
    music:music_id (
      spotify_id,
      title,
      artist,
      play_time,
      album_cover,
      album_name
    ),
    created_at
  `,
      )
      .eq('playlist_id', playlistId)

    if (playlistMusicError) {
      console.error('곡 정보 가져오기 오류:', playlistMusicError.message)
      return null
    }

    const songs: Song[] = playlistMusic
      .map((item) => ({
        spotify_id: item.music.spotify_id,
        title: item.music.title || '',
        artist: item.music.artist || '',
        play_time: item.music.play_time || 0,
        album_cover: item.music.album_cover || null,
        album_name: item.music.album_name || null,
        created_at: item.created_at || '',
      }))
      .sort(
        (a, b) =>
          new Date(b.created_at || '').getTime() -
          new Date(a.created_at || '').getTime(),
      )

    // 총 재생 시간 계산 및 변환
    const totalPlayTimeMilliseconds = songs.reduce(
      (acc, song) => acc + (song.play_time || 0),
      0,
    )
    const totalPlayTime = formatPlayTime(totalPlayTimeMilliseconds / 1000)

    // 마지막 업데이트 일자
    const { data: lastUpdatedData } = await supabase
      .from('playlist_music')
      .select('created_at')
      .eq('playlist_id', playlistId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    const lastUpdated = lastUpdatedData?.created_at || ''

    // 최종 결과
    return {
      id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      song_count: songs.length,
      total_play_time: totalPlayTime,
      last_updated: lastUpdated,
      songs,
    }
  } catch (error) {
    console.error('서버 액션 오류:', error)
    return null
  }
}

// 곡 삭제
export async function deleteSongFromPlaylist(
  playlistId: string,
  spotifyId: string,
): Promise<boolean> {
  try {
    const supabase = createClient()

    const { error } = await supabase
      .from('playlist_music')
      .delete()
      .eq('playlist_id', playlistId)
      .eq('music_id', spotifyId)
    if (error) {
      console.error('곡 삭제 중 오류 발생:', error.message)
      return false
    }

    return true
  } catch (error) {
    console.error('서버 삭제 액션 오류:', error)
    return false
  }
}
