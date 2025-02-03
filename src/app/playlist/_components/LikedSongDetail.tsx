'use client'

import { removeLikedSong } from '@/api/like-music/actions'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { LikedSong } from '@/types/song'
import { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import LikedSongsDetailUI from './LikedSongDetailUI'

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

  const toggleDropdown = (id: string) => {
    setShowDropdown((prev) => (prev === id ? null : id))
  }

  return (
    <LikedSongsDetailUI
      likedSongs={likedSongs}
      handlePlayAll={handlePlayAll}
      handleShufflePlay={handleShufflePlay}
      handlePlayFromSong={handlePlayFromSong}
      showDropdown={showDropdown}
      toggleDropdown={toggleDropdown}
      handleDelete={handleDelete}
    />
  )
}
