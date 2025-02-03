import { fetchKoreanChart } from '@/api/home/actions'
import type { Charts } from '@/types/billboradCharts'
import MusicChartHeader from '../_components/MusicChartHeader'
import Top100ChartList from '../_components/Top100ChartList'

export const revalidate = 3600

const koreaTop100 = async () => {
  const koreanTop100Chart = await fetchKoreanChart()

  const newData: {
    isKoreaChart: true
    list: Charts[]
  } = {
    isKoreaChart: true,
    list: koreanTop100Chart!,
  }
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
      <MusicChartHeader
        top100ChartMusic={koreanTop100Chart!}
        isKoreaChart={newData.isKoreaChart}
      />

      <Top100ChartList top100Chart={koreanTop100Chart!} />
    </div>
  )
}

export default koreaTop100
