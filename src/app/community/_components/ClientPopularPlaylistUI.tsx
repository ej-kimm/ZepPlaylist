'use client'

import defaultProfileImg from '@/assets/images/defaultProfileImg.png'
import { Modal } from '@/components/common'
import usePlaylistLike from '@/hooks/usePlaylistLike'
import type { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const { isLiked, toggleLike, isPending } = usePlaylistLike({
    user_id: userId,
    playlist_id: playlist.id,
  })

  const handleLikeToggle = () => {
    if (!userId) {
      setIsLoginModalOpen(true)
      return
    }

    if (!isPending) {
      toggleLike()
    }
  }

  const handlePlay = () => {
    router.push(`/community/${playlist.id}`)
  }

  const handleConfirmLogin = () => {
    router.push('/login')
  }

  return (
    <>
      <PopularPlaylistUI
        albumCover={playlist.albumCover}
        isLiked={isLiked}
        onLikeToggle={handleLikeToggle}
        onPlay={handlePlay}
        playlistName={playlist.playlistName}
        profileImg={playlist.profileImg || defaultProfileImg}
        nickName={playlist.nickName}
      />

      <Modal
        isOpen={isLoginModalOpen}
        confirmText="로그인"
        cancelText="취소"
        onConfirm={handleConfirmLogin}
        onCancel={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}

export default ClientPopularPlaylistUI
