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

type PlaylistComponentProps = {
  initialPlaylists: PlaylistRow[]
}

export default function Playlist({ initialPlaylists }: PlaylistComponentProps) {
  const { user, isLogin } = userStore()
  const router = useRouter()
  console.log('user', user)
  useEffect(() => {
    if (!user) {
      router.replace('/login')
      Swal.fire('오류', '로그인이 필요합니다.', 'error')
    }
  }, [user, router, isLogin])

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
    if (!user) return

    const loadPlaylistsAndLikedCover = async () => {
      setIsLoading(true)
      try {
        if (!user) return
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
  }, [user])

  // 새로운 플리 추가
  const handleAddPlaylist = async () => {
    if (!user) {
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
    if (!selectedPlaylist || !user) {
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

  // 키워드
  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword],
    )
  }

  // 플리 핸들러
  const handlePlaylistClick = (playlistId: string) => {
    router.push(`/playlist/${playlistId}`)
  }

  const handleLikesClick = () => {
    router.push('/playlist/likes')
  }

  return (
    <div className="mx-auto h-full max-w-[375px] bg-white">
      {isLoading ? (
        <p className="mt-6 text-center text-gray-500">데이터 로딩 중...</p>
      ) : user ? (
        <>
          <h2 className="title-2 flex h-[40px] items-center justify-start font-pretendard">
            내가 만든 플레이리스트
          </h2>

          <ul className="mt-4 space-y-4">
            <li
              className="flex cursor-pointer items-center justify-start space-x-4"
              onClick={() => openModal('add')}
            >
              <div className="flex h-[44px] w-[44px] items-center justify-center rounded-lg bg-[#DFDFDF]">
                <span className="font-pretendard text-lg text-white">+</span>
              </div>
              <p className="caption-1 font-pretendard">
                새 플레이리스트 만들기
              </p>
            </li>

            <li
              className="flex cursor-pointer items-center justify-start space-x-4"
              onClick={handleLikesClick}
            >
              <div
                className="relative h-[44px] w-[44px] rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${latestLikedSongCover})` }}
              ></div>
              <p className="caption-1 font-pretendard">좋아요 표시한 곡</p>
            </li>

            {playlists?.map((playlist) => (
              <li
                key={playlist.id}
                className="flex items-center justify-between"
                onClick={() => handlePlaylistClick(playlist.id)}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className="relative h-[44px] w-[44px] rounded-lg bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${playlist.latest_song_cover || '/default-cover.jpg'})`,
                    }}
                  >
                    {playlist.is_public === false && (
                      <div className="absolute right-0 top-0 flex h-[13.091px] w-[13.091px] items-center justify-center rounded-full bg-black bg-opacity-40">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8.727"
                          height="8.727"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <path d="M12 1C9.24 1 7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2h-1V6c0-2.76-2.24-5-5-5zm-5 8V6c0-2.76 2.24-5 5-5s5 2.24 5 5v3H7zm12 3H5v9h14v-9zm-7 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="caption-1 font-pretendard">{playlist.name}</p>
                    <p className="text-sm text-gray-500">
                      {playlist.description || '곡 NN개'}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowDropdown((prev) =>
                        prev === playlist.id ? null : playlist.id,
                      )
                    }}
                    className="text-xl text-gray-500"
                  >
                    ⋮
                  </button>
                  {showDropdown === playlist.id && (
                    <div className="absolute right-0 mt-2 w-24 rounded-lg bg-white shadow-lg">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openModal('edit', playlist)
                        }}
                        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                      >
                        수정
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeletePlaylist(playlist.id)
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
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
