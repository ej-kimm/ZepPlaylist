import { fetchGlobalChart } from '@/api/home/actions'
import type { BillboradSong } from '@/types/billboradCharts'
import Top100ChartList from '../_components/Top100ChartList'

export const revalidate = 3600

const billboardTop100 = async () => {
  const billboardTop100Chart = await fetchGlobalChart()
  const billboardTop100ChartList = billboardTop100Chart.songs

  const newData: {
    isKoreaChart: false
    list: BillboradSong[]
  } = {
    isKoreaChart: false,
    list: billboardTop100ChartList,
  }
  return (
    <div>
      <div className="mx-auto max-w-3xl p-4">
        <h1 className="mb-3 text-2xl font-bold">TOP 100</h1>
        <ul>
          {newData.list.map((chart, index) => (
            <Top100ChartList
              isKoreaChart={newData.isKoreaChart}
              musicName={chart.title}
              artistName={chart.artist}
              albumCover={chart.cover}
              id={chart.rank}
              index={index}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default billboardTop100
