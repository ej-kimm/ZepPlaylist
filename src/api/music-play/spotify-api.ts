'use server'

import { fetchSpotifyToken } from '../spotifyToken'

export const fetchTrack = async (id: string) => {
  const token = await fetchSpotifyToken()
  try {
    const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Error fetching track: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error in fetchTrack:', error)
    return null
  }
}

export const fetchGenre = async (id: string) => {
  const token = await fetchSpotifyToken()
  try {
    const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Error fetching artists: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error in fetchGenre:', error)
    return null
  }
}
