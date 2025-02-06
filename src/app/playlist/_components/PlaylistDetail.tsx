'use client'

import {
  deleteSongFromPlaylist,
  fetchPlaylistDetails,
} from '@/api/playlist-detail/actions'
import { Modal } from '@/components/common'
import useIsDesktop from '@/hooks/useIsDesktop'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { PlaylistDetails } from '@/types/song'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import PlaylistDetailDesktop from './PlaylistDetailDesktop'
import PlaylistDetailSkeleton from './PlaylistDetailSkeleton'
import PlaylistDetailUI from './PlaylistDetailUI'

export default function PlaylistDetailsComponent({
  params,
}: {
  params: { id: string }
}) {
  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()
  const isDesktop = useIsDesktop()
  const queryClient = useQueryClient()

  const {
    data: playlistDetails,
    isLoading,
    error,
  } = useQuery<PlaylistDetails | null>({
    queryKey: ['playlistDetails', params.id],
    queryFn: () => fetchPlaylistDetails(params.id),
    staleTime: 1000 * 60 * 5,
  })

  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const [modalProps, setModalProps] = useState({
    isOpen: false,
    title: '',
    content: '',
    type: 'single' as 'single' | 'vertical' | 'horizontal',
    onConfirm: () => {},
    onCancel: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
  })

  const toggleDropdown = (songId: string) => {
    setDropdownOpen((prev) => (prev === songId ? null : songId))
  }

  const deleteMutation = useMutation({
    mutationFn: (songId: string) => deleteSongFromPlaylist(params.id, songId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['playlistDetails', params.id],
      })
      setDropdownOpen(null)
      setModalProps({
        isOpen: true,
        title: '삭제 완료',
        content: '곡이 성공적으로 삭제되었습니다.',
        type: 'single',
        onConfirm: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
        onCancel: () => {},
      })
    },
    onError: () => {
      setModalProps({
        isOpen: true,
        title: '삭제 실패',
        content: '곡 삭제에 실패했습니다. 다시 시도해주세요.',
        type: 'single',
        onConfirm: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
        onCancel: () => {},
      })
    },
  })

  const handleDeleteConfirmation = (songId: string) => {
    setModalProps({
      isOpen: true,
      title: '곡 삭제',
      content: '정말 이 곡을 삭제하시겠습니까?',
      type: 'vertical',
      onConfirm: () => deleteMutation.mutate(songId),
      onCancel: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
    })
  }

  if (isLoading) {
    return <PlaylistDetailSkeleton />
  }

  if (error || !playlistDetails) {
    return (
      <div className="text-center text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    )
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
