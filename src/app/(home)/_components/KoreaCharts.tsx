import { fetchMelonChart } from '@/api/home/fetchMelonChart'
import Image from 'next/image'
import Link from 'next/link'

// 1시간 간격의 ISR
export const revalidate = 3600

const KoreaCharts = async () => {
  const koreaTop100Chart = await fetchMelonChart()

  const koreaTop100ChartList = koreaTop100Chart.response.SONGLIST

  const koreaTop10ChartList = koreaTop100ChartList.slice(undefined, 20)

  console.log(koreaTop10ChartList)
  return (
    <div className="">
      <h1 className="mb-4 text-2xl font-bold">국내 TOP 100</h1>
      <Link href={'/KoreaTop100'} className="mb-6 inline-block">
        더보기
      </Link>
      <ul className="grid auto-cols-auto grid-flow-col grid-rows-4 gap-4">
        {koreaTop10ChartList.map((chart, index) => (
          <li
            key={chart.SONGID}
            className="flex h-16 w-64 flex-shrink-0 items-center space-x-3 rounded-lg p-2 transition-colors"
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
  )
}

export default KoreaCharts
