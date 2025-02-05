'use client'

import PlaylistDesktopUI from '@/components/common/PlaylistDesktop'
import { PlaylistRow } from '@/types/playlist'

type PlaylistDesktopProps = {
  playlists: PlaylistRow[]
  handleLikeToggle: (id: string) => void
}

export default function PlaylistDesktop({
  playlists,
  handleLikeToggle,
}: PlaylistDesktopProps) {
  return (
    <div className="w-full bg-white px-[24px]">
      <h2 className="title-2 flex h-[40px] items-center justify-start font-pretendard">
        내가 만든 플레이리스트
      </h2>

      <div className="mt-4 grid grid-cols-5 gap-4">
        {playlists.map((playlist) => (
          <PlaylistDesktopUI
            key={playlist.id}
            album_cover={playlist.latest_song_cover || '/default-cover.jpg'}
            title={playlist.name}
            description={playlist.description || '설명 없음'}
            isLiked={playlist.is_liked}
            onLikeToggle={() => handleLikeToggle(playlist.id)}
          />
        ))}
      </div>
    </div>
  )
}
