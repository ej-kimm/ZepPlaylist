'use client'

import { useChartStore } from '@/store/useChartSlice'
import type { BillboradSong } from '@/types/billboradCharts'
import type { MelonChartSong } from '@/types/melonCharts'
import Image from 'next/image'

type Top100ListProps = {
  koreaTop100ChartList?: MelonChartSong[]
  billboardTop100ChartList?: BillboradSong[]
}

const Top100ChartList: React.FC<Top100ListProps> = ({
  koreaTop100ChartList,
  billboardTop100ChartList,
}) => {
  const { isKoreaChart } = useChartStore()

  const chartList: Array<MelonChartSong | BillboradSong> =
    (isKoreaChart ? koreaTop100ChartList : billboardTop100ChartList) ?? []

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-3 text-2xl font-bold">TOP 100</h1>
      <ul>
        {chartList.map((chart, index) => (
          <li
            key={
              isKoreaChart
                ? (chart as MelonChartSong).SONGID
                : (chart as BillboradSong).rank
            }
            className="flex items-center space-x-4 rounded-lg p-3 transition-colors"
          >
            <div className="relative flex-shrink-0">
              <Image
                src={
                  isKoreaChart
                    ? (chart as MelonChartSong).ALBUMIMG
                    : (chart as BillboradSong).cover
                }
                alt={
                  isKoreaChart
                    ? (chart as MelonChartSong).ALBUMNAME
                    : (chart as BillboradSong).title
                }
                width={50}
                height={50}
                className="rounded-md"
                priority
              />
            </div>
            <p className="truncate text-lg">{index + 1}</p>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-medium text-gray-900">
                {isKoreaChart
                  ? (chart as MelonChartSong).SONGNAME
                  : (chart as BillboradSong).title}
              </h3>
              <p className="truncate text-sm text-gray-500">
                {isKoreaChart
                  ? (chart as MelonChartSong).ARTISTLIST[0].ARTISTNAME
                  : (chart as BillboradSong).artist}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Top100ChartList
