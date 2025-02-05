'use client'

import PlaylistDesktopUI from '@/components/common/PlaylistDesktop'
import { PlaylistRow } from '@/types/playlist'

type PlaylistDesktopProps = {
  playlists: PlaylistRow[]
  latestLikedSongCover: string | null
  handlePlaylistClick: (playlistId: string) => void
  handleLikesClick: () => void
  openModal: (type: 'add' | 'edit', playlist?: PlaylistRow) => void
  handleLikeToggle: (playlistId: string) => void
  handleEditPlaylist: (playlist: PlaylistRow) => void
  handleDeletePlaylist: (playlistId: string) => void
}

export default function PlaylistDesktop({
  playlists,
  latestLikedSongCover,
  handlePlaylistClick,
  handleLikesClick,
  openModal,
  handleDeletePlaylist,
  handleEditPlaylist,
  handleLikeToggle,
}: PlaylistDesktopProps) {
  return (
    <div className="mx-auto max-w-full">
      <h2 className="title-3 mb-24 mt-24 font-pretendard">
        내가 만든 플레이리스트
      </h2>
      <div className="mx-auto grid grid-cols-5 justify-center gap-6">
        <div
          className="relative flex h-[192px] w-[192px] cursor-pointer items-center justify-center overflow-hidden rounded-[21.94px] bg-gray-300 lg:h-[212px] lg:w-[212px] xl:h-[232px] xl:w-[232px] 2xl:h-[252px] 2xl:w-[252px]"
          onClick={() => openModal('add')}
        >
          <span className="absolute text-white" style={{ fontSize: '96px' }}>
            +
          </span>

          <div
            className="absolute bottom-0 left-0 h-[70%] w-full rounded-[21.94px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 40%, rgba(0, 0, 0, 0.63) 80.89%, rgba(0, 0, 0, 0.70) 100%)',
            }}
          />

          <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 transform">
            <p className="text-lg font-semibold text-white opacity-100">
              새 플레이리스트
            </p>
          </div>
        </div>

        <div
          className={`relative h-[192px] w-[192px] cursor-pointer overflow-hidden rounded-[21.94px] bg-cover bg-center lg:h-[212px] lg:w-[212px] xl:h-[232px] xl:w-[232px] 2xl:h-[252px] 2xl:w-[252px] ${
            latestLikedSongCover ? '' : 'bg-gray-300'
          }`}
          style={{
            backgroundImage: latestLikedSongCover
              ? `url(${latestLikedSongCover})`
              : undefined,
          }}
          onClick={handleLikesClick}
        >
          <div className="absolute bottom-0 left-0 z-20 h-[40%] w-full bg-gradient-to-b from-transparent via-black/[0.63] to-black/[0.7]"></div>
          <div className="absolute bottom-0 z-30 flex w-full items-start justify-between p-4">
            <p className="text-lg text-[#FFFFFF]">좋아요 표시한 곡</p>
          </div>
        </div>

        {playlists.map((playlist) => (
          <PlaylistDesktopUI
            key={playlist.id}
            album_cover={playlist.latest_song_cover || undefined}
            title={playlist.name}
            description={playlist.description || '설명 없음'}
            isLiked={playlist.is_liked}
            onLikeToggle={() => handleLikeToggle(playlist.id)}
            onClick={() => handlePlaylistClick(playlist.id)}
            onEdit={() => handleEditPlaylist(playlist)}
            onDelete={() => handleDeletePlaylist(playlist.id)}
          />
        ))}
      </div>
    </div>
  )
}
