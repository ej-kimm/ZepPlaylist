import { fetchGlobalChart, fetchMelonChart } from '@/api/home/actions'
import Top20List from './Top20List'

// 1시간 간격의 ISR
// export const revalidate = 3600

const Charts = async () => {
  const [koreaChart, billboardChart] = await Promise.all([
    fetchMelonChart(),
    fetchGlobalChart(),
  ])

  const koreaTop20ChartList = koreaChart.response.SONGLIST.slice(0, 20)
  const billboardTop20ChartList = billboardChart.songs.slice(0, 20)

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
