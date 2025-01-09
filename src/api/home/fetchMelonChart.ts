'use server'

import type { melonCharts } from '@/types/melonCharts'

export const fetchMelonChart = async () => {
  try {
    const res = await fetch(
      'https://m2.melon.com/m6/chart/ent/songChartList.json',
    )

    if (!res.ok) {
      console.error(`API error: ${res.status} ${res.statusText}`)
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`)
    }

    const data: melonCharts = await res.json()
    return data
  } catch (error) {
    console.error('Fetch error:', error)
    throw new Error('An unexpected error occurred')
  }
}
