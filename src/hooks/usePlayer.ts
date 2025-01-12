'use client'
import { fetchMusicDetailByMusicId } from '@/api/music-play/actions'
import { getSongLyrics } from '@/api/music-play/genius-api'
import { fetchPreviewUrl } from '@/api/spotifyToken'
import type { Tables } from '@/types/supabase'
import { useQueries } from '@tanstack/react-query'
import { useState } from 'react'

type usePlayerProps =
  | Tables<'music'>['spotify_id']
  | Tables<'music'>['spotify_id'][]

const usePlayer = (trackId: usePlayerProps) => {
  const trackIds = Array.isArray(trackId) ? trackId : [trackId]
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0)

  const playerQueries = useQueries({
    queries: trackIds.map((trackId) => ({
      queryKey: ['music', trackId],
      queryFn: async () => {
        const [trackUrl, musicDetail] = await Promise.all([
          fetchPreviewUrl(trackId),
          fetchMusicDetailByMusicId(trackId),
        ])

        // 노래 가사 가져오기
        let lyrics = null
        if (musicDetail) {
          lyrics = await getSongLyrics({
            title: musicDetail.title,
            artist: musicDetail.artist,
          })
        }

        return { trackUrl, musicDetail, lyrics }
      },
    })),
  })
  const isPending = playerQueries.some(
    (playerQuery) => playerQuery.isLoading || playerQuery.isFetching,
  )
  const currentTrackData = playerQueries[currentTrackIndex]?.data

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
    musicDetail: currentTrackData?.musicDetail,
    url: currentTrackData?.trackUrl,
    lyrics: currentTrackData?.lyrics ?? '',
    isPending,
    playNextTrack,
    playPreviousTrack,
  }
}

export default usePlayer
