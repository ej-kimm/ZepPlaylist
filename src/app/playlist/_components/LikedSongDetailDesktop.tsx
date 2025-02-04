'use client'

import heart from '@/assets/images/heart.svg'
import imPlay from '@/assets/images/imPlay.svg'
import { LikedSong } from '@/types/song'
import Image from 'next/image'
import { useState } from 'react'
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
  const [selectedSongs, setSelectedSongs] = useState<string[]>([])

  // 전체 선택 체크박스 핸들러
  const handleSelectAll = () => {
    if (selectedSongs.length === likedSongs.length) {
      setSelectedSongs([]) // 전체 해제
    } else {
      setSelectedSongs(likedSongs.map((song) => song.id)) // 전체 선택
    }
  }

  // 개별 체크박스 핸들러
  const handleSelectSong = (id: string) => {
    setSelectedSongs((prev) =>
      prev.includes(id)
        ? prev.filter((songId) => songId !== id)
        : [...prev, id],
    )
  }

  // 재생시간 계산 (밀리초 → 초 변환 후 분 단위로 변환)
  const totalPlayTimeSeconds = likedSongs.reduce(
    (acc, song) =>
      acc + (song.music.play_time ? song.music.play_time / 1000 : 0),
    0,
  )
  const totalPlayTimeMinutes = Math.floor(totalPlayTimeSeconds / 60) + '분'

  return (
    <div className="mx-auto w-full bg-white">
      {/* 헤더 */}
      <header className="mb-6 text-black">
        <h1 className="title-3 ml-[24px]">내가 좋아요 한 목록 플레이리스트</h1>
      </header>

      {/* 컨트롤 바 */}
      <section className="ml-[47px] flex items-center gap-[40px]">
        {/* 전체 선택 체크박스 */}
        <input
          type="checkbox"
          className="h-5 w-5 rounded-md border border-gray-400 checked:border-transparent checked:bg-primary"
          checked={selectedSongs.length === likedSongs.length}
          onChange={handleSelectAll}
        />

        {/* 전체 재생 버튼 + imPlay 아이콘 */}
        <button onClick={handlePlayAll} className="flex items-center gap-2">
          <Image src={imPlay} alt="전체 재생" width={24} height={24} />
          <span className="caption-1">전체 재생</span>
        </button>

        {/* 랜덤 재생 */}
        <button onClick={handleShufflePlay} className="flex items-center gap-2">
          <FaRandom />
          <span className="caption-1">랜덤 재생</span>
        </button>

        {/* 재생 시간 및 곡 수 */}
        <p className="caption-1 ml-[60px]">재생시간: {totalPlayTimeMinutes}</p>
        <p className="caption-1">곡 수: {likedSongs.length}곡</p>
      </section>

      {/* 테이블 헤더 */}
      <section className="mt-8 grid w-full grid-cols-[24px_52px_3fr_2fr_2fr_24px] items-center text-center">
        <p className="caption-1 text-left"> </p>
        <p className="caption-1 text-left"> </p>
        <p className="caption-1">제목</p>
        <p className="caption-1">아티스트</p>
        <p className="caption-1">앨범제목</p>
        <p className="caption-1"> </p>
      </section>

      {/* 노래 리스트 */}
      <ul className="mt-2 flex flex-col">
        {likedSongs.map((song, index) => (
          <li
            key={song.id}
            className="grid w-full grid-cols-[24px_52px_3fr_2fr_2fr_24px] items-center py-2"
          >
            {/* 개별 체크박스 (21px 간격 조정) */}
            <input
              type="checkbox"
              className="h-5 w-5 rounded-md border border-gray-400 checked:border-transparent checked:bg-primary"
              checked={selectedSongs.includes(song.id)}
              onChange={() => handleSelectSong(song.id)}
            />

            {/* 앨범 커버 (체크박스와 21px 간격 유지) */}
            <div className="ml-[21px] h-[52px] w-[52px] overflow-hidden rounded-lg bg-[#D9D9D9]">
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

            {/* 제목 */}
            <div
              className="cursor-pointer truncate text-center"
              onClick={() => handlePlayFromSong(index)}
            >
              <h3 className="caption-1">{song.music.title}</h3>
            </div>

            {/* 아티스트 */}
            <p className="caption-1 truncate text-center">
              {song.music.artist}
            </p>

            {/* 앨범 제목 */}
            <p className="caption-1 truncate text-center">
              {song.music.album_title || '앨범 제목 없음'}
            </p>

            {/* 좋아요 버튼 (보라색 아이콘 적용 + 크기 축소) */}
            <button
              onClick={() => handleDelete(song.id)}
              className="flex h-[20px] w-[20px] items-center justify-center rounded-full border border-primary bg-white"
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
