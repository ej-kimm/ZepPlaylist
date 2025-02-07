export type PlaylistRow = {
  id: string
  name: string
  description: string | null
  is_public: boolean
  keyword: string
  user_id: string
  is_liked?: boolean
  latest_song_cover?: string | null
  playlist_like?: { user_id: string }[]
  song_count?: number
}

export type PlaylistInsert = Omit<
  PlaylistRow,
  'id' | 'latest_song_cover' | 'is_liked'
>

export type PlaylistUpdate = Partial<PlaylistInsert>

export type MusicData = {
  id: string
  title: string
  artist: string
}
