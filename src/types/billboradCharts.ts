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
  title: string
  playTime: number
  albumCover: string
}
