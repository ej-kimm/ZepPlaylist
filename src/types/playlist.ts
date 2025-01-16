export type PlaylistRow = {
  created_at: string
  description: string | null
  id: string
  is_public: boolean
  keyword: string
  name: string
  user_id: string
  latest_song_cover?: string | null
}

export type PlaylistInsert = {
  created_at?: string
  description?: string | null
  id?: string
  is_public: boolean
  keyword: string
  name: string
  user_id: string
}

export type PlaylistUpdate = {
  created_at?: string
  description?: string | null
  id?: string
  is_public?: boolean
  keyword?: string
  name?: string
  user_id?: string
}

export type MusicData = {
  id: string
  title: string
  artist: string
}
