export type PlaylistRow = {
  id: string
  name: string
  description: string | null
  is_public: boolean
  keyword: string
  user_id: string
  is_liked: boolean
  latest_song_cover?: string | null
}

export type PlaylistInsert = Omit<PlaylistRow, 'id' | 'latest_song_cover'>

export type PlaylistUpdate = Partial<PlaylistInsert>

export type MusicData = {
  id: string
  title: string
  artist: string
}
