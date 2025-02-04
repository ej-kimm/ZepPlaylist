'use client'
import useIsDesktop from '@/hooks/useIsDesktop'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { userStore } from '@/store/userSlice'
import type { Tables } from '@/types/supabase'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import HistoryListDesktop from './HistoryListDesktop'
import HistoryListHeader from './HistoryListHeader'
import HistoryListUI from './HistoryListUI'

const HistoryList = () => {
  const { user } = userStore()
  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()

  const [historyTracks, setHistoryTracks] = useState<Tables<'music'>[]>([])
  const isDesktop = useIsDesktop()

  const totalPlayTime = historyTracks.reduce(
    (acc, track) => acc + track.play_time!,
    0,
  )
  const totalTime = Math.floor(totalPlayTime / 60000)

  const handlePlayFromIndex = (index: number) => {
    if (!isPlayerOpen) setPlayerOpen()
    const trackIdsFromIndex = historyTracks
      .slice(index)
      .map((song) => song.spotify_id)
    setTrackIds(trackIdsFromIndex)
    play()
  }
  const handleDeleteSong = (songId: string) => {
    const updatedTracks = historyTracks.filter(
      (track) => track.spotify_id !== songId,
    )
    localStorage.setItem(
      `${user?.id}-history-playlist`,
      JSON.stringify(updatedTracks),
    )
    setHistoryTracks(updatedTracks)
  }

  useEffect(() => {
    const storedTracks = JSON.parse(
      localStorage.getItem(`${user?.id}-history-playlist`) || '[]',
    )
    setHistoryTracks(storedTracks)
  }, [user?.id])

  return (
    <section className={clsx('my-3')}>
      <div className={clsx('flex flex-col gap-3')}>
        <HistoryListHeader
          historyTracks={historyTracks}
          totalTime={totalTime}
        />
        {isDesktop ? (
          <HistoryListDesktop
            historyTracks={historyTracks}
            handlePlayFromIndex={handlePlayFromIndex}
            handleDeleteSong={handleDeleteSong}
          />
        ) : (
          <HistoryListUI
            historyTracks={historyTracks}
            handlePlayFromIndex={handlePlayFromIndex}
            handleDeleteSong={handleDeleteSong}
          />
        )}
      </div>
    </section>
  )
}

export default HistoryList
