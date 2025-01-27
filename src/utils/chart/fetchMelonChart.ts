import type { melonCharts } from '@/types/melonCharts'

export const fetchAndCleanMelonChart = async () => {
  try {
    const response = await fetch(
      'https://m2.melon.com/m6/chart/ent/songChartList.json',
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const melonChartData: melonCharts = await response.json()
    if (!melonChartData) {
      console.error('No chart data')
    }

    const melonChartList = melonChartData.response.SONGLIST

    const cleanedMelonChart = melonChartList.map((item) => ({
      songName: item.SONGNAME.replace(/\s*\(.*?\)\s*/g, '').trim(),
      artistName: item.ARTISTLIST[0].ARTISTNAME.replace(
        /\s*\(.*?\)\s*/g,
        '',
      ).trim(),
    }))

    return cleanedMelonChart
  } catch (error) {
    console.error('Error fetching Melon chart:')
  }
}
