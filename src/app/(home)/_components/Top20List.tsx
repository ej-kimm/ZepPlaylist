'use client'

import type { BillboardSong } from '@/types/billboradCharts'
import type { MelonChartSong } from '@/types/melonCharts'
import Link from 'next/link'
import { useState } from 'react'
import Top20Item from './Top20Item'

import rightArrow from '@/assets/images/rightArrow.svg'
import Image from 'next/image'

type Top20ListProps = {
  koreaTop20ChartList: MelonChartSong[]
  billboardTop20ChartList: BillboardSong[]
}

const Top20List: React.FC<Top20ListProps> = ({
  koreaTop20ChartList,
  billboardTop20ChartList,
}) => {
  const [isKoreaChart, setIsKoreaChart] = useState(true)

  const chartList: Array<MelonChartSong | BillboardSong> = isKoreaChart
    ? koreaTop20ChartList
    : billboardTop20ChartList

  return (
    <div className="mb-5">
      <div className="mb-4 mt-5 flex justify-between">
        <div className="flex items-center justify-start">
          <h1
            onClick={() => setIsKoreaChart(true)}
            className={`title-2 mr-4 cursor-pointer ${isKoreaChart ? 'text-black' : 'text-gray-300'}`}
          >
            국내 TOP 100
          </h1>

          <h1
            onClick={() => setIsKoreaChart(false)}
            className={`title-2 cursor-pointer ${!isKoreaChart ? 'text-black' : 'text-gray-300'}`}
          >
            빌보드 TOP 100
          </h1>
        </div>
        <Link
          href={isKoreaChart ? '/koreaTopChart' : '/billboardTopChart'}
          className="mr-6 flex justify-end text-sm"
        >
          더보기
          <Image src={rightArrow} height={16} width={16} alt=">" />
        </Link>
      </div>
      <ul className="scroll-invisible grid auto-cols-auto grid-flow-col grid-rows-4 gap-2 overflow-x-auto">
        {chartList.map((chart, index) => (
          <Top20Item
            key={
              isKoreaChart
                ? (chart as MelonChartSong).SONGID
                : (chart as BillboardSong).rank
            }
            chart={chart}
            index={index}
            musicName={
              isKoreaChart
                ? (chart as MelonChartSong).SONGNAME
                : (chart as BillboardSong).title
            }
            artistName={
              isKoreaChart
                ? (chart as MelonChartSong).ARTISTLIST[0].ARTISTNAME
                : (chart as BillboardSong).artist
            }
            albumCover={
              isKoreaChart
                ? (chart as MelonChartSong).ALBUMIMG
                : (chart as BillboardSong).cover
            }
          />
        ))}
      </ul>
    </div>
  )
}

export default Top20List
