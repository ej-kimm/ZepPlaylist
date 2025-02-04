'use client'

import heart from '@/assets/images/heart.svg'
import playButton from '@/assets/images/playButton.svg'
import TableList from '@/components/common/Tableilst'
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

      <TableList
        items={likedSongs.map((song) => ({
          spotify_id: song.music.spotify_id,
          title: song.music.title,
          artist: song.music.artist,
          album_cover: song.music.album_cover || null,
          album_name: song.music.album_name || '앨범 제목 없음',
          play_time: song.music.play_time ?? 0,
        }))}
        handleItemClick={handlePlayFromSong}
        renderAction={(song) => (
          <button
            onClick={() => handleDelete(song.spotify_id)}
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
        )}
      />
    </div>
  )
}
