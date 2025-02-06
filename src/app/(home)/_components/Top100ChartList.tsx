'use client'

import { MusicSaveBottomSheet, MusicSaveModal } from '@/components/common'
import useIsDesktop from '@/hooks/useIsDesktop'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import type { Charts, SpotifyTrack } from '@/types/billboradCharts'
import { useState } from 'react'
import Top100ChartListDesktop from './Top100ChartListDesktop'
import Top100ChartListUI from './Top100ChartListUI'

type Top100ChartListProps = {
  top100Chart: Charts[]
}

const Top100ChartList = ({ top100Chart }: Top100ChartListProps) => {
  const isDesktop = useIsDesktop()
  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()
  const { upsertMusic } = usePlaylistMusicUpsert()
  const [selectedSong, setSelectedSong] = useState<SpotifyTrack>()
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)

  const handleMoreButtonClick = (song: SpotifyTrack) => {
    setSelectedSong(song)
    setIsBottomSheetOpen(true)
  }

  const handlePlayBtn = async (newMusicData: SpotifyTrack) => {
    await upsertMusic(newMusicData)
    if (!isPlayerOpen) setPlayerOpen()
    setTrackIds(newMusicData.id)
    play()
  }

  return (
    <>
      {isDesktop ? (
        <>
          <Top100ChartListDesktop
            top100Chart={top100Chart}
            handlePlayBtn={handlePlayBtn}
            handleMoreButtonClick={handleMoreButtonClick}
          />
          {selectedSong && (
            <MusicSaveModal
              isOpen={isBottomSheetOpen}
              handleClose={() => setIsBottomSheetOpen(false)}
              musicName={selectedSong!.title}
              artistName={selectedSong!.artist}
              musicData={selectedSong}
            />
          )}
        </>
      ) : (
        <>
          <Top100ChartListUI
            top100Chart={top100Chart}
            handlePlayBtn={handlePlayBtn}
            handleMoreButtonClick={handleMoreButtonClick}
          />
          {selectedSong && (
            <MusicSaveBottomSheet
              isOpen={isBottomSheetOpen}
              handleClose={() => setIsBottomSheetOpen(false)}
              musicName={selectedSong!.title}
              artistName={selectedSong!.artist}
              musicData={selectedSong!}
            />
          )}
        </>
      )}
    </>
  )
}

export default Top100ChartList
