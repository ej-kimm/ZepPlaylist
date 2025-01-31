type PlaylistLike = {
  user_id: string
}
type Playlist = {
  id: string
  created_at: string
  description: string
  is_public: boolean
  keyword: string
  name: string
  playlist_like: PlaylistLike[]
  user_id: string
}
type Page = {
  nextCursor: number | null
  playlists: Playlist[]
}
export type OldData = {
  pages: Page[]
  pageParams: number[]
}
