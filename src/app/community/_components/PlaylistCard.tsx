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
    profile_img: string | StaticImageData
    nickName: string
  }
  userId: string | null
}

const PlaylistCard = ({ playlist, userId }: PlaylistCardProps) => {
  const router = useRouter()

  const { toggleLike, isLiked, isPending, likeCount } = usePlaylistLike({
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
        profileImg={playlist.profile_img}
        playlistName={playlist.name}
        nickName={playlist.nickName}
        likeCount={likeCount}
        isLiked={isLiked}
        onLikeToggle={handleLikeToggle}
        onClick={handleDivClick}
      />
      <Modal
        isOpen={isLoginModalOpen}
        title="로그인 필요"
        content="좋아요를 누르려면 로그인이 필요합니다."
        type="horizontal"
        onConfirm={handleConfirmLogin}
        onCancel={() => setIsLoginModalOpen(false)}
        className="desktop:w-[434px]"
      />
    </>
  )
}

export default PlaylistCard
