'use client'

import likeFalse from '@/assets/images/likeFalse.svg'
import likeTrue from '@/assets/images/likeTrue.svg'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import useIsDesktop from '@/hooks/useIsDesktop'

type PlaylistUIProps = {
  profileImg: string | StaticImageData
  playlistName: string
  nickName: string
  likeCount: number
  isLiked?: boolean
  onLikeToggle: () => void
  onClick?: () => void
  className?: string
}

const PlaylistUI = ({
  profileImg,
  playlistName,
  nickName,
  likeCount,
  isLiked,
  onLikeToggle,
  onClick,
  className,
}: PlaylistUIProps) => {
  const [isClicked, setIsClicked] = useState(isLiked)
  const isDesktop = useIsDesktop(720)

  useEffect(() => {
    setIsClicked(isLiked ?? false)
  }, [isLiked])

  return (
    <div
      className={clsx(
        'mt-4 flex cursor-pointer items-center justify-between bg-white p-4',
        className
      )}
      onClick={onClick}
    >
      <div
        className={clsx(
          'flex-shrink-0 overflow-hidden rounded-full',
          isDesktop ? 'w-14 h-14' : 'w-9 h-9'
        )}
      >
        <Image
          src={profileImg}
          alt="Profile Image"
          width={isDesktop ? 56 : 36}
          height={isDesktop ? 56 : 36}
          className="object-contain"
        />
      </div>
      <div className="ml-4 flex-1">
        <h3 className={clsx(isDesktop ? 'text-[20px]' : 'text-md')}>
          {playlistName}
        </h3>
        <p className={clsx(isDesktop ? 'text-[16px]' : 'caption-2')}>
          {nickName}
        </p>
      </div>

      <div className="flex flex-col items-center">
        <button
          className="text-xl"
          onClick={(e) => {
            e.stopPropagation()
            setIsClicked(!isClicked)
            onLikeToggle()
          }}
        >
          <Image
            src={isClicked ? likeTrue : likeFalse}
            alt={isClicked ? 'Liked' : 'Not Liked'}
            width={isDesktop ? 24 : 16}
            height={isDesktop ? 24 : 16}
          />
        </button>
        <span className="mt-1 text-sm text-gray-600">{likeCount}</span>
      </div>
    </div>
  )
}

export default PlaylistUI