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
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [musicDetail, setMusicDetail] = useState<Tables<'music'>>()

  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  const playNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % trackIds.length
    setCurrentTrackIndex(nextIndex)
  }

  const playPreviousTrack = () => {
    const prevIndex =
      (currentTrackIndex - 1 + trackIds.length) % trackIds.length
    setCurrentTrackIndex(prevIndex)
  }

  useEffect(() => {
    const fetchTrackUrl = async () => {
      const trackUrl = await fetchPreviewUrl(trackIds[currentTrackIndex])
      setUrl(trackUrl)

      const musicDetail = await fetchMusicDetailByMusicId(
        trackIds[currentTrackIndex],
      )
      setMusicDetail(musicDetail)
    }

    fetchTrackUrl()
  }, [currentTrackIndex])

  return {
    musicDetail,
    url,
    isPlaying,
    togglePlay,
    playNextTrack,
    playPreviousTrack,
  }
}

export default usePlayer
