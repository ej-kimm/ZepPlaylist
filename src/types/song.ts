export type Song = {
  spotify_id: string
  title: string
  artist: string
  play_time: number
  album_cover: string | null
}

export type PlaylistDetails = {
  id: string
  name: string
  description: string | null
  song_count: number
  total_play_time: string
  last_updated: string
  songs: Song[]
}
