import { fetchMelonChart } from '@/api/home/actions'
import Top100ChartList from '../_components/Top100ChartList'

export const revalidate = 3600

const KoreaTop100 = async () => {
  const koreaTop100Chart = await fetchMelonChart()

  const koreaTop100ChartList = koreaTop100Chart.response.SONGLIST
  return (
    <div>
      <Top100ChartList koreaTop100ChartList={koreaTop100ChartList} />
    </div>
  )
}

export default KoreaTop100
