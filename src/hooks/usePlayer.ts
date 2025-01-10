'use client'
import { fetchPreviewUrl } from '@/api/spotifyToken'
import { fetchMusicDetailByMusicId } from '@/api/supabase'
import type { Tables } from '@/types/supabase'
import { useEffect, useState } from 'react'

type usePlayerProps =
  | Tables<'music'>['spotify_id']
  | Tables<'music'>['spotify_id'][]

const usePlayer = (trackId: usePlayerProps) => {
  const trackIds = Array.isArray(trackId) ? trackId : [trackId]
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0)
  const [url, setUrl] = useState<string>('')
  const [musicDetail, setMusicDetail] = useState<Tables<'music'>>()

  useEffect(() => {
    const fetchTrackUrl = async () => {
      const [trackUrl, musicDetail] = await Promise.all([
        fetchPreviewUrl(trackIds[currentTrackIndex]),
        fetchMusicDetailByMusicId(trackIds[currentTrackIndex]),
      ])
      setUrl(trackUrl)
      setMusicDetail(musicDetail)
    }

    fetchTrackUrl()
  }, [currentTrackIndex])

  // const playerQueries = useQueries({
  //   queries: trackIds.map((trackId) => ({
  //     queryKey: ['music', trackId],
  //     queryFn: async () => {
  //       const [trackUrl, musicDetail] = await Promise.all([
  //         fetchPreviewUrl(trackId),
  //         fetchMusicDetailByMusicId(trackId),
  //       ])
  //       return { trackUrl, musicDetail }
  //     },
  //   })),
  // })
  // const isPending = playerQueries.some(
  //   (playerQuery) => playerQuery.isLoading || playerQuery.isFetching,
  // )
  // const currentTrackData = playerQueries[currentTrackIndex]?.data

  const playNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % trackIds.length
    setCurrentTrackIndex(nextIndex)
  }

  const playPreviousTrack = () => {
    const prevIndex =
      (currentTrackIndex - 1 + trackIds.length) % trackIds.length
    setCurrentTrackIndex(prevIndex)
  }

  return {
    // musicDetail: currentTrackData?.musicDetail,
    // url: currentTrackData?.trackUrl,
    // isPending,
    musicDetail,
    url,
    playNextTrack,
    playPreviousTrack,
  }
}

export default usePlayer
