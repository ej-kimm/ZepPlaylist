import { fetchMelonChart } from '@/api/home/fetchMelonChart'
import Image from 'next/image'

// 1시간 간격의 ISR
export const revalidate = 3600

const Top100ChartList = async () => {
  const koreaTop100Chart = await fetchMelonChart()

  const koreaTop100ChartList = koreaTop100Chart.response.SONGLIST

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-3 text-2xl font-bold">TOP 100</h1>
      <ul>
        {koreaTop100ChartList.map((chart, index) => (
          <li
            key={chart.SONGID}
            className="flex items-center space-x-4 rounded-lg p-3 transition-colors"
          >
            <div className="relative flex-shrink-0">
              <Image
                src={chart.ALBUMIMG}
                alt={chart.ALBUMNAME}
                width={50}
                height={50}
                className="rounded-md"
                priority
              />
            </div>
            <p className="truncate text-lg">{index + 1}</p>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-medium text-gray-900">
                {chart.SONGNAME}
              </h3>
              <p className="truncate text-sm text-gray-500">
                {chart.ARTISTLIST[0].ARTISTNAME}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Top100ChartList
