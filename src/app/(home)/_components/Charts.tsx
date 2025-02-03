import { fetchBillboardChart, fetchKoreanChart } from '@/api/home/actions'
import type { Charts } from '@/types/billboradCharts'
import Top20List from './Top20List'

// 1시간 간격의 ISR
export const revalidate = 3600

const Charts = async () => {
  const [koreanChart, billboardChart] = await Promise.all([
    fetchKoreanChart(),
    fetchBillboardChart(),
  ])

  const koreanTop20ChartList = koreanChart!.slice(0, 20)
  const billboardTop20ChartList = billboardChart!.slice(0, 20)

  const newKoreanTop20ChartList: {
    isKoreaChart: true
    list: Charts[]
  } = {
    isKoreaChart: true,
    list: koreanTop20ChartList!,
  }

  const newBillboardTop20ChartList: {
    isKoreaChart: false
    list: Charts[]
  } = {
    isKoreaChart: false,
    list: billboardTop20ChartList!,
  }

  return (
    <>
      <Top20List
        newKoreanTop20ChartList={newKoreanTop20ChartList}
        newBillboardTop20ChartList={newBillboardTop20ChartList}
      />
    </>
  )
}

export default Charts
