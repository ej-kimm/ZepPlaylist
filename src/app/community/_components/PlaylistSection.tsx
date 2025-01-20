'use client'

import PlaylistCard from '@/app/community/_components/PlaylistCard'
import defaultProfileImg from '@/assets/images/defaultProfileImg.png'

type PlaylistSectionProps = {
  userId: string
  playlists: {
    id: string
    name: string
    likeCount: number
    likedByUser?: boolean
    profile_image: string | null
    nickname: string | null
  }[]
}

const PlaylistSection = ({ userId, playlists }: PlaylistSectionProps) => {
  return (
    <div>
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          playlist={{
            ...playlist,
            profileImg: playlist.profile_image ?? defaultProfileImg,
            nickName: playlist.nickname || 'Anonymous',
          }}
          userId={userId}
        />
      ))}
    </div>
  )
}

export default PlaylistSection
