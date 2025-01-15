'use client'

import { useChartStore } from '@/store/useChartSlice'
import type { BillboradSong } from '@/types/billboradCharts'
import type { MelonChartSong } from '@/types/melonCharts'
import Link from 'next/link'
import Top20Item from './Top20Item'

type Top20ListProps = {
  koreaTop20ChartList: MelonChartSong[]
  billboardTop20ChartList: BillboradSong[]
}

// image, 제목, 가수명, ranking
const Top20List: React.FC<Top20ListProps> = ({
  koreaTop20ChartList,
  billboardTop20ChartList,
}) => {
  // useState로만 해도 될 듯 -> Top 100은 필요가 없어짐
  const { isKoreaChart, setIsKoreaChart } = useChartStore()

  const chartList: Array<MelonChartSong | BillboradSong> = isKoreaChart
    ? koreaTop20ChartList
    : billboardTop20ChartList

  return (
    <div>
      <div className="mt-5 flex">
        <h1 onClick={() => setIsKoreaChart(true)} className="mr-3">
          국내 TOP 100
        </h1>

        <h1 className="mr-3" onClick={() => setIsKoreaChart(false)}>
          빌보드 TOP 100
        </h1>
      </div>
      <Link
        href={isKoreaChart ? '/koreaTop100' : '/billboardTop100'}
        className="m-2 flex justify-end text-sm"
      >
        더보기
      </Link>
      <ul className="grid auto-cols-auto grid-flow-col grid-rows-4 gap-4 overflow-x-auto">
        {chartList.map((chart, index) => (
          <Top20Item
            key={
              isKoreaChart
                ? (chart as MelonChartSong).SONGID
                : (chart as BillboradSong).rank
            }
            chart={chart}
            index={index}
          />
        ))}
      </ul>
    </div>
  )
}

export default Top20List
