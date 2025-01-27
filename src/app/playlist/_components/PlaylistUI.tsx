import { PlaylistRow } from '@/types/playlist'
import { useState } from 'react'

type PlaylistListProps = {
  playlists: PlaylistRow[]
  latestLikedSongCover: string | null
  handlePlaylistClick: (playlistId: string) => void
  handleLikesClick: () => void
  showDropdown: string | null
  setShowDropdown: (id: string | null) => void
  openModal: (type: 'add' | 'edit', playlist?: PlaylistRow) => void
  handleDeletePlaylist: (playlistId: string) => void
}

export default function PlaylistList({
  playlists,
  latestLikedSongCover,
  handlePlaylistClick,
  handleLikesClick,
  openModal,
  handleDeletePlaylist,
}: PlaylistListProps) {
  const [showDropdown, setShowDropdown] = useState<string | null>(null)

  const toggleDropdown = (id: string) => {
    setShowDropdown((prev) => (prev === id ? null : id))
  }

  return (
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
          <p className="caption-1 font-pretendard">새 플레이리스트 만들기</p>
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

        {playlists.map((playlist) => (
          <li
            key={playlist.id}
            className="flex items-center justify-between"
            onClick={(e) => {
              e.stopPropagation()
              handlePlaylistClick(playlist.id)
            }}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`relative h-[44px] w-[44px] rounded-lg bg-cover bg-center ${
                  playlist.latest_song_cover
                    ? ''
                    : 'flex items-center justify-center bg-gray-300'
                }`}
                style={
                  playlist.latest_song_cover
                    ? { backgroundImage: `url(${playlist.latest_song_cover})` }
                    : undefined
                }
              >
                {!playlist.latest_song_cover && (
                  <span className="font-pretendard text-lg text-gray-500">
                    +
                  </span>
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
                  toggleDropdown(playlist.id)
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
  )
}
