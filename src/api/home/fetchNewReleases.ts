'use sever'

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
      return { error: 'Failed to fetch data', status: res.status }
    }
    const data = await res.json()

    return data
  } catch (error) {
    console.error('Fetch error:', error)
    return { error: 'An unexpected error occurred' }
  }
}
