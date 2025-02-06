'use client'

import plusLightButton from '@/assets/images/plusLightButton.svg'
import type { Charts, SpotifyTrack } from '@/types/billboradCharts'
import Image from 'next/image'

type Top100ChartListProps = {
  top100Chart: Charts[]
  handlePlayBtn: (newMusicData: SpotifyTrack) => Promise<void>
  handleMoreButtonClick: (song: SpotifyTrack) => void
}

const Top100ChartListDesktop = ({
  top100Chart,
  handlePlayBtn,
  handleMoreButtonClick,
}: Top100ChartListProps) => {
  return (
    <>
      <div className="w-full">
        <div className="mt-8 flex w-full justify-between border-b border-gray-300 px-[24px] pb-2">
          <p className="caption-1 text-[#636363]">순위</p>
          <p className="caption-1 w-[28%] pl-[60px] text-[#636363]">제목</p>
          <p className="caption-1 w-[30%] text-[#636363]">아티스트</p>
          <p className="caption-1 w-[30%] text-[#636363]">앨범제목</p>

          {/* 버튼 크기 */}
          <p className="w-[36px]"></p>
        </div>

        <ul className="mt-2 flex w-full flex-col">
          {top100Chart.map((item, index) => (
            <li
              key={item.spotify_id}
              className="flex w-full items-center justify-between px-[24px] py-[4px]"
            >
              <div className="title-2 min-w-[40px]">{index + 1}</div>
              <div className="flex w-[30%] items-center gap-[21px]">
                <div className="h-[52px] w-[52px] flex-shrink-0 overflow-hidden rounded-lg bg-[#D9D9D9]">
                  {item.album_cover && (
                    <Image
                      src={item.album_cover}
                      alt={item.title}
                      width={52}
                      height={52}
                      className="rounded-lg"
                    />
                  )}
                </div>

                <div
                  className="cursor-pointer truncate text-left"
                  onClick={() =>
                    handlePlayBtn({
                      id: item.spotify_id,
                      title: item.title,
                      artist: item.artist,
                      playTime: item.play_time,
                      albumCover: item.album_cover,
                      albumName: item.album_name,
                    })
                  }
                >
                  <h3 className="caption-1">{item.title}</h3>
                </div>
              </div>

              <p className="caption-1 w-[30%] truncate">{item.artist}</p>

              <p className="caption-1 w-[30%] truncate">
                {item.album_name ? item.album_name : '앨범 제목 없음'}
              </p>
              <button
                type="button"
                className="flex h-[36px] w-[36px] items-center justify-center rounded-full border-secondary-opacity bg-secondary-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  handleMoreButtonClick({
                    id: item.spotify_id,
                    title: item.title,
                    artist: item.artist,
                    playTime: item.play_time,
                    albumCover: item.album_cover,
                    albumName: item.album_name,
                  })
                }}
              >
                <Image
                  src={plusLightButton}
                  alt="More Options"
                  width={24}
                  height={24}
                  className="h-4 w-4 text-primary"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Top100ChartListDesktop
