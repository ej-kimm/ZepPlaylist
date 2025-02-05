'use client'

import likeTrue from '@/assets/images/likeTrue.svg'
import whiteHeart from '@/assets/images/whiteHeart.svg'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'

type PlaylistDesktopUIProps = {
  album_cover: string | undefined
  title: string
  description: string
  isLiked?: boolean
  onLikeToggle: () => void
  onClick?: () => void
  onEdit: () => void
  onDelete: () => void
}

const PlaylistDesktopUI = ({
  album_cover,
  title,
  description,
  isLiked,
  onLikeToggle,
  onClick,
  onEdit,
  onDelete,
}: PlaylistDesktopUIProps) => {
  const [isClicked, setIsClicked] = useState(isLiked)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      className={`relative h-[192px] w-[192px] overflow-hidden rounded-[21.94px] lg:h-[212px] lg:w-[212px] xl:h-[232px] xl:w-[232px] 2xl:h-[252px] 2xl:w-[252px] ${
        album_cover ? '' : 'bg-gray-300'
      }`}
      onClick={onClick}
    >
      <div className="absolute bottom-0 left-0 z-20 h-[40%] w-full bg-gradient-to-b from-transparent via-black/[0.63] to-black/[0.7]"></div>
      {album_cover ? (
        <Image fill alt="" src={album_cover} className="absolute inset-0" />
      ) : (
        <div className="absolute inset-0 bg-gray-300"></div>
      )}

      <div className="absolute bottom-0 left-0 z-20 h-[40%] w-full bg-gradient-to-b from-transparent via-black/[0.63] to-black/[0.7]"></div>

      <div className="absolute right-3 top-3 z-40">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsDropdownOpen(!isDropdownOpen)
          }}
        >
          <FiMoreVertical fontSize={30} color="white" />
        </button>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-32 rounded-md bg-white shadow-lg"
          >
            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation()
                setIsDropdownOpen(false)
                onEdit()
              }}
            >
              수정
            </button>
            <button
              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation()
                setIsDropdownOpen(false)
                onDelete()
              }}
            >
              삭제
            </button>
          </div>
        )}
      </div>

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
          onClick={(e) => {
            e.stopPropagation()
            setIsClicked(!isClicked)
            onLikeToggle()
          }}
        />
      </div>
    </div>
  )
}

export default PlaylistDesktopUI
