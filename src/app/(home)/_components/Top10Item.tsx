import { useChartStore } from '@/store/useChartSlice'
import type { BillboradSong } from '@/types/billboradCharts'
import type { MelonChartSong } from '@/types/melonCharts'
import Image from 'next/image'

type Top10ItemProps = {
  chart: MelonChartSong | BillboradSong
  index: number
}

const Top10Item: React.FC<Top10ItemProps> = ({ chart, index }) => {
  const { isKoreaChart } = useChartStore()

  return (
    <div>
      <li
        key={
          isKoreaChart
            ? (chart as MelonChartSong).SONGID
            : (chart as BillboradSong).rank
        }
        className="flex h-16 w-64 flex-shrink-0 items-center space-x-3 rounded-lg p-2 shadow-xl transition-colors"
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
            width={40}
            height={40}
            className="rounded-md object-cover"
            priority
          />
        </div>
        <p className="truncate text-lg">{index + 1}</p>
        <div className="min-w-0 flex-1 overflow-hidden">
          <h3 className="truncate text-sm font-medium text-gray-900">
            {isKoreaChart
              ? (chart as MelonChartSong).SONGNAME
              : (chart as BillboradSong).title}
          </h3>
          <p className="truncate text-xs text-gray-500">
            {isKoreaChart
              ? (chart as MelonChartSong).ARTISTLIST[0].ARTISTNAME
              : (chart as BillboradSong).artist}
          </p>
        </div>
      </li>
    </div>
  )
}

export default Top10Item
