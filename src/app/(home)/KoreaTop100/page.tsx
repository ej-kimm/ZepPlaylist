import { fetchMelonChart } from '@/api/home/actions'
import type { MelonChartSong } from '@/types/melonCharts'
import Top100ChartList from '../_components/Top100ChartList'

export const revalidate = 3600

const koreaTop100 = async () => {
  const koreaTop100Chart = await fetchMelonChart()

  const koreaTop100ChartList = koreaTop100Chart.response.SONGLIST

  const newData: {
    isKoreaChart: true
    list: MelonChartSong[]
  } = {
    isKoreaChart: true,
    list: koreaTop100ChartList,
  }
  return (
    <div>
      <Top100ChartList data={newData} />
    </div>
  )
}

export default koreaTop100
