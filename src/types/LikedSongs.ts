export type LikedSong = {
  created_at: string
  id: string
  music_id: string
  user_id: string
}

export type UserLikedSongDetails = {
  album_cover: string
  album_name: string | null
  artist: string
  created_at: string
  lyrics: string | null
  play_time: number
  spotify_id: string
  title: string
}
