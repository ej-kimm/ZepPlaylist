'use client'

import {
  addPlaylist,
  deletePlaylist,
  fetchLatestLikedSongCover,
  fetchPlaylistsWithCovers,
  updatePlaylist,
} from '@/api/playlist/actions'
import { Modal, PlaylistBottomSheet } from '@/components/common'
import { userStore } from '@/store/userSlice'
import { PlaylistRow } from '@/types/playlist'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import PlaylistList from './PlaylistUI'

type PlaylistComponentProps = { initialPlaylists: PlaylistRow[] }

export default function Playlist({ initialPlaylists }: PlaylistComponentProps) {
  const { user, isLogin } = userStore()
  const router = useRouter()
  const queryClient = useQueryClient()

  const [modalProps, setModalProps] = useState({
    isOpen: false,
    title: '',
    content: '',
    type: 'single' as 'single' | 'vertical' | 'horizontal',
    onConfirm: () => {},
    onCancel: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
  })

  useEffect(() => {
    if (!isLogin || !user?.id) {
      router.replace('/login')
      setModalProps({
        isOpen: true,
        title: '오류',
        content: '로그인이 필요합니다.',
        type: 'single',
        onConfirm: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
        onCancel: () => {},
      })
    }
  }, [user, router, isLogin])

  const { data: playlists, isLoading } = useQuery({
    queryKey: ['playlists', user?.id],
    queryFn: () => {
      if (!user?.id) {
        return Promise.reject('유저정보 확인 불가')
      }
      return fetchPlaylistsWithCovers()
    },
    enabled: !!user?.id,
    staleTime: 0,
    initialData: initialPlaylists,
  })

  const { data: latestLikedSongCover } = useQuery({
    queryKey: ['latestLikedSongCover', user?.id],
    queryFn: () => fetchLatestLikedSongCover(user!.id),
    enabled: !!user,
  })

  const addPlaylistMutation = useMutation({
    mutationFn: (newPlaylist: Omit<PlaylistRow, 'id' | 'created_at'>) =>
      addPlaylist(newPlaylist),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists', user?.id] })
      setModalProps({
        isOpen: true,
        title: '완료',
        content: '플레이리스트가 추가되었습니다!',
        type: 'single',
        onConfirm: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
        onCancel: () => {},
      })
      closeModal()
    },
    onError: () => {
      setModalProps({
        isOpen: true,
        title: '오류',
        content: '플레이리스트 추가 중 문제가 발생했습니다.',
        type: 'single',
        onConfirm: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
        onCancel: () => {},
      })
    },
  })

  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null)
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistRow | null>(
    null,
  )
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState<string | null>(null)
  const updatePlaylistMutation = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string
      updatedData: Partial<PlaylistRow>
    }) => updatePlaylist(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists', user?.id] })
      setModalProps({
        isOpen: true,
        title: '플레이리스트 수정',
        content: '플레이리스트가 수정되었습니다.',
        type: 'single',
        onConfirm: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
        onCancel: () => {},
      })
      closeModal()
    },
    onError: () => {
      setModalProps({
        isOpen: true,
        title: '오류',
        content: '플레이리스트 수정 중 문제가 발생했습니다.',
        type: 'single',
        onConfirm: () => setModalProps((prev) => ({ ...prev, isOpen: false })),
        onCancel: () => {},
      })
    },
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

  const openModal = (type: 'add' | 'edit', playlist?: PlaylistRow) => {
    setModalType(type)
    if (type === 'edit' && playlist) {
      setSelectedPlaylist(playlist)
      setName(playlist.name)
      setDescription(playlist.description || '')
      setIsPublic(playlist.is_public)
      setSelectedKeywords(playlist.keyword ? playlist.keyword.split(',') : [])
    } else {
      resetModalState()
    }
  }

  const closeModal = () => {
    setModalType(null)
    resetModalState()
  }

  const resetModalState = () => {
    setSelectedPlaylist(null)
    setName('')
    setDescription('')
    setIsPublic(false)
    setSelectedKeywords([])
  }

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword],
    )
  }
  return (
    <div className="mx-auto h-full max-w-[375px] bg-white">
      {isLoading ? (
        <p className="mt-6 text-center text-gray-500">데이터 로딩 중...</p>
      ) : isLogin ? (
        <PlaylistList
          playlists={playlists || []}
          latestLikedSongCover={latestLikedSongCover || ''}
          openModal={openModal}
          handleDeletePlaylist={(id) => deletePlaylistMutation.mutate(id)}
          showDropdown={showDropdown}
          handleLikesClick={() => router.push('/playlist/likes')}
          handlePlaylistClick={(id) => router.push(`/playlist/${id}`)}
          setShowDropdown={setShowDropdown}
        />
      ) : (
        <p className="mt-6 text-center text-gray-500">로그인이 필요합니다.</p>
      )}

      <Modal
        isOpen={modalProps.isOpen}
        title={modalProps.title}
        content={modalProps.content}
        type={modalProps.type}
        onConfirm={modalProps.onConfirm}
        onCancel={modalProps.onCancel}
      />

      <PlaylistBottomSheet
        isOpen={!!modalType}
        onClose={closeModal}
        modalType={modalType}
        name={name}
        description={description}
        isPublic={isPublic}
        selectedKeywords={selectedKeywords}
        setName={setName}
        setDescription={setDescription}
        setIsPublic={setIsPublic}
        toggleKeyword={toggleKeyword}
        handleSubmit={() => {
          if (modalType === 'add') {
            addPlaylistMutation.mutate({
              name,
              description,
              is_public: isPublic,
              keyword: selectedKeywords.join(','),
              user_id: user?.id || '',
            })
          } else if (modalType === 'edit' && selectedPlaylist) {
            updatePlaylistMutation.mutate({
              id: selectedPlaylist.id || '',
              updatedData: {
                name,
                description,
                is_public: isPublic,
                keyword: selectedKeywords.join(','),
              },
            })
          }
        }}
      />
    </div>
  )
}
