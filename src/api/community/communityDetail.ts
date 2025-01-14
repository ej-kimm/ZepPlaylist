'use server'

import type { Database } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export async function getCommunityDetail(playlistId: string) {
  try {
    const { data: playlistMusic, error: playlistMusicError } = await supabase
      .from('playlist_music')
      .select('*')
      .eq('playlist_id', playlistId)

    if (playlistMusicError) throw new Error(playlistMusicError.message)

    const musicIds = playlistMusic.map((item) => item.music_id)

    const { data: songs, error: musicError } = await supabase
      .from('music')
      .select('spotify_id, title, artist, album_cover, play_time')
      .in('spotify_id', musicIds)

    if (musicError) throw new Error(musicError.message)

    return { songs, songCount: songs.length }
  } catch (error) {
    console.error('Error fetching community detail:', error)
    throw new Error('Failed to fetch community detail.')
  }
}
