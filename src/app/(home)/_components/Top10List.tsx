'use client'

import { useChartStore } from '@/store/useChartSlice'
import type { BillboradSong } from '@/types/billboradCharts'
import type { MelonChartSong } from '@/types/melonCharts'
import Link from 'next/link'
import Top10Item from './Top10Item'

type Top10ListProps = {
  koreaTop10ChartList: MelonChartSong[]
  billboardTop10ChartList: BillboradSong[]
}

const Top10List: React.FC<Top10ListProps> = ({
  koreaTop10ChartList,
  billboardTop10ChartList,
}) => {
  const { isKoreaChart, setIsKoreaChart } = useChartStore()

  const chartList: Array<MelonChartSong | BillboradSong> = isKoreaChart
    ? koreaTop10ChartList
    : billboardTop10ChartList

  return (
    <div className="overflow-x-auto">
      <div className="flex">
        <h1 onClick={() => setIsKoreaChart(true)} className="mb-4 mr-3 text-xl">
          국내 TOP 100
        </h1>

        <h1
          className="mb-4 mr-3 text-xl"
          onClick={() => setIsKoreaChart(false)}
        >
          빌보드 TOP 100
        </h1>
      </div>
      <Link
        href={isKoreaChart ? '/KoreaTop100' : '/BillboardTop100'}
        className="mb-6 inline-block"
      >
        더보기
      </Link>
      <ul className="grid auto-cols-auto grid-flow-col grid-rows-4 gap-4">
        {chartList.map((chart, index) => (
          <Top10Item
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

export default Top10List
