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
      <Top100ChartList data={newData} />
    </div>
  )
}

export default billboardTop100
