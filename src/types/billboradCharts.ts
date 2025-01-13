export type BillboradCharts = {
  songs: BillboradSong[]
}

export type BillboradSong = {
  rank: number
  title: string
  artist: string
  cover: string
  // position: [Object]
}
