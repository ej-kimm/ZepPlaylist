import PlaylistItem from '@/components/common/PlaylistItem'
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

  return (
    <>
      <h2 className="title-2 flex h-[40px] items-center justify-start font-pretendard">
        내가 만든 플레이리스트
      </h2>
      <ul className="mt-4">
        <li
          className="flex cursor-pointer items-center justify-start space-x-4 pb-2"
          onClick={() => openModal('add')}
        >
          <div className="flex h-[44px] w-[44px] items-center justify-center rounded-lg bg-[#DFDFDF]">
            <span className="font-pretendard text-lg text-white">+</span>
          </div>
          <p className="caption-1 font-pretendard">새 플레이리스트 만들기</p>
        </li>

        <li
          className="flex cursor-pointer items-center justify-start space-x-4 py-2"
          onClick={handleLikesClick}
        >
          <div
            className="relative h-[44px] w-[44px] rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${latestLikedSongCover})` }}
          ></div>
          <p className="caption-1 font-pretendard">좋아요 표시한 곡</p>
        </li>

        {playlists.map((playlist) => (
          <PlaylistItem
            key={playlist.id}
            playlist={playlist}
            showDropdown={showDropdown}
            toggleDropdown={setShowDropdown}
            handlePlaylistClick={handlePlaylistClick}
            openModal={openModal}
            handleDeletePlaylist={handleDeletePlaylist}
          />
        ))}
      </ul>
    </>
  )
}
