import { fetchGlobalChart, fetchMelonChart } from '@/api/home/actions'
import Top10List from './Top10List'

// 1시간 간격의 ISR
export const revalidate = 3600

const Charts = async () => {
  // const { isKoreaChart, setIsKoreaChart } = useChartStore()

  const koreaTop100Chart = await fetchMelonChart()

  const koreaTop100ChartList = koreaTop100Chart.response.SONGLIST

  const koreaTop10ChartList = koreaTop100ChartList.slice(undefined, 20)

  const billboardTop50ChaertList = fetchGlobalChart()
  console.log(billboardTop50ChaertList)

  return (
    <>
      <Top10List koreaTop10ChartList={koreaTop10ChartList} />
    </>
  )
}

export default Charts
