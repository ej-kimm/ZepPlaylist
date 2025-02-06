'use client'

import { MusicSaveBottomSheet } from '@/components/common'
import useIsDesktop from '@/hooks/useIsDesktop'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import type { SpotifyTrack } from '@/types/billboradCharts'
import { useState } from 'react'
import LatestAlbumDetailDesktop from './LatestAlbumDetailDesktop'
import LatestAlbumDetailUI from './LatestAlbumDetailUI'

type LatestAlbumProps = {
  albumData: SpotifyApi.SingleAlbumResponse
}

const LatestAlbumDetail = ({ albumData }: LatestAlbumProps) => {
  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()
  const { upsertMusic } = usePlaylistMusicUpsert()
  const isDesktop = useIsDesktop()

  const [selectedSong, setSelectedSong] = useState<SpotifyTrack>()
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)

  const albumTrackData = albumData.tracks.items
  const albumAllTrackIds = albumTrackData.map((song) => song.id)

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}분 ${seconds.toString().padStart(2, '0')}초`
  }

  const totalPlayTimeMilliseconds = albumTrackData.reduce(
    (total, item) => total + item.duration_ms,
    0,
  )

  const handlePlayAll = () => {
    const musicData = albumTrackData.map((song) => {
      return {
        id: song.id,
        title: song.name,
        artist: song.artists[0].name,
        albumCover: albumData.images[0].url,
        playTime: song.duration_ms,
        albumName: albumData.name,
      }
    })
    musicData.map(async (item) => await upsertMusic(item))

    if (!isPlayerOpen) setPlayerOpen()
    setTrackIds(albumAllTrackIds)
    play()
  }

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
        <LatestAlbumDetailDesktop
          albumData={albumData}
          albumTrackData={albumTrackData}
          handlePlayAll={handlePlayAll}
          formatTime={formatTime}
          totalPlayTimeMilliseconds={totalPlayTimeMilliseconds}
        />
      ) : (
        <>
          <LatestAlbumDetailUI
            albumData={albumData}
            albumTrackData={albumTrackData}
            handlePlayAll={handlePlayAll}
            formatTime={formatTime}
            totalPlayTimeMilliseconds={totalPlayTimeMilliseconds}
            handlePlayBtn={handlePlayBtn}
            handleMoreButtonClick={handleMoreButtonClick}
          />
          {selectedSong && (
            <MusicSaveBottomSheet
              musicName={selectedSong.title}
              artistName={selectedSong.artist}
              isOpen={isBottomSheetOpen}
              handleClose={() => setIsBottomSheetOpen(false)}
              musicData={selectedSong}
            />
          )}
        </>
      )}
    </>
  )
}

export default LatestAlbumDetail
