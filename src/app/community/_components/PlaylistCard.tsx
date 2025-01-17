'use client';

import usePlaylistLike from '@/hooks/usePlaylistLike';
import { useRouter } from 'next/navigation';
import { AiTwotoneHeart } from 'react-icons/ai';
import { BiHeart } from 'react-icons/bi';

type PlaylistCardProps = {
  playlist: {
    id: string;
    name: string;
    likeCount: number;
    likedByUser?: boolean;
  };
  userId: string;
};

const PlaylistCard = ({ playlist, userId }: PlaylistCardProps) => {
  const router = useRouter();

  const { toggleLike, isLiked, isPending } = usePlaylistLike({
    user_id: userId,
    playlist_id: playlist.id,
  });

  const handleLikeToggle = () => {
    if (!isPending) {
      toggleLike();
    }
  };

  const handleDivClick = () => {
    router.push(`/community/${playlist.id}`);
  };

  return (
    <div
      className="mt-8 cursor-pointer rounded border p-4 shadow"
      onClick={handleDivClick}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{playlist.name}</h3>
        <button
          className="text-2xl"
          onClick={(e) => {
            e.stopPropagation();
            handleLikeToggle();
          }}
        >
          {isLiked ? (
            <AiTwotoneHeart className="text-red-500" />
          ) : (
            <BiHeart className="text-gray-500" />
          )}
        </button>
      </div>
      <p className="mt-2 text-gray-600">
        좋아요: {playlist.likeCount + (isLiked ? 1 : 0)}
      </p>
    </div>
  );
};

export default PlaylistCard;
