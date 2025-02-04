export type Song = {
  spotify_id: string
  created_at: string
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

export type LikedSong = {
  id: string
  music: {
    title: string
    album_cover: string
    artist: string
    spotify_id: string
    play_time: number
  }
  created_at: string
}
