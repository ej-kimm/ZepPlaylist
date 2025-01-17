// playlistUI.tsx: 플레이리스트 UI만 그려주는 컴포넌트

'use client';

import Image from 'next/image';
import likeTrue from '@/assets/images/likeTrue.svg';
import likeFalse from '@/assets/images/likeFalse.svg';
import Implay3 from '@/assets/images/Implay3.svg';

export type PopularPlaylistUIProps = {
  albumCover: string;
  isLiked: boolean;
  onLikeToggle: () => void;
  onPlay: () => void;
};

const PopularPlaylistUI = ({
  albumCover,
  isLiked,
  onLikeToggle,
  onPlay,
}: PopularPlaylistUIProps) => {
  return (
    <div className="relative w-full h-56 rounded-lg overflow-hidden cursor-pointer">
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
        className="absolute top-2 right-2 w-12 h-12 flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          onLikeToggle();
        }}
      >
        <Image
          src={isLiked ? likeTrue : likeFalse}
          alt="Like Button"
          width={24}
          height={24}
        />
      </button>

      {/* 재생 버튼 */}
      <button
        className="absolute bottom-2 right-2 w-12 h-12 flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          onPlay();
        }}
      >
        <Image src={Implay3} alt="Play Button" width={32} height={32} />
      </button>
    </div>
  );
};

export default PopularPlaylistUI;
