'use client'

import { PlaylistUI } from '@/components/common'
import usePlaylistLike from '@/hooks/usePlaylistLike'
import type { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'

export type PlaylistCardProps = {
  playlist: {
    id: string
    name: string
    likeCount: number
    likedByUser?: boolean
    profileImg: string | StaticImageData
    nickName: string
  }
  userId: string
}

const PlaylistCard = ({ playlist, userId }: PlaylistCardProps) => {
  const router = useRouter()

  const { toggleLike, isLiked, isPending } = usePlaylistLike({
    user_id: userId,
    playlist_id: playlist.id,
  })

  const handleLikeToggle = () => {
    if (!isPending) {
      toggleLike()
    }
  }

  const handleDivClick = () => {
    router.push(`/community/${playlist.id}`)
  }

  return (
    <PlaylistUI
      profileImg={playlist.profileImg}
      playlistName={playlist.name}
      nickName={playlist.nickName}
      likeCount={playlist.likeCount + (isLiked ? 1 : 0)}
      isLiked={isLiked}
      onLikeToggle={handleLikeToggle}
      onClick={handleDivClick}
    />
  )
}

export default PlaylistCard
