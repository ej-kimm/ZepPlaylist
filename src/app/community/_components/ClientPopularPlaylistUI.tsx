'use client'

import defaultProfileImg from '@/assets/images/defaultProfileImg.png'
import usePlaylistLike from '@/hooks/usePlaylistLike'
import type { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'
import PopularPlaylistUI from './PopularPlaylistUI'

type ClientPopularPlaylistUIProps = {
  playlist: {
    albumCover: string
    isLiked: boolean
    id: string
    playlistName: string
    profileImg: string | StaticImageData
    nickName: string
  }
  userId: string
}

const ClientPopularPlaylistUI: React.FC<ClientPopularPlaylistUIProps> = ({
  playlist,
  userId,
}) => {
  const router = useRouter()

  const { isLiked, toggleLike, isPending, likeCount } = usePlaylistLike({
    user_id: userId,
    playlist_id: playlist.id,
  })

  const handleLikeToggle = () => {
    if (!isPending) {
      toggleLike()
    }
  }

  const handlePlay = () => {
    router.push(`/community/${playlist.id}`)
  }

  return (
    <PopularPlaylistUI
    likeCount={likeCount}
      albumCover={playlist.albumCover}
      isLiked={isLiked}
      onLikeToggle={handleLikeToggle}
      onPlay={handlePlay}
      playlistName={playlist.playlistName}
      profileImg={playlist.profileImg || defaultProfileImg}
      nickName={playlist.nickName}
    />
  )
}

export default ClientPopularPlaylistUI
