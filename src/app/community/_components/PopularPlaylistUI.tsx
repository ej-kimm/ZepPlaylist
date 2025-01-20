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
      {/* 이미지 및 버튼 영역 */}
      <div
        className="relative flex-shrink-0 cursor-pointer overflow-hidden rounded-lg"
        style={{
          width: '140px', // 전체 컨테이너 너비
          height: '100px', // 전체 컨테이너 높이
        }}
        onClick={onPlay} // 클릭 이벤트 추가
      >
        {/* 블러 처리된 배경 이미지 */}
        <div
          className="absolute inset-0 -z-10 blur-lg filter"
          style={{
            width: '100%', // 배경 너비를 컨테이너 전체로 설정
            height: '100%', // 배경 높이를 컨테이너 전체로 설정
            backgroundImage: `url(${albumCover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        {/* 선명한 앨범 커버 */}
        <div
          className="absolute"
          style={{
            width: '92px',
            height: '92px',
            top: '4px',
            left: '24px',
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

        {/* 좋아요 버튼 */}
        <button
          className="absolute z-20 flex items-center justify-center"
          style={{
            width: '14px',
            height: '14px',
            top: '8px',
            right: '8px',
          }}
          onClick={(e) => {
            e.stopPropagation() // 클릭 이벤트 전파 방지
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

        {/* 재생 버튼 */}
        <button
          className="absolute z-20 flex items-center justify-center"
          style={{
            width: '18px',
            height: '18px',
            bottom: '8px',
            right: '5px',
          }}
          onClick={(e) => {
            e.stopPropagation() // 클릭 이벤트 전파 방지
            onPlay()
          }}
        >
          <Image src={imPlay} alt="Play Button" width={24} height={24} />
        </button>
      </div>

      {/* 플레이리스트 정보 (하단 왼쪽 정렬) */}
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
