'use client';

import Image from 'next/image';

type Song = {
  spotify_id: string;
  title: string;
  artist: string;
  album_cover: string | null;
};

type Comment = {
  id: string;
  created_at: string;
  user_id: string;
  content: string;
};

type CommunityDetailUIProps = {
  songs: Song[];
  comments: Comment[];
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  handleSongClick: () => void;
  handleAddComment: () => Promise<void>;
  handleDeleteComment: (commentId: string) => Promise<void>;
  currentUserId: string | null;
};

export default function CommunityDetailUI({
  songs,
  comments,
  content,
  setContent,
  handleSongClick,
  handleAddComment,
  handleDeleteComment,
  currentUserId,
}: CommunityDetailUIProps) {
  return (
    <div className="flex flex-row gap-8 p-4">
      <div className="flex-1">
        <h1 className="text-xl font-bold">플레이리스트 정보</h1>
        <ul className="mt-6">
          {songs?.length > 0 ? (
            songs.map((song) => (
              <li
                key={song.spotify_id}
                className="flex cursor-pointer items-center justify-between border-b py-2 hover:bg-gray-100"
                onClick={handleSongClick}
              >
                <div className="flex items-center">
                  <div className="relative h-12 w-12">
                    <Image
                      src={song.album_cover || '/default-album-cover.jpg'}
                      alt={`${song.title} 앨범 커버`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">{song.title}</p>
                    <p className="text-sm text-gray-500">{song.artist}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500">노래 정보가 없습니다.</p>
          )}
        </ul>
      </div>

      <div className="flex flex-1 flex-col space-y-4">
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="flex flex-col space-y-2 border-b pb-4"
            >
              <p className="text-gray-700">{comment.content}</p>

              {currentUserId === comment.user_id && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                  >
                    삭제
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center rounded-md border p-2">
          <textarea
            className="flex-1 resize-none border-none p-2 focus:outline-none"
            placeholder="댓글을 입력하세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {content.length > 0 && (
            <button
              onClick={handleAddComment}
              className="ml-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              등록
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
