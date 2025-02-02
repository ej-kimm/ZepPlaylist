import { fetchGlobalChart } from '@/api/home/actions'
import type { BillboardSong } from '@/types/billboradCharts'
import MusicChartHeader from '../_components/MusicChartHeader'
import Top100ChartList from '../_components/Top100ChartList'

export const revalidate = 3600

const billboardTop100 = async () => {
  const billboardTop100Chart = await fetchGlobalChart()
  const billboardTop100ChartList = billboardTop100Chart.songs

  const top100ChartMusic = billboardTop100ChartList.map((item) => {
    return {
      songName: item.title.replace(/\s*\(.*?\)\s*/g, '').trim(),
      artistName: item.artist.replace(/\s*\(.*?\)\s*/g, '').trim(),
      albumCover: item.cover,
    }
  })

  const newData: {
    isKoreaChart: false
    list: BillboardSong[]
  } = {
    isKoreaChart: false,
    list: billboardTop100ChartList,
  }
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
      <MusicChartHeader
        top100ChartMusic={top100ChartMusic}
        isKoreaChart={newData.isKoreaChart}
      />
      <ul className="w-full space-y-2">
        {newData.list.map((chart, index) => (
          <Top100ChartList
            key={chart.rank}
            isKoreaChart={newData.isKoreaChart}
            musicName={chart.title}
            artistName={chart.artist}
            albumCover={chart.cover}
            index={index}
          />
        ))}
      </ul>
    </div>
  )
}

export default billboardTop100
