'use client'

import moreButton from '@/assets/images/moreButton.svg'
import { MusicSaveBottomSheet } from '@/components/common'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import type { Charts, SpotifyTrack } from '@/types/billboradCharts'
import Image from 'next/image'
import { useState } from 'react'

type Top100ChartListProps = {
  top100Chart: Charts[]
}

const Top100ChartList = ({ top100Chart }: Top100ChartListProps) => {
  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()
  const { upsertMusic } = usePlaylistMusicUpsert()
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)
  const [selectedSong, setSelectedSong] = useState<Charts>()

  const handlePlayBtn = async (newMusicData: SpotifyTrack) => {
    await upsertMusic(newMusicData)
    if (!isPlayerOpen) setPlayerOpen()
    setTrackIds(newMusicData.id)
    play()
  }

  const handleMoreButtonClick = (song: Charts) => {
    setSelectedSong(song)
    setIsBottomSheetOpen(true)
  }

  return (
    <>
      <ul className="w-full space-y-2">
        {top100Chart.map((chart, index) => (
          <li
            className="flex flex-row items-center transition-shadow"
            key={chart.spotify_id}
          >
            <div
              className="flex w-full cursor-pointer items-center space-x-2 py-2 pr-2 transition-colors"
              onClick={() =>
                handlePlayBtn({
                  id: chart.spotify_id,
                  title: chart.title,
                  artist: chart.artist,
                  playTime: chart.play_time,
                  albumCover: chart.album_cover,
                })
              }
            >
              <p className="title-2">{index + 1}</p>
              <div className="relative flex-shrink-0">
                <Image
                  src={chart.album_cover}
                  alt={chart.title}
                  width={50}
                  height={50}
                  className="mr-4 rounded-md"
                  priority
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium text-gray-900">
                  {chart.title}
                </h3>
                <p className="truncate text-xs text-gray-500">{chart.artist}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleMoreButtonClick(chart)
              }}
            >
              <Image
                src={moreButton}
                alt="More Options"
                width={24}
                height={24}
              />
            </button>
          </li>
        ))}
      </ul>
      {selectedSong && (
        <MusicSaveBottomSheet
          isOpen={isBottomSheetOpen}
          handleClose={() => setIsBottomSheetOpen(false)}
          musicName={selectedSong!.title}
          artistName={selectedSong!.artist}
        />
      )}
    </>
  )
}

export default Top100ChartList
