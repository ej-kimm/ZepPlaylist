import lock from '@/assets/images/lock.svg'
import { PlaylistRow } from '@/types/playlist'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { FiMoreHorizontal, FiMoreVertical } from 'react-icons/fi'

type PlaylistItemProps = {
  playlist: Pick<PlaylistRow, 'id'> & Partial<PlaylistRow>
  showDropdown: string | null
  toggleDropdown: (id: string | null) => void
  handlePlaylistClick?: (playlistId: string) => void
  handleDeletePlaylist?: (playlistId: string) => void
  handleDeleteSong?: (songId: string) => void
  openModal?: (type: 'add' | 'edit', playlist?: PlaylistRow) => void
  isDetailPage?: boolean
}

export default function PlaylistItem({
  playlist,
  showDropdown,
  toggleDropdown,
  handlePlaylistClick,
  handleDeletePlaylist,
  handleDeleteSong,
  openModal,
  isDetailPage = false,
}: PlaylistItemProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        toggleDropdown(null)
      }
    }

    if (showDropdown === playlist.id) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown, playlist.id, toggleDropdown])

  return (
    <li
      key={playlist.id}
      className="flex cursor-pointer items-center justify-between py-2"
      onClick={(e) => {
        e.stopPropagation()
        if (handlePlaylistClick) handlePlaylistClick(playlist.id)
      }}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`relative h-[44px] w-[44px] flex-shrink-0 rounded-lg bg-cover bg-center ${
            playlist.latest_song_cover
              ? ''
              : 'flex items-center justify-center bg-gray-300'
          }`}
          style={{
            backgroundImage: playlist.latest_song_cover
              ? `url(${playlist.latest_song_cover})`
              : undefined,
          }}
        >
          {!isDetailPage && !playlist.is_public && (
            <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black bg-opacity-40">
              <Image
                src={lock}
                width={12}
                height={12}
                alt="lock"
                className="relative flex h-3 w-3 items-center justify-center"
              />
            </div>
          )}
        </div>
        <div className="flex w-full flex-col justify-center">
          <p className="button-2 mb-1">{playlist.name || '제목 없음'}</p>
          <p className="caption-2 text-opacity-60">
            {playlist.description || '아티스트 정보 없음'}
          </p>
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleDropdown(showDropdown === playlist.id ? null : playlist.id)
          }}
          className="text-xl text-gray-500"
        >
          {isDetailPage ? (
            <FiMoreHorizontal fontSize={24} color="black" />
          ) : (
            <FiMoreVertical fontSize={24} color="black" />
          )}
        </button>

        {showDropdown === playlist.id && (
          <div className="absolute right-0 top-3 mt-2 w-24 rounded-lg bg-white shadow-lg">
            {!isDetailPage ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (openModal) openModal('edit', playlist as PlaylistRow)
                  }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  수정
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (playlist.id) handleDeletePlaylist?.(playlist.id)
                  }}
                >
                  삭제
                </button>
              </>
            ) : (
              <button
                className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation()
                  if (playlist.id) handleDeleteSong?.(playlist.id)
                }}
              >
                삭제
              </button>
            )}
          </div>
        )}
      </div>
    </li>
  )
}
