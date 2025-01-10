'use sever'

import type { melonCharts } from '@/types/melonCharts'
import { fetchSpotifyToken } from '../spotifyToken'

export const fetchNewReleases = async () => {
  const token = await fetchSpotifyToken()

  try {
    const res = await fetch('https://api.spotify.com/v1/browse/new-releases', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    if (!res.ok) {
      console.error(`API error: ${res.status} ${res.statusText}`)
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`)
    }
    const data: SpotifyApi.ListOfNewReleasesResponse = await res.json()

    return data
  } catch (error) {
    console.error('Fetch error:', error)
    throw new Error('An unexpected error occurred')
  }
}

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

export const fetchGlobalChart = async () => {
  const { getChart } = await require('billboard-top-100')
  return getChart
}
