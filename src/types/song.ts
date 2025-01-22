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
  created_at: string
}

export type LikedSong = {
  id: string
  music: {
    title: string
    album_cover: string
    artist: string
    spotify_id: string
  }
  created_at: string
}
