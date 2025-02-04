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
  id: string
  artist: string
  created_at?: string
  title: string
  playTime: number
  albumCover: string
  albumName?: string | null
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
