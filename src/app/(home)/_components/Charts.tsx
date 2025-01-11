import { fetchGlobalChart, fetchMelonChart } from '@/api/home/actions'
import Top10List from './Top10List'

// 1시간 간격의 ISR
export const revalidate = 3600

const Charts = async () => {
  const koreaChart = await fetchMelonChart()

  const koreaTop100ChartList = koreaChart.response.SONGLIST

  const koreaTop10ChartList = koreaTop100ChartList.slice(undefined, 20)

  const billboardTop100ChaertList = await fetchGlobalChart()

  const billboardTop10ChartList = billboardTop100ChaertList.songs.slice(
    undefined,
    20,
  )

  console.log(billboardTop100ChaertList)
  return (
    <>
      <Top10List
        koreaTop10ChartList={koreaTop10ChartList}
        billboardTop10ChartList={billboardTop10ChartList}
      />
    </>
  )
}

export default Charts
