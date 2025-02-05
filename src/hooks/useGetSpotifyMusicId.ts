import { fetchSpotifyToken } from '@/api/spotifyToken'
import type { SpotifyTrack } from '@/types/billboradCharts'
import { useCallback, useState } from 'react'

export const useSpotifySearch = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchSearchTracks = useCallback(async (searchParams: string) => {
    const token = await fetchSpotifyToken()

    try {
      setIsLoading(true)
      setError(null)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}/search?q=${searchParams}&type=track&limit=10`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      )
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`)
      }
      const data: SpotifyApi.TrackSearchResponse = await res.json()

      return data.tracks.items
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error('An unexpected error occurred'),
      )
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const searchSpotifyId = useCallback(
    async (
      musicName: string,
      artistName: string,
    ): Promise<SpotifyTrack | undefined> => {
      try {
        const data = await fetchSearchTracks(musicName)

        return data
          .map((item) => ({
            id: item.id,
            artist: item.artists[0].name,
            title: item.name,
            playTime: item.duration_ms,
            albumCover: item.album.images[0].url,
          }))
          .find(
            (item) => item.artist === artistName || item.title === musicName,
          )
      } catch (error) {
        setError(
          error instanceof Error
            ? error
            : new Error('An unexpected error occurred'),
        )
        return undefined
      }
    },
    [fetchSearchTracks],
  )

  return { searchSpotifyId, isLoading, error }
}
