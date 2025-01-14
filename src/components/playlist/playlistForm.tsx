'use client'

import {
  addPlaylist,
  fetchPlaylists,
  updatePlaylist,
} from '@/api/playlist/actions'
import KeywordCarousel from '@/components/keywords/keywordCarousel'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import Swal from 'sweetalert2'

type Playlist = {
  id: string
  name: string
  description: string | null
  is_public: boolean
  keyword: string
  user_id: string
  created_at: string
  latest_song_cover?: string | null
}

export default function PlaylistComponent({
  initialPlaylists,
}: {
  initialPlaylists: Playlist[]
}) {
  const router = useRouter()
  const [playlists, setPlaylists] = useState<Playlist[]>(initialPlaylists)
  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null)
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null,
  )
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState<string | null>(null) // 드롭다운 상태

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        const data = await fetchPlaylists()
        setPlaylists(data)
      } catch (error) {
        console.error('플레이리스트 로드 오류:', error)
      }
    }

    loadPlaylists()
  }, [])

  const openModal = (type: 'add' | 'edit', playlist?: Playlist) => {
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

  const handleAddPlaylist = async () => {
    try {
      await addPlaylist({
        name,
        description,
        is_public: isPublic,
        user_id: 'd93e1116-eb6b-42cf-8715-e15c9adcfac3',
        keyword: selectedKeywords.join(','),
      })

      Swal.fire('완료', '플레이리스트가 추가되었습니다!', 'success')

      const updatedPlaylists = await fetchPlaylists()
      setPlaylists(updatedPlaylists)
      closeModal()
    } catch (error) {
      Swal.fire('오류', '플레이리스트 추가 중 문제가 발생했습니다.', 'error')
      console.error(error)
    }
  }

  const handleEditPlaylist = async () => {
    if (!selectedPlaylist) return

    try {
      await updatePlaylist(selectedPlaylist.id, {
        name,
        description,
        is_public: isPublic,
        keyword: selectedKeywords.join(','),
      })

      Swal.fire('완료', '플레이리스트가 수정되었습니다!', 'success')

      const updatedPlaylists = await fetchPlaylists()
      setPlaylists(updatedPlaylists)
      closeModal()
    } catch (error) {
      Swal.fire('오류', '플레이리스트 수정 중 문제가 발생했습니다.', 'error')
      console.error(error)
    }
  }

  const handlePlaylistClick = (playlistId: string) => {
    router.push(`/playlist/${playlistId}`)
  }

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword],
    )
  }

  return (
    <div className="p-4">
      <button
        onClick={() => openModal('add')}
        className="flex h-[48px] w-[245px] items-center justify-center rounded-lg border-2 border-[#9032E8] text-lg text-[#9032E8]"
      >
        새 플레이리스트 만들기
      </button>

      <ul className="mt-4 space-y-2">
        {playlists.map((playlist) => (
          <li
            key={playlist.id}
            className="flex h-[80px] w-[378px] items-center justify-between rounded-lg border bg-white px-4 py-2 shadow-sm"
          >
            <div
              className="relative flex cursor-pointer items-center space-x-4"
              onClick={() => handlePlaylistClick(playlist.id)}
            >
              <div className="relative h-16 w-16 overflow-hidden rounded">
                {playlist.latest_song_cover ? (
                  <Image
                    src={playlist.latest_song_cover}
                    alt="앨범 커버"
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                    No Cover
                  </div>
                )}
                <div className="absolute right-1 top-1">
                  {playlist.is_public ? (
                    <FaLockOpen className="text-white" />
                  ) : (
                    <FaLock className="text-white" />
                  )}
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold">{playlist.name}</p>
                <p className="text-sm text-gray-500">
                  {playlist.description || '곡 NN개'}
                </p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() =>
                  setShowDropdown((prev) =>
                    prev === playlist.id ? null : playlist.id,
                  )
                }
                className="text-xl text-gray-500"
              >
                ⋮
              </button>
              {showDropdown === playlist.id && (
                <div className="absolute right-0 mt-2 w-24 rounded-lg bg-white shadow-lg">
                  <button
                    onClick={() => openModal('edit', playlist)}
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

      {modalType && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[420px] rounded-lg bg-white p-6 shadow-lg">
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
                    ? 'bg-[#9032E8] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
                onClick={() => setIsPublic(true)}
              >
                공개
              </button>
              <button
                className={`flex-1 rounded-r-md py-2 text-center ${
                  !isPublic
                    ? 'bg-[#9032E8] text-white'
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
                className="ml-2 rounded bg-[#9032E8] px-4 py-2 text-white"
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
