import { fetchGlobalChart } from '@/api/home/actions'
import Top100ChartList from '../_components/Top100ChartList'

export const revalidate = 3600

const BillboardTop100 = async () => {
  const billboardTop100Chart = await fetchGlobalChart()
  const billboardTop100ChartList = billboardTop100Chart.songs
  console.log(billboardTop100ChartList)

  return (
    <div>
      <Top100ChartList billboardTop100ChartList={billboardTop100ChartList} />
    </div>
  )
}

export default BillboardTop100
