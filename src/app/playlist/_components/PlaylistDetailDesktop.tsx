'use client'

import Bean from '@/assets/images/Bin.svg'
import playButton from '@/assets/images/playButton.svg'
import TableList from '@/components/common/Tableilst'
import { PlaylistDetails } from '@/types/song'
import { differenceInDays, isToday } from 'date-fns'
import Image from 'next/image'
import { FaRandom } from 'react-icons/fa'

type PlaylistDetailDesktopProps = {
  playlistDetails: PlaylistDetails
  handlePlayAll: () => void
  handleShufflePlay: () => void
  handlePlayFromIndex: (index: number) => void
  handleDeleteSong: (songId: string) => void
}

export default function PlaylistDetailDesktop({
  playlistDetails,
  handlePlayAll,
  handleShufflePlay,
  handlePlayFromIndex,
  handleDeleteSong,
}: PlaylistDetailDesktopProps) {
  const {
    name,
    description,
    song_count,
    total_play_time,
    last_updated,
    songs,
  } = playlistDetails

  const latestCovers = songs
    .slice(0, 4)
    .map((song) => song.album_cover || '/default-cover.jpg')

  return (
    <div className="mx-auto w-full bg-white px-[24px]">
      <h1 className="title-3 mb-[50px] text-4xl text-black">플레이리스트</h1>

      <section className="flex w-full items-start gap-6">
        <div className="flex flex-shrink-0 items-start">
          {latestCovers.length <= 3 ? (
            <div className="h-[212px] w-[212px] overflow-hidden rounded-lg bg-[#D9D9D9]">
              <Image
                src={latestCovers[0]}
                alt="대표 앨범 커버"
                width={212}
                height={212}
                className="rounded-lg object-cover"
              />
            </div>
          ) : (
            <div className="flex w-[212px] flex-wrap items-start gap-[8px]">
              {latestCovers.map((cover, index) => (
                <div
                  key={index}
                  className="h-[102px] w-[102px] overflow-hidden rounded-lg bg-[#D9D9D9]"
                >
                  <Image
                    src={cover}
                    alt={`앨범 커버 ${index + 1}`}
                    width={102}
                    height={102}
                    className="rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col justify-center">
          <h2 className="font-pretendard text-3xl text-black">{name}</h2>
          <p className="text-lg text-[#1B1B1B]">
            {description || '설명이 없습니다.'}
          </p>

          <div className="mt-4 text-sm text-[#7D7D7D]">
            <p>곡 수: {song_count}곡</p>
            <p>재생시간: {total_play_time}</p>
            <p>
              업데이트 날:{' '}
              {last_updated
                ? isToday(new Date(last_updated))
                  ? '오늘'
                  : `${differenceInDays(new Date(), new Date(last_updated))}일 전`
                : '업데이트 없음'}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 flex w-full items-center gap-[26px]">
        <button onClick={handlePlayAll} className="flex items-center gap-2">
          <Image
            src={playButton}
            alt="전체 재생"
            width={24}
            height={24}
            className="text-black"
          />
          <span className="caption-1">전체 재생</span>
        </button>

        <button onClick={handleShufflePlay} className="flex items-center gap-2">
          <FaRandom />
          <span className="caption-1">랜덤 재생</span>
        </button>
      </section>

      <TableList
        items={songs}
        handleItemClick={(index) => handlePlayFromIndex(index)}
        renderAction={(song) => (
          <button
            onClick={() => handleDeleteSong(song.spotify_id)}
            className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-primary bg-white"
          >
            <Image
              src={Bean}
              alt="삭제"
              width={16}
              height={16}
              className="h-4 w-4 text-primary"
            />
          </button>
        )}
      />
    </div>
  )
}
