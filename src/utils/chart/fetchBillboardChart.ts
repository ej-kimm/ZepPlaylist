import type { BillboardCharts, BillboardSong } from '@/types/billboradCharts'

export const fetchBillboardChart = async (): Promise<BillboardSong[]> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getChart } = await require('billboard-top-100')

    return new Promise((resolve, reject) => {
      getChart((err: Error, chart: BillboardCharts) => {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          resolve(chart.songs)
        }
      })
    })
  } catch (error) {
    console.error('Error billboard-top-100:', error)
    throw error
  }
}
