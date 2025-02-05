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
  playTime?: number
  albumCover: string
  albumName?: string | null
  lyrics?: string | null
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

export type MusicSaveType = {
  id: string
  title: string
  artist: string
  album_cover: string | null
  album_name?: string | null
  lyrics?: string | null
  play_time?: number | null
  created_at?: string
}
