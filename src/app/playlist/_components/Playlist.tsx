'use client'

import PlaylistDesktop from '@/app/playlist/_components/PlaylistDesktop'
import PlaylistSkeleton from '@/app/playlist/_components/PlaylistSkeleton'
import PlaylistList from '@/app/playlist/_components/PlaylistUI'
import { Modal, PlaylistBottomSheet } from '@/components/common'
import PlaylistModal from '@/components/common/PlaylistModal' // ✅ 모달 추가
import useIsDesktop from '@/hooks/useIsDesktop'
import {
  useAddPlaylist,
  useDeletePlaylist,
  useFetchPlaylists,
  useLatestLikedSongCover,
  useUpdatePlaylist,
} from '@/hooks/usePlaylists'
import { useToggleLikeMutation } from '@/hooks/useToggleLikeMutation'
import { userStore } from '@/store/userSlice'
import { PlaylistRow, type PlaylistInsert } from '@/types/playlist'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type PlaylistComponentProps = { initialPlaylists: PlaylistRow[] }

export default function Playlist({ initialPlaylists }: PlaylistComponentProps) {
  const { user, isLogin } = userStore()
  const router = useRouter()
  const isDesktop = useIsDesktop()

  useEffect(() => {
    if (!isLogin || !user?.id) {
      router.replace('/login')
    }
  }, [user, router, isLogin])

  const { data: playlists, isLoading } = useFetchPlaylists(initialPlaylists)
  const { data: latestLikedSongCover } = useLatestLikedSongCover()
  const { handleDeleteConfirmation, modalProps } = useDeletePlaylist()

  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null)
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistRow | null>(
    null,
  )
  const [bottomSheetType, setBottomSheetType] = useState<'add' | 'edit' | null>(
    null,
  )
  const [showDropdown, setShowDropdown] = useState<string | null>(null)

  const toggleLikeMutation = useToggleLikeMutation()
  const addPlaylistMutation = useAddPlaylist(() => closeModal())
  const updatePlaylistMutation = useUpdatePlaylist(() => closeModal())

  const handleLikeToggle = (playlistId: string) => {
    if (user?.id) {
      toggleLikeMutation.mutate({ playlist_id: playlistId, user_id: user.id })
    }
  }

  const openModal = (type: 'add' | 'edit', playlist?: PlaylistRow) => {
    if (isDesktop) {
      setModalType(type)
    } else {
      setBottomSheetType(type)
    }
    if (type === 'edit' && playlist) {
      setSelectedPlaylist(playlist)
    } else {
      resetModalState()
    }
  }

  const closeModal = () => {
    setModalType(null)
    resetModalState()
  }

  const closeBottomSheet = () => {
    setBottomSheetType(null)
    resetModalState()
  }

  const resetModalState = () => {
    setSelectedPlaylist(null)
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
            openModal={openModal}
            handleLikeToggle={handleLikeToggle}
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

      {isDesktop && (
        <PlaylistModal
          modalType={'add'}
          // selectedPlaylistId={playlists.id}
          isOpen={!!modalType}
          onClose={closeModal}
        />
      )}

      {/* ✅ 모바일에서는 바텀시트를 띄움 */}
      {!isDesktop && (
        <PlaylistBottomSheet
          isOpen={!!bottomSheetType}
          onClose={closeBottomSheet}
          modalType={bottomSheetType}
          name={selectedPlaylist?.name || ''}
          description={selectedPlaylist?.description || ''}
          isPublic={selectedPlaylist?.is_public || false}
          selectedKeywords={selectedPlaylist?.keyword?.split(',') || []}
          setName={() => {}}
          setDescription={() => {}}
          setIsPublic={() => {}}
          toggleKeyword={() => {}}
          handleSubmit={() => {
            if (bottomSheetType === 'add') {
              addPlaylistMutation.mutate({
                name: selectedPlaylist?.name || '',
                description: selectedPlaylist?.description || '',
                is_public: selectedPlaylist?.is_public || false,
                keyword: selectedPlaylist?.keyword || '',
                user_id: user?.id || '',
              } as PlaylistInsert)
            } else if (bottomSheetType === 'edit' && selectedPlaylist) {
              updatePlaylistMutation.mutate({
                id: selectedPlaylist.id,
                updatedData: {
                  name: selectedPlaylist.name,
                  description: selectedPlaylist.description,
                  is_public: selectedPlaylist.is_public,
                  keyword: selectedPlaylist.keyword,
                },
              })
            }
          }}
        />
      )}
    </div>
  )
}
