'use client';

type PlaylistCardProps = {
  playlist: {
    id: string;
    description: string;
  };
  likeCount: number; // 좋아요 수를 별도로 전달
  liked: boolean; // 좋아요 상태 제거
  onLikeToggle: () => void; // 클릭 이벤트 제거
};

const PlaylistCard = ({
  playlist,
  likeCount,
  liked,
  onLikeToggle,
}: PlaylistCardProps) => {
  return (
    <div className="rounded border p-4 shadow">
      <h3 className="text-lg font-bold">{playlist.description}</h3>
      <p className="text-gray-600">좋아요: {likeCount}</p>
      <button
        className={`mt-2 px-4 py-2 text-white ${
          liked ? 'bg-red-500' : 'bg-gray-500'
        }`}
        onClick={onLikeToggle}
      >
        {liked ? 'Unlike' : 'Like'}
      </button>
    </div>
  );
};

export default PlaylistCard;
