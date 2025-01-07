'use client'

import { useEffect, useState } from 'react'
import { addPlaylist, fetchPlaylists } from './actions'

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
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [playlistName, setPlaylistName] = useState('')
  const [playlistDescription, setPlaylistDescription] = useState('')
  const [isPublic, setIsPublic] = useState(false)

  // 초기 데이터 가져오기
  useEffect(() => {
    const loadPlaylists = async () => {
      const data = await fetchPlaylists()
      setPlaylists(data)
    }
    loadPlaylists()
  }, [])

  const handleAddPlaylist = async () => {
    await addPlaylist({
      name: playlistName,
      description: playlistDescription,
      is_public: isPublic,
      user_id: 'd93e1116-eb6b-42cf-8715-e15c9adcfac3', // 실제 사용자 ID로 대체 필요
      keyword: '',
    })

    // 입력값 초기화 및 모달 닫기
    setPlaylistName('')
    setPlaylistDescription('')
    setIsPublic(false)
    setIsModalOpen(false)

    // 데이터 갱신
    const updatedPlaylists = await fetchPlaylists()
    setPlaylists(updatedPlaylists)
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
            <div>
              <p className="font-semibold">{playlist.name}</p>
              <p className="text-sm text-gray-500">{playlist.description}</p>
            </div>
            <button className="text-gray-500">⋮</button>
          </li>
        ))}
      </ul>

      {/* 모달 */}
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
    </div>
  )
}
