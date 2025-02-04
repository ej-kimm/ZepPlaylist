'use client'

import moreButton from '@/assets/images/moreButton.svg'
import { MusicSaveModal } from '@/components/common'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import type { Charts, SpotifyTrack } from '@/types/billboradCharts'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import Top100ChartDesktopHeader from './Top100ChartDesktopHeader'

type Top100ChartListProps = {
  top100Chart: Charts[]
}

const Top100ChartList = ({ top100Chart }: Top100ChartListProps) => {
  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()
  const { upsertMusic } = usePlaylistMusicUpsert()
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)
  const [selectedSong, setSelectedSong] = useState<Charts>()
  // const isDesktop = useIsDesktop()

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
      <Top100ChartDesktopHeader />
      <ul className="flex w-full flex-col gap-2 space-y-2 pt-1">
        {top100Chart.map((chart, index) => (
          <li
            className="flex flex-row items-center gap-2 transition-shadow"
            key={chart.spotify_id}
          >
            <div
              className="items-centerspace-x-2 flex w-full cursor-pointer gap-2 transition-colors"
              onClick={() =>
                handlePlayBtn({
                  id: chart.spotify_id,
                  title: chart.title,
                  artist: chart.artist,
                  playTime: chart.play_time,
                  albumCover: chart.album_cover,
                  albumName: chart.album_name,
                })
              }
            >
              <p className="title-2 flex w-8 items-center">{index + 1}</p>
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
                className={clsx('block desktop:hidden')}
              />
            </button>
          </li>
        ))}
      </ul>
      {
        selectedSong && (
          // (isDesktop ? (
          <MusicSaveModal
            isOpen={isBottomSheetOpen}
            handleClose={() => setIsBottomSheetOpen(false)}
            musicName={selectedSong!.title}
            artistName={selectedSong!.artist}
          />
        )
        // ) : (
        //   <MusicSaveBottomSheet
        //     isOpen={isBottomSheetOpen}
        //     handleClose={() => setIsBottomSheetOpen(false)}
        //     musicName={selectedSong!.title}
        //     artistName={selectedSong!.artist}
        //   />
        // ))
      }
    </>
  )
}

export default Top100ChartList
