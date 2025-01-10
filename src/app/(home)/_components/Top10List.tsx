'use client'

import type { MelonChartSong } from '@/types/melonCharts'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Top10List = ({
  koreaTop10ChartList,
}: {
  koreaTop10ChartList: MelonChartSong[]
}) => {
  // const { isKoreaChart, setIsKoreaChart } = useChartStore()
  const [isKoreaChart, setIsKoreaChart] = useState(true)
  console.log('isKoreaChart', isKoreaChart)

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
      {isKoreaChart ? (
        <div>
          <Link href={'/KoreaTop100'} className="mb-6 inline-block">
            더보기
          </Link>
          <ul className="grid auto-cols-auto grid-flow-col grid-rows-4 gap-4">
            {koreaTop10ChartList.map((chart, index) => (
              <li
                key={chart.SONGID}
                className="flex h-16 w-64 flex-shrink-0 items-center space-x-3 rounded-lg p-2 shadow-xl transition-colors"
              >
                <div className="relative flex-shrink-0">
                  <Image
                    src={chart.ALBUMIMG}
                    alt={chart.ALBUMNAME}
                    width={40}
                    height={40}
                    className="rounded-md object-cover"
                    priority
                  />
                </div>
                <p className="truncate text-lg">{index + 1}</p>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <h3 className="truncate text-sm font-medium text-gray-900">
                    {chart.SONGNAME}
                  </h3>
                  <p className="truncate text-xs text-gray-500">
                    {chart.ARTISTLIST[0].ARTISTNAME}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <Link href={'/BillboardTop100'} className="mb-6 inline-block">
            더보기
          </Link>
          <ul className="grid auto-cols-auto grid-flow-col grid-rows-4 gap-4">
            {/* {koreaTop10ChartList.map((chart, index) => (
              <li
                key={chart.SONGID}
                className="flex h-16 w-64 flex-shrink-0 items-center space-x-3 rounded-lg p-2 shadow-xl transition-colors"
              >
                <div className="relative flex-shrink-0">
                  <Image
                    src={chart.ALBUMIMG}
                    alt={chart.ALBUMNAME}
                    width={40}
                    height={40}
                    className="rounded-md object-cover"
                    priority
                  />
                </div>
                <p className="truncate text-lg">{index + 1}</p>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <h3 className="truncate text-sm font-medium text-gray-900">
                    {chart.SONGNAME}
                  </h3>
                  <p className="truncate text-xs text-gray-500">
                    {chart.ARTISTLIST[0].ARTISTNAME}
                  </p>
                </div>
              </li>
            ))} */}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Top10List
