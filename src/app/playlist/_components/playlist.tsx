'use client'

import {
  addPlaylist,
  deletePlaylist,
  fetchLatestLikedSongCover,
  fetchPlaylistsWithCovers,
  updatePlaylist,
} from '@/api/playlist/actions'
import { PlaylistBottomSheet } from '@/components/common'
import { userStore } from '@/store/userSlice'
import { PlaylistRow } from '@/types/playlist'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import PlaylistList from './PlaylistUI'

type PlaylistComponentProps = {
  initialPlaylists: PlaylistRow[]
}

export default function PlaylistComponent({
  initialPlaylists,
}: PlaylistComponentProps) {
  const { user, isLogin } = userStore()
  const router = useRouter()

  const [playlists, setPlaylists] = useState<PlaylistRow[]>(initialPlaylists)
  const [latestLikedSongCover, setLatestLikedSongCover] = useState<
    string | null
  >(null)
  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null)
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistRow | null>(
    null,
  )
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // 데이터 로드
  useEffect(() => {
    if (!isLogin || !user) return

    const loadPlaylistsAndLikedCover = async () => {
      setIsLoading(true)
      try {
        const cover = await fetchLatestLikedSongCover(user.id)
        setLatestLikedSongCover(cover)

        const data = await fetchPlaylistsWithCovers()
        setPlaylists(data)
      } catch (error) {
        console.error('데이터 로드 오류:', error)
        Swal.fire('오류', '데이터를 가져오는 중 문제가 발생했습니다.', 'error')
      } finally {
        setIsLoading(false)
      }
    }

    loadPlaylistsAndLikedCover()
  }, [isLogin, user])

  // 새로운 플리 추가
  const handleAddPlaylist = async () => {
    if (!isLogin || !user) {
      Swal.fire('오류', '로그인이 필요합니다.', 'error')
      return
    }

    try {
      await addPlaylist({
        name,
        description,
        is_public: isPublic,
        keyword: selectedKeywords.join(','),
        user_id: user.id,
      })
      Swal.fire('완료', '플레이리스트가 추가되었습니다!', 'success')
      const updatedPlaylists = await fetchPlaylistsWithCovers()
      setPlaylists(updatedPlaylists)
      closeModal()
    } catch (error) {
      console.error('플레이리스트 추가 오류:', error)
      Swal.fire('오류', '플레이리스트 추가 중 문제가 발생했습니다.', 'error')
    }
  }

  // 플리 수정
  const handleEditPlaylist = async () => {
    if (!selectedPlaylist || !isLogin || !user) {
      Swal.fire('오류', '로그인이 필요합니다.', 'error')
      return
    }

    try {
      await updatePlaylist(selectedPlaylist.id, {
        name,
        description,
        is_public: isPublic,
        keyword: selectedKeywords.join(','),
      })
      Swal.fire('완료', '플레이리스트가 수정되었습니다!', 'success')
      const updatedPlaylists = await fetchPlaylistsWithCovers()
      setPlaylists(updatedPlaylists)
      closeModal()
    } catch (error) {
      console.error('플레이리스트 수정 오류:', error)
      Swal.fire('오류', '플레이리스트 수정 중 문제가 발생했습니다.', 'error')
    }
  }

  const handleDeletePlaylist = async (playlistId: string) => {
    const confirm = await Swal.fire({
      title: '플레이리스트 삭제',
      text: '정말 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#B15EFF',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    })

    if (!confirm.isConfirmed) return

    try {
      await deletePlaylist(playlistId)
      Swal.fire('완료', '플레이리스트가 삭제되었습니다.', 'success')

      const updatedPlaylists = await fetchPlaylistsWithCovers()
      setPlaylists(updatedPlaylists)
    } catch (error) {
      console.error('플레이리스트 삭제 오류:', error)
      Swal.fire('오류', '플레이리스트 삭제 중 문제가 발생했습니다.', 'error')
    }
  }

  // 모달 관련 로직
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

  // 플리 핸들러
  const handlePlaylistClick = (playlistId: string) => {
    console.log('playlistId', playlistId)
    router.push(`/playlist/${playlistId}`)
  }

  const handleLikesClick = () => {
    router.push('/playlist/likes')
  }

  return (
    <div className="mx-auto h-full max-w-[375px] bg-white">
      {isLoading ? (
        <p className="mt-6 text-center text-gray-500">데이터 로딩 중...</p>
      ) : isLogin ? (
        <PlaylistList
          playlists={playlists}
          latestLikedSongCover={latestLikedSongCover}
          handlePlaylistClick={handlePlaylistClick}
          handleLikesClick={handleLikesClick}
          openModal={openModal}
          handleDeletePlaylist={handleDeletePlaylist}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
        />
      ) : (
        <p className="mt-6 text-center text-gray-500">로그인이 필요합니다.</p>
      )}

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
        handleSubmit={
          modalType === 'add' ? handleAddPlaylist : handleEditPlaylist
        }
      />
    </div>
  )
}
