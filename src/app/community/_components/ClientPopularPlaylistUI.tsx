'use client'

import { useRouter } from 'next/navigation'
import PopularPlaylistUI from './PopularPlaylistUI'

type ClientPopularPlaylistUIProps = {
  playlist: {
    albumCover: string
    isLiked: boolean
    likeCount: number
    id: string
  }
}

const ClientPopularPlaylistUI: React.FC<ClientPopularPlaylistUIProps> = ({
  playlist,
}) => {
  const router = useRouter()
  const handleLikeToggle = () => {
    console.log('Like toggled for', playlist.id)
  }

  const handlePlay = () => {
    router.push(`/community/${playlist.id}`)
  }

  return (
    <PopularPlaylistUI
      albumCover={playlist.albumCover}
      isLiked={playlist.isLiked}
      onLikeToggle={handleLikeToggle}
      onPlay={handlePlay}
    />
  )
}

export default ClientPopularPlaylistUI
