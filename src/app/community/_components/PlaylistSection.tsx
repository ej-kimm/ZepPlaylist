'use client'

import PlaylistCard from '@/app/community/_components/PlaylistCard'
import defaultProfileImg from '@/assets/images/defaultProfileImg.png'
import type { CommunityPlaylist } from '@/types/communityPlaylists'

export type PlaylistSectionProps = {
  userId: string
  playlists: CommunityPlaylist[]
}

const PlaylistSection = ({ userId, playlists }: PlaylistSectionProps) => {
  return (
    <div>
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          playlist={{
            ...playlist,
            profile_img: playlist.profile_image ?? defaultProfileImg,
            nickName: playlist.nickname || 'Anonymous',
          }}
          userId={userId}
        />
      ))}
    </div>
  )
}

export default PlaylistSection
