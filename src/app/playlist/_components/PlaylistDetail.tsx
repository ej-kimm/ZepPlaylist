'use client'

import {
  deleteSongFromPlaylist,
  fetchPlaylistDetails,
} from '@/api/playlist-detail/actions'
import { Modal } from '@/components/common'
import useIsDesktop from '@/hooks/useIsDesktop'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { userStore } from '@/store/userSlice'
import { PlaylistDetails } from '@/types/song'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import PlaylistDetailDesktop from './PlaylistDetailDesktop'
import PlaylistDetailSkeleton from './PlaylistDetailSkeleton'
import PlaylistDetailUI from './PlaylistDetailUI'

export default function PlaylistDetailsComponent({
  params,
}: {
  params: { id: string }
}) {
  const [playlistDetails, setPlaylistDetails] =
    useState<PlaylistDetails | null>(null)
  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()

  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const [modalProps, setModalProps] = useState({
    isOpen: false,
    title: '',
    content: '',
    type: 'single' as 'single' | 'vertical' | 'horizontal',
    onConfirm: () => {},
    onCancel: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
  })
  const { user, isLogin } = userStore()
  const router = useRouter()
  const isDesktop = useIsDesktop()

  useEffect(() => {
    if (!isLogin || !user?.id) {
      router.replace('/login')
    }
  }, [user, router, isLogin])

  const toggleDropdown = (songId: string) => {
    setDropdownOpen((prev) => (prev === songId ? null : songId))
  }

  const loadPlaylistDetails = useCallback(async () => {
    try {
      const data = await fetchPlaylistDetails(params.id)
      if (data) {
        const sortedSongs = [...data.songs].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        setPlaylistDetails({ ...data, songs: sortedSongs })
      }
    } catch (error) {
      console.error(
        '플레이리스트 데이터를 가져오는 중 오류가 발생했습니다.',
        error,
      )
    }
  }, [params.id])

  useEffect(() => {
    loadPlaylistDetails()
  }, [loadPlaylistDetails])

  if (!playlistDetails) {
    return <div>로딩 중...</div>
  }

  const handlePlayAll = () => {
    if (!isPlayerOpen) setPlayerOpen()
    setTrackIds(playlistDetails.songs.map((song) => song.spotify_id))
    play()
  }

  const handleShufflePlay = () => {
    if (!isPlayerOpen) setPlayerOpen()
    const shuffledTracks = [
      ...playlistDetails.songs.map((song) => song.spotify_id),
    ].sort(() => Math.random() - 0.5)
    setTrackIds(shuffledTracks)
    play()
  }

  const handlePlayFromIndex = (index: number) => {
    if (!isPlayerOpen) setPlayerOpen()
    const trackIdsFromIndex = playlistDetails.songs
      .slice(index)
      .map((song) => song.spotify_id)
    setTrackIds(trackIdsFromIndex)
    play()
  }

  const handleDeleteConfirmation = (songId: string) => {
    setModalProps({
      isOpen: true,
      title: '곡 삭제',
      content: '정말 이 곡을 삭제하시겠습니까?',
      type: 'vertical',
      onConfirm: () => {
        handleDeleteSong(songId)
        setModalProps((prev) => ({ ...prev, isOpen: false }))
      },
      onCancel: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
    })
  }

  const handleDeleteSong = async (songId: string) => {
    try {
      const success = await deleteSongFromPlaylist(params.id, songId)
      if (success) {
        await loadPlaylistDetails()
        setDropdownOpen(null)
        setModalProps({
          isOpen: true,
          title: '삭제 완료',
          content: '곡이 성공적으로 삭제되었습니다.',
          type: 'single',
          onConfirm: () =>
            setModalProps((prev) => ({ ...prev, isOpen: false })),
          onCancel: () => {},
        })
      } else {
        setModalProps({
          isOpen: true,
          title: '삭제 실패',
          content: '곡 삭제에 실패했습니다. 다시 시도해주세요.',
          type: 'single',
          onConfirm: () =>
            setModalProps((prev) => ({ ...prev, isOpen: false })),
          onCancel: () => {},
        })
      }
    } catch (error) {
      console.error('곡 삭제 중 오류가 발생했습니다.', error)
      setModalProps({
        isOpen: true,
        title: '오류 발생',
        content: '곡 삭제 중 문제가 발생했습니다.',
        type: 'single',
        onConfirm: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
        onCancel: () => {},
      })
    }
  }

  if (!playlistDetails) {
    return <PlaylistDetailSkeleton />
  }

  return (
    <>
      {isDesktop ? (
        <PlaylistDetailDesktop
          playlistDetails={playlistDetails}
          handlePlayAll={handlePlayAll}
          handleShufflePlay={handleShufflePlay}
          handlePlayFromIndex={handlePlayFromIndex}
          handleDeleteSong={handleDeleteConfirmation}
        />
      ) : (
        <PlaylistDetailUI
          playlistDetails={playlistDetails}
          handlePlayAll={handlePlayAll}
          handleShufflePlay={handleShufflePlay}
          handlePlayFromIndex={handlePlayFromIndex}
          showDropdown={dropdownOpen}
          toggleDropdown={toggleDropdown}
          handleDeleteSong={handleDeleteConfirmation}
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
