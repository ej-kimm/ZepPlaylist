'use client'

import type { BillboradSong } from '@/types/billboradCharts'
import type { MelonChartSong } from '@/types/melonCharts'
import Link from 'next/link'
import { useState } from 'react'
import Top20Item from './Top20Item'

type Top20ListProps = {
  koreaTop20ChartList: MelonChartSong[]
  billboardTop20ChartList: BillboradSong[]
}

const Top20List: React.FC<Top20ListProps> = ({
  koreaTop20ChartList,
  billboardTop20ChartList,
}) => {
  const [isKoreaChart, setIsKoreaChart] = useState(true)

  const chartList: Array<MelonChartSong | BillboradSong> = isKoreaChart
    ? koreaTop20ChartList
    : billboardTop20ChartList

  return (
    <div className="mb-10">
      <div className="mt-5 flex">
        <h1 onClick={() => setIsKoreaChart(true)} className="mr-4 font-medium">
          국내 TOP 100
        </h1>

        <h1 className="mr-4 font-medium" onClick={() => setIsKoreaChart(false)}>
          빌보드 TOP 100
        </h1>
      </div>
      <Link
        href={isKoreaChart ? '/koreaTopChart' : '/billboardTopChart'}
        className="flex justify-end text-sm"
      >
        더보기
      </Link>
      <ul className="grid auto-cols-auto grid-flow-col grid-rows-4 gap-2 overflow-x-auto">
        {chartList.map((chart, index) => (
          <Top20Item
            key={
              isKoreaChart
                ? (chart as MelonChartSong).SONGID
                : (chart as BillboradSong).rank
            }
            chart={chart}
            index={index}
            musicName={
              isKoreaChart
                ? (chart as MelonChartSong).SONGNAME
                : (chart as BillboradSong).title
            }
            artistName={
              isKoreaChart
                ? (chart as MelonChartSong).ARTISTLIST[0].ARTISTNAME
                : (chart as BillboradSong).artist
            }
            albumCover={
              isKoreaChart
                ? (chart as MelonChartSong).ALBUMIMG
                : (chart as BillboradSong).cover
            }
          />
        ))}
      </ul>
    </div>
  )
}

export default Top20List
