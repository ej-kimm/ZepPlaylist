export type PlaylistRow = {
  id: string
  created_at: string
  name: string
  description: string | null
  is_public: boolean
  keyword: string
  user_id: string
  latest_song_cover?: string | null
}

export type PlaylistInsert = {
  name: string
  description?: string | null
  is_public: boolean
  keyword: string
  user_id: string
}

export type PlaylistUpdate = {
  name?: string
  description?: string | null
  is_public?: boolean
  keyword?: string
}

export type MusicData = {
  id: string
  title: string
  artist: string
}
