'use client'

import {
  addPlaylist,
  fetchLatestLikedSongCover,
  fetchPlaylistsWithCovers,
  updatePlaylist,
} from '@/api/playlist/actions'
import KeywordCarousel from '@/components/keywords/keywordCarousel'
import Hamburger from '@/components/layout/Hamburger'
import { userStore } from '@/store/userSlice'
import { PlaylistRow } from '@/types/playlist'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

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
    <div className="mx-auto h-[812px] max-w-[375px] bg-white">
      <Hamburger title="플레이리스트" />

      {isLoading ? (
        <p className="mt-6 text-center text-gray-500">데이터 로딩 중...</p>
      ) : isLogin ? (
        <>
          <h2 className="title-2 mt-6 font-bold">내가 만든 플레이리스트</h2>

          <ul className="mt-4 space-y-4 p-4">
            <li
              className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white px-6 py-3 shadow-sm"
              onClick={() => openModal('add')}
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-lg bg-[#DFDFDF]">
                  <span className="text-lg font-bold text-white">+</span>
                </div>
                <p className="caption-1 font-pretendard">
                  새 플레이리스트 만들기
                </p>
              </div>
            </li>

            {latestLikedSongCover && (
              <li
                className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white px-6 py-3 shadow-sm"
                onClick={handleLikesClick}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className="h-[44px] w-[44px] rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${latestLikedSongCover})` }}
                  ></div>
                  <div>
                    <p className="caption-1 font-pretendard">
                      좋아요 표시한 곡
                    </p>
                  </div>
                </div>
              </li>
            )}

            {playlists.map((playlist) => (
              <li
                key={playlist.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-6 py-3 shadow-sm"
                onClick={() => handlePlaylistClick(playlist.id)}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className="h-[44px] w-[44px] rounded-lg bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${playlist.latest_song_cover || '/default-cover.jpg'})`,
                    }}
                  ></div>
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

      {modalType && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[360px] rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold text-[#4a4a4a]">
              {modalType === 'add' ? '플레이리스트 추가' : '플레이리스트 수정'}
            </h2>
            <input
              type="text"
              placeholder="플레이리스트 제목"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4 w-full border-b border-gray-300 bg-transparent p-2"
            />
            <textarea
              placeholder="플레이리스트 설명"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-4 w-full border-b border-gray-300 bg-transparent p-2"
            ></textarea>
            <div className="mb-4">
              <KeywordCarousel
                selectedKeywords={selectedKeywords}
                onToggleKeyword={toggleKeyword}
              />
            </div>
            <div className="flex">
              <button
                className={`flex-1 rounded-l-md py-2 text-center ${
                  isPublic
                    ? 'bg-secondary text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
                onClick={() => setIsPublic(true)}
              >
                공개
              </button>
              <button
                className={`flex-1 rounded-r-md py-2 text-center ${
                  !isPublic
                    ? 'bg-secondary text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
                onClick={() => setIsPublic(false)}
              >
                비공개
              </button>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="rounded bg-gray-300 px-4 py-2 text-black"
              >
                취소
              </button>
              <button
                onClick={
                  modalType === 'add' ? handleAddPlaylist : handleEditPlaylist
                }
                className="ml-2 rounded bg-secondary px-4 py-2 text-white"
              >
                {modalType === 'add' ? '추가하기' : '저장하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
