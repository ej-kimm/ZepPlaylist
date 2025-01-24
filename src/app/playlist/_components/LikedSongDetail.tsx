'use client'

import { removeLikedSong } from '@/api/like-music/actions'
import imPlay from '@/assets/images/imPlay.svg'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { LikedSong } from '@/types/song'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { FaEllipsisH, FaRandom } from 'react-icons/fa'
import Swal from 'sweetalert2'

type LikedSongsPageProps = {
  initialLikedSongs: LikedSong[]
}

export default function LikedSongsPage({
  initialLikedSongs,
}: LikedSongsPageProps) {
  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()
  const [likedSongs, setLikedSongs] = useState<LikedSong[]>(initialLikedSongs)
  const [showDropdown, setShowDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleDelete = async (likeId: string) => {
    try {
      await removeLikedSong(likeId)
      setLikedSongs((prev) => prev.filter((song) => song.id !== likeId))
      Swal.fire('완료', '좋아요 곡이 삭제되었습니다.', 'success')
    } catch (error) {
      console.error('좋아요 삭제 오류:', error)
      Swal.fire('오류', '좋아요 곡을 삭제하는 중 문제가 발생했습니다.', 'error')
    }
  }

  // 전체 재생
  const handlePlayAll = () => {
    const allTrackIds = likedSongs.map((song) => song.music.spotify_id)
    if (!isPlayerOpen) setPlayerOpen()
    setTrackIds(allTrackIds)
    play()
  }

  // 특정 곡부터
  const handlePlayFromSong = (startIndex: number) => {
    const selectedTrackIds = likedSongs
      .slice(startIndex)
      .map((song) => song.music.spotify_id)
    if (!isPlayerOpen) setPlayerOpen()
    setTrackIds(selectedTrackIds)
    play()
  }

  const handleShufflePlay = () => {
    if (!isPlayerOpen) setPlayerOpen()
    const shuffledTracks = [
      ...likedSongs.map((song) => song.music.spotify_id),
    ].sort(() => Math.random() - 0.5)
    setTrackIds(shuffledTracks)
    play()
  }

  return (
    <div
      className="mx-auto h-full w-full"
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
      }}
    >
      <header className="mb-4 flex items-center justify-between">
        <h1 className="font-pretendard text-xl">좋아요 한 플레이리스트</h1>
        <div className="flex items-center space-x-6">
          <button
            onClick={handleShufflePlay}
            className="flex items-center justify-center"
            style={{
              width: '24px',
              height: '24px',
              background: 'none',
              border: 'none',
              padding: '0',
            }}
          >
            <FaRandom size={24} color="black" />
          </button>

          <button
            onClick={handlePlayAll}
            className="flex items-center justify-center rounded-full"
            style={{
              width: '48px',
              height: '48px',
              padding: '11px',
              borderRadius: '24px',
              background: '#9032E8',
            }}
          >
            <Image
              src={imPlay}
              alt="전체 재생"
              width={24}
              height={24}
              style={{ flexShrink: 0 }}
            />
          </button>
        </div>
      </header>

      <section className="mb-3 mt-0 text-gray-600">
        <p className="font-pretendard text-sm">곡 수: {likedSongs.length}곡</p>
      </section>
      <ul className="space-y-2">
        {likedSongs.map((song, index) => (
          <li
            key={song.id}
            className="flex items-center justify-between"
            style={{
              display: 'flex',
              padding: '8px 0px',
              alignItems: 'center',
              gap: '16px',
              alignSelf: 'stretch',
            }}
          >
            <div
              className="flex items-center space-x-4"
              onClick={() => handlePlayFromSong(index)}
              style={{ flex: 1 }}
            >
              <div
                className="rounded-lg"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  background: `url(${song.music.album_cover}) lightgray 50% / cover no-repeat`,
                }}
              ></div>
              <div>
                <p className="font-pretendard text-lg">{song.music.title}</p>
                <p className="text-sm text-gray-500">{song.music.artist}</p>
              </div>
            </div>
            <div ref={dropdownRef} className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowDropdown((prev) => (prev === song.id ? null : song.id))
                }}
                className="text-xl text-gray-500"
              >
                <FaEllipsisH />
              </button>
              {showDropdown === song.id && (
                <div className="absolute right-0 mt-2 w-24 rounded-lg bg-white shadow-lg">
                  <button
                    onClick={() => handleDelete(song.id)}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
