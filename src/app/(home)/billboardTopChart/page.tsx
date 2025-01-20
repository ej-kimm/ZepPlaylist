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
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
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
    </div>
  )
}

export default billboardTop100
