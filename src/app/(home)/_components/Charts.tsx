import { fetchGlobalChart, fetchMelonChart } from '@/api/home/actions'
import Top20List from './Top20List'

// 1시간 간격의 ISR
export const revalidate = 3600

const Charts = async () => {
  const koreaChart = await fetchMelonChart()

  const koreaTop100ChartList = koreaChart.response.SONGLIST

  const koreaTop20ChartList = koreaTop100ChartList.slice(undefined, 20)

  const billboardTop100ChaertList = await fetchGlobalChart()

  const billboardTop20ChartList = billboardTop100ChaertList.songs.slice(
    undefined,
    20,
  )

  return (
    <>
      <Top20List
        koreaTop20ChartList={koreaTop20ChartList}
        billboardTop20ChartList={billboardTop20ChartList}
      />
    </>
  )
}

export default Charts
