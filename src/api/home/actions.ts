'use sever'

import type { BillboradCharts } from '@/types/billboradCharts'
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

    console.log('멜론에러 37')
    if (!res.ok) {
      console.log('멜론에러 39')
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

export const fetchGlobalChart = async (): Promise<BillboradCharts> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getChart } = await require('billboard-top-100')
    console.log('빌보드 에러 55')

    return new Promise((resolve, reject) => {
      getChart((err: Error, chart: BillboradCharts) => {
        if (err) {
          console.log('빌보드 에러 59')
          console.error(err)
          reject(err)
        } else {
          resolve(chart)
        }
      })
    })
  } catch (error) {
    console.error('Error billboard-top-100:', error)
    throw error
  }
}

export const fetchSearchTracks = async (searchParams: string) => {
  const token = await fetchSpotifyToken()

  console.log(typeof searchParams)
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${searchParams}&type=track&limit=50`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
    if (!res.ok) {
      console.error(`API error: ${res.status} ${res.statusText}`)
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`)
    }
    const data: SpotifyApi.TrackSearchResponse = await res.json()

    return data
  } catch (error) {
    console.error('Fetch error:', error)
    throw new Error('An unexpected error occurred')
  }
}
