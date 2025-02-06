'use client'

import moreButton from '@/assets/images/moreButton.svg'
import type { Charts, SpotifyTrack } from '@/types/billboradCharts'
import clsx from 'clsx'
import Image from 'next/image'

type Top100ChartListProps = {
  top100Chart: Charts[]
  handlePlayBtn: (newMusicData: SpotifyTrack) => Promise<void>
  handleMoreButtonClick: (song: SpotifyTrack) => void
}

const Top100ChartListUI = ({
  top100Chart,
  handlePlayBtn,
  handleMoreButtonClick,
}: Top100ChartListProps) => {
  return (
    <>
      <ul className="flex w-full flex-col gap-2 space-y-2 pt-1">
        {top100Chart.map((chart, index) => (
          <li
            className="flex flex-row items-center transition-shadow"
            key={chart.spotify_id}
          >
            <div
              className="flex w-full cursor-pointer items-center gap-2 transition-colors"
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
              <p className="title-2 min-w-[24px]">{index + 1}</p>
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

              <div className="min-w-0 flex-row">
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
                handleMoreButtonClick({
                  id: chart.spotify_id,
                  title: chart.title,
                  artist: chart.artist,
                  playTime: chart.play_time,
                  albumCover: chart.album_cover,
                  albumName: chart.album_name,
                })
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
    </>
  )
}

export default Top100ChartListUI
