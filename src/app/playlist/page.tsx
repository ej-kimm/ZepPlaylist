'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { addPlaylist, fetchPlaylists, updatePlaylist } from './actions'

type Playlist = {
  id: string
  name: string
  description: string
  is_public: boolean
  keyword: string
  user_id: string
  created_at: string
}

export default function PlaylistPage() {
  const router = useRouter()

  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [playlistName, setPlaylistName] = useState('')
  const [playlistDescription, setPlaylistDescription] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null,
  )
  const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null)

  useEffect(() => {
    const loadPlaylists = async () => {
      const data = await fetchPlaylists()
      setPlaylists(data)
    }
    loadPlaylists()
  }, [])

  // 화면 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.dropdown-menu')) {
        setDropdownOpenId(null)
      }
    }

    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  //플리 인풋 값을 받아 생성 핸들
  const handleAddPlaylist = async () => {
    try {
      await addPlaylist({
        name: playlistName,
        description: playlistDescription,
        is_public: isPublic,
        user_id: 'd93e1116-eb6b-42cf-8715-e15c9adcfac3', // 실제 사용자 ID로 대체 필요
        keyword: '',
      })

      Swal.fire('완료', '플레이리스트가 추가되었습니다!', 'success')

      setPlaylistName('')
      setPlaylistDescription('')
      setIsPublic(false)
      setIsModalOpen(false)

      //에러 핸들
      const updatedPlaylists = await fetchPlaylists()
      setPlaylists(updatedPlaylists)
    } catch (error) {
      console.error('플레이리스트 추가 오류:', error)
      Swal.fire('오류', '플레이리스트 추가 중 문제가 발생했습니다.', 'error')
    }
  }

  const handlePlaylistClick = (playlistId: string) => {
    router.push(`/playlist/${playlistId}`)
  }

  const toggleDropdown = (id: string) => {
    setDropdownOpenId((prev) => (prev === id ? null : id))
  }

  const handleEditPlaylist = (playlist: Playlist) => {
    setSelectedPlaylist(playlist)
    setPlaylistName(playlist.name)
    setPlaylistDescription(playlist.description)
    setIsPublic(playlist.is_public)
    setIsEditModalOpen(true)
  }

  //업데이트 핸들
  const handleSaveEdit = async () => {
    if (!selectedPlaylist) return

    try {
      await updatePlaylist(selectedPlaylist.id, {
        name: playlistName,
        description: playlistDescription,
        is_public: isPublic,
      })

      Swal.fire('완료', '플레이리스트가 성공적으로 수정되었습니다!', 'success')

      //필드 초기화
      setIsEditModalOpen(false)
      setPlaylistName('')
      setPlaylistDescription('')
      setIsPublic(false)

      //오류 수정 핸들
      const updatedPlaylists = await fetchPlaylists()
      setPlaylists(updatedPlaylists)
    } catch (error) {
      console.error('플레이리스트 수정 오류:', error)
      Swal.fire('오류', '플레이리스트 수정 중 문제가 발생했습니다.', 'error')
    }
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Music Streaming App</h1>
      <h2 className="mb-2 text-lg font-semibold">플레이리스트</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center rounded bg-black px-4 py-2 text-white"
      >
        <span className="mr-2 text-2xl font-bold">+</span>플레이리스트 추가
      </button>
      <ul className="mt-4">
        {playlists.map((playlist) => (
          <li
            key={playlist.id}
            className="flex items-center justify-between border-b py-2"
          >
            <div
              onClick={() => handlePlaylistClick(playlist.id)}
              className="cursor-pointer"
            >
              <p className="font-semibold">{playlist.name}</p>
              <p className="text-sm text-gray-500">{playlist.description}</p>
            </div>
            <div className="dropdown-menu relative">
              <button
                onClick={() => toggleDropdown(playlist.id)}
                className="text-gray-500"
              >
                ⋮
              </button>
              {dropdownOpenId === playlist.id && (
                <div className="absolute right-0 mt-2 w-24 rounded-md bg-white shadow-lg">
                  <button
                    onClick={() => handleEditPlaylist(playlist)}
                    className="flex items-center justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    수정
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold">플레이리스트 추가</h2>
            <label className="mb-2 block">
              이름
              <input
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="mb-2 block">
              설명
              <textarea
                value={playlistDescription}
                onChange={(e) => setPlaylistDescription(e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="mb-4 block">
              공개 설정
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="ml-2"
              />
            </label>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded bg-gray-300 px-4 py-2 text-black"
              >
                취소
              </button>
              <button
                onClick={handleAddPlaylist}
                className="rounded bg-black px-4 py-2 text-white"
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold">플레이리스트 수정</h2>
            <label className="mb-2 block">
              이름
              <input
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="mb-2 block">
              설명
              <textarea
                value={playlistDescription}
                onChange={(e) => setPlaylistDescription(e.target.value)}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
            <label className="mb-4 block">
              공개 설정
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="ml-2"
              />
            </label>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="rounded bg-gray-300 px-4 py-2 text-black"
              >
                취소
              </button>
              <button
                onClick={handleSaveEdit}
                className="rounded bg-black px-4 py-2 text-white"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
