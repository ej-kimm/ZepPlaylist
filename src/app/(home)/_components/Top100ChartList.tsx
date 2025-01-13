'use client'

import { userStore } from '@/store/userSlice'
import type { BillboradSong } from '@/types/billboradCharts'
import type { MelonChartSong } from '@/types/melonCharts'
import Image from 'next/image'

// {isKorean: true, data:[{}, {}]}
// {isKorean: false, data:[{}, {}]}

// discriminated union

type KoreanChart = {
  isKoreaChart: true
  list: MelonChartSong[]
}

type BillboardChart = {
  isKoreaChart: false
  list: BillboradSong[]
}

type Chart = KoreanChart | BillboardChart

// const ChartList = ({ data }: { data: Chart }) => {
//   return (
//     <div>
//       {/*  */}
//       {data.isKorean &&
//         data.list.map((item) => <div>{item.ARTISTLIST[0].ARTISTNAME}</div>)}

//       {!data.isKorean &&
//         data.list.map((item) => (
//           <div>
//             <>{item.artist}</>
//           </div>
//         ))}
//     </div>
//   )
// }

// export default ChartList
// // ====================================

const Top100ChartList = ({ data }: { data: Chart }) => {
  // 유저정보 가져오기
  const { user } = userStore((state) => state)
  console.log('user', user)

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-3 text-2xl font-bold">TOP 100</h1>
      <ul>
        {data.list.map((chart, index) => (
          <li
            key={
              data.isKoreaChart
                ? (chart as MelonChartSong).SONGID
                : (chart as BillboradSong).rank
            }
            className="flex items-center space-x-4 rounded-lg p-3 transition-colors"
          >
            <div className="relative flex-shrink-0">
              <Image
                src={
                  data.isKoreaChart
                    ? (chart as MelonChartSong).ALBUMIMG
                    : (chart as BillboradSong).cover
                }
                alt={
                  data.isKoreaChart
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
                {data.isKoreaChart
                  ? (chart as MelonChartSong).SONGNAME
                  : (chart as BillboradSong).title}
              </h3>
              <p className="truncate text-sm text-gray-500">
                {data.isKoreaChart
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
