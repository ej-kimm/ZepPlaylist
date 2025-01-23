import { fetchMelonChart } from '@/api/home/actions'
import type { MelonChartSong } from '@/types/melonCharts'
import MusicChartHeader from '../_components/MusicChartHeader'
import Top100ChartList from '../_components/Top100ChartList'

export const revalidate = 3600

const koreaTop100 = async () => {
  const koreaTop100Chart = await fetchMelonChart()

  const koreaTop100ChartList = koreaTop100Chart.response.SONGLIST

  const top100ChartMusic = koreaTop100ChartList.map((item) => {
    return {
      songName: item.SONGNAME.replace(/\s*\(.*?\)\s*/g, '').trim(),
      artistName: item.ARTISTLIST[0].ARTISTNAME.replace(
        /\s*\(.*?\)\s*/g,
        '',
      ).trim(),
      albumCover: item.ALBUMIMG,
    }
  })

  const newData: {
    isKoreaChart: true
    list: MelonChartSong[]
  } = {
    isKoreaChart: true,
    list: koreaTop100ChartList,
  }
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
      <MusicChartHeader
        top100ChartMusic={top100ChartMusic}
        isKoreaChart={newData.isKoreaChart}
      />
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
