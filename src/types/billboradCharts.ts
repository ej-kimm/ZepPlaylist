export type BillboardCharts = {
  songs: BillboardSong[]
}

export type BillboardSong = {
  rank: number
  title: string
  artist: string
  cover: string
}

export type SpotifyTrack = {
  album_cover: string | null
  album_name?: string | null
  artist: string
  created_at?: string
  lyrics?: string | null
  play_time?: number | null
  spotify_id: string
  title: string
}

export type Charts = {
  spotify_id: string
  created_at: string
  title: string
  artist: string
  play_time: number
  album_cover: string
  album_name?: string | null
}
