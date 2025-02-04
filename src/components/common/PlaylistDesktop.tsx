'use client'

import likeTrue from '@/assets/images/likeTrue.svg'
import whiteHeart from '@/assets/images/whiteHeart.svg'
import Image, { type StaticImageData } from 'next/image'
import { useState } from 'react'

type PlaylistDesktopUIProps = {
  album_cover: string | StaticImageData
  title: string
  description: string
  isLiked?: boolean
  onLikeToggle: () => void
}

const PlaylistDesktopUI = ({
  album_cover,
  title,
  description,
  isLiked,
  onLikeToggle,
}: PlaylistDesktopUIProps) => {
  const [isClicked, setIsClicked] = useState(isLiked)

  return (
    <div className="relative h-[192px] w-full overflow-hidden rounded-[21.94px]">
      <div className="absolute bottom-0 left-0 z-20 h-[40%] w-full bg-gradient-to-b from-transparent via-black/[0.63] to-black/[0.7]"></div>
      <Image fill alt="최근 앨범사진" src={album_cover} className="z-10" />
      <div className="absolute bottom-0 z-30 flex w-full items-start justify-between p-2">
        <div>
          <h1 className="text-[#FFFFFF]">{title}</h1>
          <p className="text-[#FFFFFF] opacity-60">{description}</p>
        </div>
        <Image
          className="cursor-pointer"
          src={isClicked ? likeTrue : whiteHeart}
          alt="좋아요 상태"
          width={16}
          height={16}
          onClick={() => {
            setIsClicked(!isClicked)
            onLikeToggle()
          }}
        />
      </div>
    </div>
  )
}

export default PlaylistDesktopUI

// relative h-[192px] w-full
