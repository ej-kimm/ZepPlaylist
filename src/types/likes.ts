export type LikeRow = {
  id: string
  created_at: string
  user_id: string
  music_id: string
}

export type LikeInsert = {
  user_id: string
  music_id: string
}

export type LikeWithMusic = {
  id: string
  created_at: string
  user_id: string
  music: {
    id: string
    name: string
    artist: string
    album_cover: string | null
  }
}
