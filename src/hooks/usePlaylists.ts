import {
  addPlaylist,
  deletePlaylist,
  fetchLatestLikedSongCover,
  fetchPlaylistsWithCovers,
  updatePlaylist,
} from '@/api/playlist/actions'
import { userStore } from '@/store/userSlice'
import { PlaylistRow } from '@/types/playlist'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export function useFetchPlaylists(initialPlaylists: PlaylistRow[]) {
  const { user } = userStore()
  return useQuery({
    queryKey: ['playlists', user?.id],
    queryFn: () => {
      if (!user?.id) return Promise.reject('유저정보 확인 불가')
      return fetchPlaylistsWithCovers()
    },
    enabled: !!user?.id,
    staleTime: 0,
    initialData: initialPlaylists,
  })
}

export function useLatestLikedSongCover() {
  const { user } = userStore()
  return useQuery({
    queryKey: ['latestLikedSongCover', user?.id],
    queryFn: () => fetchLatestLikedSongCover(user!.id),
    enabled: !!user,
  })
}

export function useAddPlaylist(onSuccess: () => void) {
  const { user } = userStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newPlaylist: Omit<PlaylistRow, 'id' | 'created_at'>) =>
      addPlaylist(newPlaylist),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists', user?.id] })
      onSuccess()
    },
  })
}

export function useUpdatePlaylist(onSuccess: () => void) {
  const { user } = userStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string
      updatedData: Partial<PlaylistRow>
    }) => updatePlaylist(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists', user?.id] })
      onSuccess()
    },
  })
}

export function useDeletePlaylist() {
  const { user } = userStore()
  const queryClient = useQueryClient()
  const [modalProps, setModalProps] = useState({
    isOpen: false,
    title: '',
    content: '',
    type: 'single' as 'single' | 'vertical' | 'horizontal',
    onConfirm: () => {},
    onCancel: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
  })

  const deletePlaylistMutation = useMutation({
    mutationFn: (playlistId: string) => deletePlaylist(playlistId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists', user?.id] })
      setModalProps({
        isOpen: true,
        title: '완료',
        content: '플레이리스트가 삭제되었습니다!',
        type: 'single',
        onConfirm: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
        onCancel: () => {},
      })
    },
    onError: () => {
      setModalProps({
        isOpen: true,
        title: '오류',
        content: '플레이리스트 삭제 중 문제가 발생했습니다.',
        type: 'single',
        onConfirm: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
        onCancel: () => {},
      })
    },
  })

  const handleDeleteConfirmation = (playlistId: string) => {
    setModalProps({
      isOpen: true,
      title: '플레이리스트 삭제',
      content: '플레이리스트를 정말 삭제하시겠습니까?',
      type: 'vertical',
      onConfirm: () => deletePlaylistMutation.mutate(playlistId),
      onCancel: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
    })
  }

  return {
    handleDeleteConfirmation,
    modalProps,
  }
}
