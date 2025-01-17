import { supabase } from '@/utils/supabase/client'
import { useCallback } from 'react'
import Swal from 'sweetalert2'

interface MusicData {
  id: string
  title: string
  artist: string
}

export const usePlaylistMusicUpsert = (albumCover: string) => {
  const upsertMusic = useCallback(
    async (musicData: MusicData) => {
      if (!musicData) {
        console.log('No data returned from onFetchMusicData')
        return null
      }

      const { data: existingMusic, error: fetchError } = await supabase
        .from('music')
        .select('*')
        .eq('spotify_id', musicData.id)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching music:', fetchError)
        return null
      }

      if (!existingMusic) {
        const { data: insertedMusic, error: insertError } = await supabase
          .from('music')
          .insert({
            spotify_id: musicData.id,
            title: musicData.title,
            artist: musicData.artist,
            album_cover: albumCover,
            play_time: 0,
            created_at: new Date().toISOString(),
          })
          .select()
          .single()

        if (insertError) {
          console.error('Error inserting new music:', insertError)
          return null
        }

        console.log('Insert successful:', insertedMusic)
        return insertedMusic.spotify_id
      } else {
        const { data: updatedMusic, error: updateError } = await supabase
          .from('music')
          .update({ created_at: new Date().toISOString() })
          .eq('spotify_id', musicData.id)
          .select()
          .single()

        if (updateError) {
          console.error('Error updating created_at:', updateError)
          return null
        }

        return updatedMusic.spotify_id
      }
    },
    [albumCover],
  )

  const addMusicToPlaylistTable = useCallback(
    async (musicId: string, playlistId: string) => {
      if (!musicId) return null

      const { data: existingPlayList, error: fetchError } = await supabase
        .from('playlist_music')
        .select('music_id')
        .eq('playlist_id', playlistId)
        .eq('music_id', musicId)

      if (fetchError) {
        console.error('Error fetching playlist music:', fetchError)
        return null
      }

      if (existingPlayList && existingPlayList.length > 0) {
        Swal.fire(
          '취소',
          '해당 곡은 이미 플레이리스트에 저장된 곡입니다.',
          'warning',
        )
        return { success: true, musicId }
      }

      const { error: insertError } = await supabase
        .from('playlist_music')
        .insert({
          playlist_id: playlistId,
          music_id: musicId,
        })

      if (insertError) {
        console.error('Error adding music to playlist:', insertError)
        return null
      }

      Swal.fire('완료', '해당 곡이 플레이리스트에 저장되었습니다.', 'success')
      return { success: true, musicId }
    },
    [],
  )

  return { upsertMusic, addMusicToPlaylistTable }
}
