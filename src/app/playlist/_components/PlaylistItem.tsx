import { PlaylistRow } from '@/types/playlist'
import { FaEllipsisH, FaEllipsisV, FaLock } from 'react-icons/fa'

type PlaylistItemProps = {
  playlist: Pick<PlaylistRow, 'id'> & Partial<PlaylistRow>
  showDropdown: string | null
  toggleDropdown: (id: string) => void
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
  return (
    <li
      key={playlist.id}
      className="flex cursor-pointer items-center justify-between p-2"
      onClick={(e) => {
        e.stopPropagation()
        if (handlePlaylistClick) handlePlaylistClick(playlist.id)
      }}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`relative h-[44px] w-[44px] rounded-lg bg-cover bg-center ${
            playlist.latest_song_cover ? '' : 'bg-gray-300'
          }`}
          style={{
            backgroundImage: playlist.latest_song_cover
              ? `url(${playlist.latest_song_cover})`
              : undefined,
          }}
        >
          {!isDetailPage && !playlist.is_public && (
            <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black bg-opacity-50">
              <FaLock className="text-xs text-white" />
            </div>
          )}
        </div>
        <div>
          <p className="caption-1 font-pretendard">
            {playlist.name || '제목 없음'}
          </p>
          <p className="text-sm text-gray-500">
            {playlist.description || '아티스트 정보 없음'}
          </p>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleDropdown(playlist.id ?? '')
          }}
          className="text-xl text-gray-500"
        >
          {isDetailPage ? <FaEllipsisH /> : <FaEllipsisV />}
        </button>

        {showDropdown === playlist.id && (
          <div className="absolute right-0 mt-2 w-24 rounded-lg bg-white shadow-lg">
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
