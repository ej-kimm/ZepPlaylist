'use client'

import { removeLikedSong } from '@/api/like-music/actions'
import { Modal } from '@/components/common'
import useIsDesktop from '@/hooks/useIsDesktop'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { LikedSong } from '@/types/song'
import { useEffect, useRef, useState } from 'react'
import LikedSongsDetailDesktop from './LikedSongDetailDesktop'
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
  const [modalProps, setModalProps] = useState({
    isOpen: false,
    title: '',
    content: '',
    type: 'single' as 'single' | 'vertical' | 'horizontal',
    onConfirm: () => {},
    onCancel: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
  })
  const isDesktop = useIsDesktop()

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

  const handleDelete = (likeId: string) => {
    setModalProps({
      isOpen: true,
      title: '좋아요 해제',
      content: '정말 좋아요를 해제하시겠습니까?',
      type: 'vertical',
      onConfirm: async () => {
        try {
          await removeLikedSong(likeId)
          setLikedSongs((prev) => prev.filter((song) => song.id !== likeId))
          setModalProps({
            isOpen: true,
            title: '완료',
            content: '좋아요가 해제되었습니다!',
            type: 'single',
            onConfirm: () =>
              setModalProps((prev) => ({ ...prev, isOpen: false })),
            onCancel: () => {},
          })
        } catch (error) {
          console.error('좋아요 삭제 오류:', error)
          setModalProps({
            isOpen: true,
            title: '오류',
            content: '좋아요를 해제하는 과정에서 오류가 발생했습니다.',
            type: 'single',
            onConfirm: () =>
              setModalProps((prev) => ({ ...prev, isOpen: false })),
            onCancel: () => {},
          })
        }
      },
      onCancel: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
    })
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
    <>
      {isDesktop ? (
        <LikedSongsDetailDesktop
          likedSongs={likedSongs}
          handlePlayAll={handlePlayAll}
          handleShufflePlay={handleShufflePlay}
          handlePlayFromSong={handlePlayFromSong}
          handleDelete={handleDelete}
        />
      ) : (
        <LikedSongsDetailUI
          likedSongs={likedSongs}
          handlePlayAll={handlePlayAll}
          handleShufflePlay={handleShufflePlay}
          handlePlayFromSong={handlePlayFromSong}
          showDropdown={showDropdown}
          toggleDropdown={toggleDropdown}
          handleDelete={handleDelete}
        />
      )}
      <Modal
        isOpen={modalProps.isOpen}
        title={modalProps.title}
        content={modalProps.content}
        type={modalProps.type}
        onConfirm={modalProps.onConfirm}
        onCancel={modalProps.onCancel}
      />
    </>
  )
}
