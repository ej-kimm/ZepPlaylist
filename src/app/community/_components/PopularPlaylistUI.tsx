'use client'

import Implay from '@/assets/images/Implay.svg'
import likeTrue from '@/assets/images/likeTrue.svg'
import whiteHeart from '@/assets/images/whiteHeart.svg'
import Image from 'next/image'

export type PopularPlaylistUIProps = {
  albumCover: string
  isLiked: boolean
  onLikeToggle: () => void
  onPlay: () => void
}

const PopularPlaylistUI = ({
  albumCover,
  isLiked,
  onLikeToggle,
  onPlay,
}: PopularPlaylistUIProps) => {
  return (
    <div className="relative h-56 w-full cursor-pointer overflow-hidden rounded-lg">
      {/* 앨범 커버 */}
      <Image
        src={albumCover}
        alt="Album Cover"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />

      {/* 좋아요 버튼 */}
      <button
        className="absolute right-2 top-2 flex h-12 w-12 items-center justify-center"
        onClick={(e) => {
          e.stopPropagation()
          onLikeToggle()
        }}
      >
        <Image
          src={isLiked ? likeTrue : whiteHeart}
          alt="Like Button"
          width={24}
          height={24}
        />
      </button>

      {/* 플레이리스트 정보 */}
      <div className="absolute bottom-16 left-2 text-white"></div>

      {/* 좋아요 개수 */}
      <div className="absolute right-2 top-16 text-white"></div>

      {/* 재생 버튼 */}
      <button
        className="absolute bottom-2 right-2 flex h-12 w-12 items-center justify-center"
        onClick={(e) => {
          e.stopPropagation()
          onPlay()
        }}
      >
        <Image src={Implay} alt="Play Button" width={32} height={32} />
      </button>
    </div>
  )
}

export default PopularPlaylistUI
