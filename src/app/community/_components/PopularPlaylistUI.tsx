'use client'

import imPlay from '@/assets/images/imPlay.svg'
import likeTrue from '@/assets/images/likeTrue.svg'
import whiteHeart from '@/assets/images/whiteHeart.svg'
import clsx from 'clsx'
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
  likeCount: number
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
        className={clsx(
          'relative h-[100px] w-[140px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg',
          'desktop:h-[131px] desktop:w-[184px]',
        )}
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
          className={clsx(
            'absolute left-1/2 top-1/2 h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 transform',
            'desktop:h-[120px] desktop:w-[120px]',
          )}
        >
          <Image
            src={albumCover}
            alt="Album Cover"
            width={100}
            height={100}
            className={clsx(
              'h-[92px] w-[92px] rounded-lg object-cover',
              'desktop:h-[120px] desktop:w-[120px]',
            )}
          />
        </div>

        <button
          className={clsx(
            'absolute right-2 top-2 z-20 flex h-[14px] w-[14px] items-center justify-center',
            'desktop:right-[9px] desktop:top-[11px]',
          )}
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
        <h3
          className={clsx(
            'caption-1 font-bold',
            'desktop:caption-3 desktop:font-semibold',
          )}
        >
          {playlistName}
        </h3>
        <div className="mt-1 flex items-center">
          <span
            className={clsx(
              'caption-2',
              'desktop:caption-1 desktop:text-opacity-60',
            )}
          >
            {nickName && nickName.trim() !== '' ? nickName : 'Anonymous'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PopularPlaylistUI
