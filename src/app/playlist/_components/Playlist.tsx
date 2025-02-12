'use client'

import { Modal, PlaylistBottomSheet } from '@/components/common'
import PlaylistModal from '@/components/common/PlaylistModal'
import useIsDesktop from '@/hooks/useIsDesktop'
import {
  useAddPlaylist,
  useDeletePlaylist,
  useFetchPlaylists,
  useLatestLikedSongCover,
  useUpdatePlaylist,
} from '@/hooks/usePlaylists'
import { userStore } from '@/store/userSlice'
import { PlaylistRow, type PlaylistInsert } from '@/types/playlist'
import { supabase } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import PlaylistDesktop from './PlaylistDesktop'
import PlaylistSkeleton from './PlaylistSkeleton'
import PlaylistList from './PlaylistUI'

type PlaylistComponentProps = { initialPlaylists: PlaylistRow[] }

export default function Playlist({ initialPlaylists }: PlaylistComponentProps) {
  const { user, isLogin } = userStore()
  const router = useRouter()
  const isDesktop = useIsDesktop()

  const { data: playlists, isLoading } = useFetchPlaylists(initialPlaylists)
  const { data: latestLikedSongCover } = useLatestLikedSongCover()
  const { handleDeleteConfirmation, modalProps } = useDeletePlaylist()

  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null)
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistRow | null>(
    null,
  )

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState<string | null>(null)

  const [successModalProps, setSuccessModalProps] = useState({
    isOpen: false,
    title: '',
    content: '',
    onConfirm: () =>
      setSuccessModalProps((prev) => ({ ...prev, isOpen: false })),
  })

  const addPlaylistMutation = useAddPlaylist(() => {
    setSuccessModalProps({
      isOpen: true,
      title: '완료',
      content: '플레이리스트가 추가되었습니다!',
      onConfirm: () => {
        setSuccessModalProps((prev) => ({ ...prev, isOpen: false }))
        closeModal()
      },
    })
  })

  const updatePlaylistMutation = useUpdatePlaylist(() => {
    setSuccessModalProps({
      isOpen: true,
      title: '완료',
      content: '플레이리스트가 수정되었습니다!',
      onConfirm: () => {
        setSuccessModalProps((prev) => ({ ...prev, isOpen: false }))
        closeModal()
      },
    })
  })

  // useEffect(() => {
  //   const checkUser = async () => {
  //     const { data } = await supabase.auth.getUser()
  //     if (!data.user?.id) {
  //       router.replace('/login')
  //     }
  //   }
  //   checkUser()
  // }, [])

  const openModal = (type: 'add' | 'edit', playlist?: PlaylistRow) => {
    setModalType(type)
    setSelectedPlaylist(playlist || null)
    if (type === 'edit' && playlist) {
      setName(playlist.name)
      setDescription(playlist.description || '')
      setIsPublic(playlist.is_public)
      setSelectedKeywords(playlist.keyword ? playlist.keyword.split(',') : [])
    } else if (type === 'add') {
      resetFormState()
    }
  }

  const closeModal = () => {
    setModalType(null)
    resetFormState()
    setSelectedPlaylist(null)
  }

  const resetFormState = () => {
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

  if (isLoading) {
    return <PlaylistSkeleton />
  }

  return (
    <div className="mx-auto h-full w-full bg-white">
      {isLogin ? (
        isDesktop ? (
          <PlaylistDesktop
            playlists={playlists || []}
            latestLikedSongCover={latestLikedSongCover || ''}
            handlePlaylistClick={(id) => router.push(`/playlist/${id}`)}
            handleLikesClick={() => router.push('/playlist/likes')}
            openModal={() => openModal('add')}
            handleLikeToggle={() => {}}
            handleDeletePlaylist={handleDeleteConfirmation}
            handleEditPlaylist={(playlist) => openModal('edit', playlist)}
          />
        ) : (
          <PlaylistList
            playlists={playlists || []}
            latestLikedSongCover={latestLikedSongCover || ''}
            openModal={openModal}
            handlePlaylistClick={(id) => router.push(`/playlist/${id}`)}
            handleLikesClick={() => router.push('/playlist/likes')}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            handleDeletePlaylist={handleDeleteConfirmation}
          />
        )
      ) : (
        <p className="mt-6 text-center text-gray-500">로그인이 필요합니다.</p>
      )}

      <Modal {...modalProps} />

      <Modal
        isOpen={successModalProps.isOpen}
        title={successModalProps.title}
        content={successModalProps.content}
        onConfirm={successModalProps.onConfirm}
        onCancel={() =>
          setSuccessModalProps((prev) => ({ ...prev, isOpen: false }))
        }
      />

      {isDesktop &&
        modalType !== null &&
        (modalType === 'edit' && selectedPlaylist ? (
          <PlaylistModal
            modalType="edit"
            isOpen={true}
            onClose={closeModal}
            selectedPlaylistId={selectedPlaylist.id}
            selectedPlaylist={{
              name: selectedPlaylist.name,
              description: selectedPlaylist.description || '',
              is_public: selectedPlaylist.is_public,
              keyword: selectedPlaylist.keyword || '',
            }}
          />
        ) : modalType === 'add' ? (
          <PlaylistModal modalType="add" isOpen={true} onClose={closeModal} />
        ) : null)}

      {!isDesktop && modalType !== null && (
        <PlaylistBottomSheet
          isOpen={true}
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
              } as PlaylistInsert)
            } else if (modalType === 'edit' && selectedPlaylist) {
              updatePlaylistMutation.mutate({
                id: selectedPlaylist.id,
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
      )}
    </div>
  )
}
