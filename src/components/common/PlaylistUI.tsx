'use client'

import likeFalse from '@/assets/images/likeFalse.svg'
import likeTrue from '@/assets/images/likeTrue.svg'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'

type PlaylistUIProps = {
  profileImg: string | StaticImageData
  playlistName: string
  nickName: string
  likeCount: number
  isLiked?: boolean
  onLikeToggle: () => void
  onClick?: () => void
}

const PlaylistUI = ({
  profileImg,
  playlistName,
  nickName,
  likeCount,
  isLiked,
  onLikeToggle,
  onClick,
}: PlaylistUIProps) => {
  return (
    <div
      className="mt-4 flex cursor-pointer items-center justify-between rounded-lg bg-white p-4 shadow"
      onClick={onClick}
    >
      {/* 프로필 이미지 */}
      <div
        className="flex-shrink-0 overflow-hidden rounded-full"
        style={{
          width: '36px',
          height: '36px',
        }}
      >
        <Image
          src={profileImg}
          alt="Profile Image"
          width={36}
          height={36}
          className="object-contain"
        />
      </div>

      {/* 제목과 닉네임 */}
      <div className="ml-4 flex-1">
        <h3 className="text-md font-bold">{playlistName}</h3>
        <p className="caption-2">{nickName}</p>
      </div>

      {/* 좋아요 버튼과 개수 */}
      <div className="flex flex-col items-center">
        <button
          className="text-xl"
          onClick={(e) => {
            e.stopPropagation()
            onLikeToggle()
          }}
        >
          <Image
            src={isLiked ? likeTrue : likeFalse}
            alt={isLiked ? 'Liked' : 'Not Liked'}
            width={16}
            height={16}
          />
        </button>
        <span className="mt-1 text-sm text-gray-600">{likeCount}</span>
      </div>
    </div>
  )
}

export default PlaylistUI
