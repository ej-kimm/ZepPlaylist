'use sever'

import type { BillboardCharts } from '@/types/billboradCharts'
import type { melonCharts } from '@/types/melonCharts'
import { supabase } from '@/utils/supabase/client'
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

export const fetchGlobalChart = async (): Promise<BillboardCharts> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getChart } = await require('billboard-top-100')

    return new Promise((resolve, reject) => {
      getChart((err: Error, chart: BillboardCharts) => {
        if (err) {
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

export const fetchSearchArtist = async (searchParams: string) => {
  const token = await fetchSpotifyToken()

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${searchParams}&type=artist&limit=1`,
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
    const data: SpotifyApi.ArtistSearchResponse = await res.json()

    return data
  } catch (error) {
    console.error('Fetch error:', error)
    throw new Error('An unexpected error occurred')
  }
}

export const fetchAlbums = async (albumId: string) => {
  const token = await fetchSpotifyToken()

  try {
    const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    if (!res.ok) {
      console.error(`API error: ${res.status} ${res.statusText}`)
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`)
    }
    const data: SpotifyApi.SingleAlbumResponse = await res.json()

    return data
  } catch (error) {
    console.error('Fetch error:', error)
    throw new Error('An unexpected error occurred')
  }
}

export const fetchKoreanChart = async () => {
  const { data: koreanChart, error: koreanChartError } = await supabase
    .from('korean_chart')
    .select('*')

  if (koreanChartError) {
    console.error('Error geting data:', koreanChartError)
  }

  return koreanChart
}

export const fetchBillboardChart = async () => {
  const { data: billboardChart, error: billboardChartError } = await supabase
    .from('billboard_chart')
    .select('*')

  if (billboardChart) {
    console.error('Error geting data:', billboardChartError)
  }

  return billboardChart
}
