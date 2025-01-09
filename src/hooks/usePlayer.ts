'use client'
import { fetchPreviewUrl } from '@/api/spotifyToken'
import { useEffect, useState } from 'react'

const usePlayer = (trackIds: string[]) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0)
  const [url, setUrl] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

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
    }

    fetchTrackUrl()
  }, [currentTrackIndex])

  return { url, isPlaying, togglePlay, playNextTrack, playPreviousTrack }
}

export default usePlayer
