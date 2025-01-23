export type BillboradCharts = {
  songs: BillboradSong[]
}

export type BillboradSong = {
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
