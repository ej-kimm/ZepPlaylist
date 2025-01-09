'use client'

import {
  addPlaylist,
  fetchPlaylists,
  updatePlaylist,
} from '@/api/playlist/actions'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import Swal from 'sweetalert2'

type Playlist = {
  id: string
  name: string
  description: string
  is_public: boolean
  keyword: string
  user_id: string
  created_at: string
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
      setDescription(playlist.description)
      setIsPublic(playlist.is_public)
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
  }

  const handleAddPlaylist = async () => {
    try {
      await addPlaylist({
        name,
        description,
        is_public: isPublic,
        user_id: 'd93e1116-eb6b-42cf-8715-e15c9adcfac3',
        keyword: '',
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

  return (
    <div className="p-4">
      <button
        onClick={() => openModal('add')}
        className="flex h-[48px] w-[245px] items-center justify-center rounded-lg border-2 border-purple-500 text-lg text-purple-500"
      >
        새 플레이리스트 만들기
      </button>

      <ul className="mt-4 space-y-2">
        {playlists.map((playlist) => (
          <li
            key={playlist.id}
            className="flex h-[58px] w-[378px] items-center justify-between rounded-lg border bg-white px-4 py-2 shadow-sm"
          >
            <div
              onClick={() => handlePlaylistClick(playlist.id)}
              className="flex cursor-pointer items-center"
            >
              <div className="relative h-12 w-12 rounded bg-gray-200">
                {playlist.is_public ? (
                  <FaLockOpen className="absolute right-1 top-1 text-gray-600" />
                ) : (
                  <FaLock className="absolute right-1 top-1 text-gray-600" />
                )}
              </div>

              <div className="ml-4">
                <p className="text-lg font-semibold">{playlist.name}</p>
                <p className="text-sm text-gray-500">
                  {playlist.description || '곡 NN개'}
                </p>
              </div>
            </div>

            <button
              onClick={() => openModal('edit', playlist)}
              className="text-xl text-gray-500"
            >
              ⋮
            </button>
          </li>
        ))}
      </ul>

      {modalType && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[378px] rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold">
              {modalType === 'add' ? '플레이리스트 추가' : '플레이리스트 수정'}
            </h2>
            <input
              type="text"
              placeholder="플레이리스트 제목"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4 w-full border-b p-2"
            />
            <textarea
              placeholder="플레이리스트 설명"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-4 w-full border-b p-2"
            ></textarea>
            <div className="flex">
              <button
                className={`flex-1 rounded-l-md py-2 text-center ${
                  isPublic ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
                }`}
                onClick={() => setIsPublic(true)}
              >
                공개
              </button>
              <button
                className={`flex-1 rounded-r-md py-2 text-center ${
                  !isPublic
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
                onClick={() => setIsPublic(false)}
              >
                비공개
              </button>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
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
                className="rounded bg-black px-4 py-2 text-white"
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
