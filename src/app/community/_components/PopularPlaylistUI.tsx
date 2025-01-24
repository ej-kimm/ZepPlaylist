'use client'

import imPlay from '@/assets/images/imPlay.svg'
import likeTrue from '@/assets/images/likeTrue.svg'
import whiteHeart from '@/assets/images/whiteHeart.svg'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'

export type PopularPlaylistUIProps = {
  albumCover: string
  isLiked: boolean
  onLikeToggle: () => void
  onPlay: () => void
  playlistName: string
  profileImg: string | StaticImageData
  nickName: string
}

const PopularPlaylistUI = ({
  albumCover,
  isLiked,
  onLikeToggle,
  onPlay,
  playlistName,
  nickName,
}: PopularPlaylistUIProps) => {
  return (
    <div className="flex flex-col items-start">
      <div
        className="relative flex-shrink-0 cursor-pointer overflow-hidden rounded-lg"
        style={{
          width: '140px',
          height: '100px',
        }}
        onClick={onPlay}
      >
        <div
          className="absolute inset-0 -z-10 blur-lg filter"
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${albumCover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <div
          className="absolute"
          style={{
            width: '92px',
            height: '92px',
            top: '4px',
            left: '20px',
          }}
        >
          <Image
            src={albumCover}
            alt="Album Cover"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>

        <button
          className="absolute z-20 flex items-center justify-center"
          style={{
            width: '14px',
            height: '14px',
            top: '8px',
            right: '8px',
          }}
          onClick={(e) => {
            e.stopPropagation()
            onLikeToggle()
          }}
        >
          <Image
            src={isLiked ? likeTrue : whiteHeart}
            alt="Like Button"
            width={20}
            height={20}
          />
        </button>

        <button
          className="absolute z-20 flex items-center justify-center"
          style={{
            width: '18px',
            height: '18px',
            bottom: '8px',
            right: '5px',
          }}
          onClick={(e) => {
            e.stopPropagation()
            onPlay()
          }}
        >
          <Image src={imPlay} alt="Play Button" width={24} height={24} />
        </button>
      </div>

      <div className="mt-2 w-full">
        <h3 className="caption-1 font-bold">{playlistName}</h3>
        <div className="mt-1 flex items-center">
          <span className="caption-2">
            {nickName && nickName.trim() !== '' ? nickName : 'Anonymous'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PopularPlaylistUI
