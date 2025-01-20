export type LikedSong = {
  created_at: string
  id: string
  music_id: string
  user_id: string
}

export type UserLikedSongDetails = {
  album_cover?: string
  artist?: string
  created_at: string
  play_time?: number // Corrected from 'play_tiem'
  spotify_id?: string
  title?: string
  user_id: string
  id: string
  music_id: string
}
