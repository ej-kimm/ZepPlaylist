import { fetchBillboardChart } from '@/api/home/actions'
import type { Charts } from '@/types/billboradCharts'
import clsx from 'clsx'
import MusicChartHeader from '../_components/MusicChartHeader'
import Top100ChartList from '../_components/Top100ChartList'

const billboardTop100 = async () => {
  const billboardTop100Chart = await fetchBillboardChart()

  const newData: {
    isKoreaChart: false
    list: Charts[]
  } = {
    isKoreaChart: false,
    list: billboardTop100Chart!,
  }
  return (
    <div
      className={clsx(
        'mx-auto flex w-full max-w-3xl flex-col items-center',
        'desktop:max-w-[1200px]',
      )}
    >
      <MusicChartHeader
        top100ChartMusic={billboardTop100Chart!}
        isKoreaChart={newData.isKoreaChart}
      />
      <Top100ChartList top100Chart={billboardTop100Chart!} />
    </div>
  )
}

export default billboardTop100
