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
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
      <ul className="w-full space-y-2">
        {newData.list.map((chart, index) => (
          <Top100ChartList
            key={chart.SONGID}
            isKoreaChart={newData.isKoreaChart}
            musicName={chart.SONGNAME}
            artistName={chart.ARTISTLIST[0].ARTISTNAME}
            albumCover={chart.ALBUMIMG}
            index={index}
          />
        ))}
      </ul>
    </div>
  )
}

export default koreaTop100
