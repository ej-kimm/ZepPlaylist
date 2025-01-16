import { fetchMelonChart } from '@/api/home/actions'
import type { MelonChartSong } from '@/types/melonCharts'
import Top100ChartList from '../_components/Top100ChartList'

export const revalidate = 3600

const koreaTop100 = async () => {
  const koreaTop100Chart = await fetchMelonChart()

  const koreaTop100ChartList = koreaTop100Chart.response.SONGLIST

  const newData: {
    isKoreaChart: true
    list: MelonChartSong[]
  } = {
    isKoreaChart: true,
    list: koreaTop100ChartList,
  }
  return (
    <div>
      <div className="mx-auto max-w-3xl p-4">
        <h1 className="mb-3 text-2xl font-bold">TOP 100</h1>
        <ul>
          {newData.list.map((chart, index) => (
            <Top100ChartList
              isKoreaChart={newData.isKoreaChart}
              musicName={chart.SONGNAME}
              artistName={chart.ARTISTLIST[0].ARTISTNAME}
              albumCover={chart.ALBUMIMG}
              id={index}
              index={index}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default koreaTop100
