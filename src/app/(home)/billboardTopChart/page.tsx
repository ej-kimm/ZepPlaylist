import { fetchBillboardChart } from '@/api/home/actions'
import type { Charts } from '@/types/billboradCharts'
import MusicChartHeader from '../_components/MusicChartHeader'
import Top100ChartList from '../_components/Top100ChartList'

export const revalidate = 3600

const billboardTop100 = async () => {
  const billboardTop100Chart = await fetchBillboardChart()

  const newData: {
    isKoreaChart: false
    list: Charts[]
  } = {
    isKoreaChart: false,
    list: billboardTop100Chart!,
  }
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
      <MusicChartHeader
        top100ChartMusic={billboardTop100Chart!}
        isKoreaChart={newData.isKoreaChart}
      />
      <Top100ChartList top100Chart={billboardTop100Chart!} />
    </div>
  )
}

export default billboardTop100
