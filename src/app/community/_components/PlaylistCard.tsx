'use client'

import { Modal, PlaylistUI } from '@/components/common'
import usePlaylistLike from '@/hooks/usePlaylistLike'
import type { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export type PlaylistCardProps = {
  playlist: {
    id: string
    name: string
    likeCount: number
    likedByUser?: boolean
    profileImg: string | StaticImageData
    nickName: string
  }
  userId: string | null
}

const PlaylistCard = ({ playlist, userId }: PlaylistCardProps) => {
  const router = useRouter()

  const { toggleLike, isLiked, isPending } = usePlaylistLike({
    user_id: userId || '',
    playlist_id: playlist.id,
  })

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleLikeToggle = () => {
    if (!userId) {
      setIsLoginModalOpen(true)
      return
    }

    if (!isPending) {
      toggleLike()
    }
  }

  const handleDivClick = () => {
    router.push(`/community/${playlist.id}`)
  }

  const handleConfirmLogin = () => {
    router.push('/login')
  }

  return (
    <>
      <PlaylistUI
        profileImg={playlist.profileImg}
        playlistName={playlist.name}
        nickName={playlist.nickName}
        likeCount={playlist.likeCount + (isLiked ? 1 : 0)}
        isLiked={isLiked}
        onLikeToggle={handleLikeToggle}
        onClick={handleDivClick}
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

export default PlaylistCard
