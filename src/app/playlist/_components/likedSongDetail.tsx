'use client'

import { removeLikedSong } from '@/api/like-music/actions'
import Implay3 from '@/assets/images/Implay3.svg'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore' // 플레이어 상태 관리
import { LikedSong } from '@/types/song'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { FaEllipsisH } from 'react-icons/fa'
import Swal from 'sweetalert2'

type LikedSongsPageProps = {
  initialLikedSongs: LikedSong[] // SSR에서 전달받는 초기 데이터
}

export default function LikedSongsPage({
  initialLikedSongs,
}: LikedSongsPageProps) {
  const { isPlayerOpen, setTrackIds, togglePlay, setPlayerOpen } =
    useMusicPlayerStore() // 플레이어 상태 연결
  const [likedSongs, setLikedSongs] = useState<LikedSong[]>(initialLikedSongs) // 좋아요 리스트 데이터
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
    togglePlay()
  }

  // 특정 곡부터
  const handlePlayFromSong = (startIndex: number) => {
    const selectedTrackIds = likedSongs
      .slice(startIndex)
      .map((song) => song.music.spotify_id)
    if (!isPlayerOpen) setPlayerOpen()
    setTrackIds(selectedTrackIds)
    togglePlay()
  }

  return (
    <div
      className="mx-auto h-[812px] w-[375px] p-4"
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
      }}
    >
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">좋아요 한 플레이리스트</h1>
        <button
          onClick={handlePlayAll}
          className="relative flex h-12 w-12 items-center justify-center rounded-full bg-purple-500"
        >
          <Image src={Implay3} alt="전체 재생" width={24} height={24} />
        </button>
      </header>
      <ul className="space-y-2">
        {likedSongs.map((song, index) => (
          <li
            key={song.id}
            className="flex items-center justify-between rounded-lg border bg-white shadow-sm"
            style={{
              display: 'flex',
              padding: '8px 24px',
              alignItems: 'center',
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
                <p className="text-lg font-semibold">{song.music.title}</p>
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
                style={{ marginLeft: '16px' }}
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
