'use client'

import heart from '@/assets/images/heart.svg'
import playButton from '@/assets/images/playButton.svg'
import { LikedSong } from '@/types/song'
import Image from 'next/image'
import { FaRandom } from 'react-icons/fa'

type LikedSongsDetailDesktopProps = {
  likedSongs: LikedSong[]
  handlePlayAll: () => void
  handleShufflePlay: () => void
  handlePlayFromSong: (index: number) => void
  handleDelete: (id: string) => void
}

export default function LikedSongsDetailDesktop({
  likedSongs,
  handlePlayAll,
  handleShufflePlay,
  handlePlayFromSong,
  handleDelete,
}: LikedSongsDetailDesktopProps) {
  const totalPlayTimeSeconds = likedSongs.reduce(
    (acc, song) =>
      acc + (song.music.play_time ? song.music.play_time / 1000 : 0),
    0,
  )
  const totalPlayTimeMinutes = Math.floor(totalPlayTimeSeconds / 60) + '분'

  return (
    <div className="mx-auto w-full bg-white">
      <header className="mb-6 w-full px-[24px] text-black">
        <h1 className="title-3">내가 좋아요 한 목록 플레이리스트</h1>
      </header>

      <section className="flex w-full items-center gap-[26px] px-[24px]">
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

        <p className="caption-1 ml-[40px]">재생시간: {totalPlayTimeMinutes}</p>
        <p className="caption-1">곡 수: {likedSongs.length}곡</p>
      </section>

      <div className="mt-8 flex w-full justify-between border-b border-gray-300 px-[24px] pb-2">
        <p className="caption-1 w-[30%] pl-[73px]">제목</p>
        <p className="caption-1 w-[30%]">아티스트</p>
        <p className="caption-1 w-[30%]">앨범제목</p>
        <p className="w-[36px]"></p>
      </div>

      <ul className="mt-2 flex w-full flex-col">
        {likedSongs.map((song, index) => (
          <li
            key={song.id}
            className="flex w-full items-center justify-between px-[24px] py-[4px]"
          >
            <div className="flex w-[30%] items-center gap-[21px]">
              <div className="h-[52px] w-[52px] overflow-hidden rounded-lg bg-[#D9D9D9]">
                {song.music.album_cover && (
                  <Image
                    src={song.music.album_cover}
                    alt={song.music.title}
                    width={52}
                    height={52}
                    className="rounded-lg"
                  />
                )}
              </div>

              <div
                className="cursor-pointer truncate text-left"
                onClick={() => handlePlayFromSong(index)}
              >
                <h3 className="caption-1">{song.music.title}</h3>
              </div>
            </div>

            <p className="caption-1 w-[30%] truncate">{song.music.artist}</p>

            <p className="caption-1 w-[30%] truncate">앨범 제목 없음</p>

            <button
              onClick={() => handleDelete(song.id)}
              className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-primary bg-white"
            >
              <Image
                src={heart}
                alt="좋아요"
                width={16}
                height={16}
                className="h-4 w-4 text-primary"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
