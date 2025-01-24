'use client'

import commentSubmitButton from '@/assets/images/commentSubmit.svg'
import defaultProfileImg from '@/assets/images/defaultProfileImg.png'
import likeFalse from '@/assets/images/likeFalse.svg'
import likeTrue from '@/assets/images/likeTrue.svg'
import moreButton from '@/assets/images/moreButton.svg'
import Image from 'next/image'
import { TbTrash } from 'react-icons/tb'

type Song = {
  spotify_id: string
  title: string
  artist: string
  album_cover: string | null
}

type Comment = {
  id: string
  created_at: string
  user_id: string
  content: string
  profileImage?: string | null
}

type CommunityDetailUIProps = {
  nickname: string
  profileImage: string | null
  description: string | null
  playlistName: string
  songs: Song[]
  comments: Comment[]
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
  handleSongClick: () => void
  handleAddComment: () => Promise<void>
  handleDeleteComment: (commentId: string) => Promise<void>
  currentUserId: string | null
  isLiked: boolean
  onLikeToggle: () => Promise<void>
}

export default function CommunityDetailUI({
  nickname,
  profileImage,
  description,
  playlistName,
  songs,
  comments,
  content,
  setContent,
  handleSongClick,
  handleAddComment,
  handleDeleteComment,
  currentUserId,
  isLiked,
  onLikeToggle,
}: CommunityDetailUIProps) {
  return (
    <div>
      {/* 상단 정보 */}
      <div>
        <div className="flex w-full items-center justify-between">
          <h1 className="title-1 mb-2 mt-2">{playlistName}</h1>
          <button onClick={onLikeToggle} className="mb-2 mt-2 h-6 w-6">
            <Image
              src={isLiked ? likeTrue : likeFalse}
              alt="Like Button"
              width={16}
              height={16}
            />
          </button>
        </div>
        <p className="body-1 mb-2">{description || '설명이 없습니다.'}</p>
        <div className="flex items-center gap-2">
          <div
            className="flex-shrink-0 overflow-hidden rounded-full"
            style={{
              width: '24px',
              height: '24px',
            }}
          >
            <Image
              src={profileImage || defaultProfileImg}
              alt="프로필 이미지"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="caption-2">{nickname}</span>
        </div>
      </div>

      {/* 노래 목록 */}
      <div className="flex flex-col">
        <ul className="mt-4">
          {songs.length > 0 ? (
            songs.map((song) => (
              <li
                key={song.spotify_id}
                className="flex items-center justify-between py-4"
                onClick={() => handleSongClick()}
              >
                <div className="flex items-center">
                  <div className="relative h-12 w-12">
                    <Image
                      src={song.album_cover || '이미지가 없습니다.'}
                      alt={`${song.title} 앨범 커버`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold">{song.title}</p>
                    <p className="text-xs text-gray-500">{song.artist}</p>
                  </div>
                </div>
                <button
                  className="h-6 w-6"
                  onClick={() => handleMoreButtonClick(song)}
                >
                  <Image
                    src={moreButton}
                    alt="More Options"
                    width={24}
                    height={24}
                  />
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500">노래 정보가 없습니다.</p>
          )}
        </ul>
      </div>

      {/* 댓글 섹션 */}
      <div className="fixed bottom-0 left-0 right-0 z-10 h-[240px] w-full bg-gradient-to-t from-black/50 via-gray-800/30 to-white/10 shadow-lg backdrop-blur-md">
        <div className="flex h-full flex-col">
          {/* 댓글 목록 */}
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-4">
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="flex items-start space-x-4 pb-4"
                >
                  {/* 댓글 작성자의 프로필 이미지 */}
                  <div className="flex-shrink-0 rounded-full">
                    <Image
                      src={comment.profileImage || defaultProfileImg}
                      alt="작성자 프로필 이미지"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>

                  {/* 댓글 내용과 삭제 버튼을 묶는 컨테이너 */}
                  <div className="flex flex-1 items-center justify-between">
                    {/* 댓글 내용 */}
                    <p className="caption-1 flex-1text-gray-500 mt-2">
                      {comment.content}
                    </p>

                    {/* 삭제 버튼 */}
                    {currentUserId === comment.user_id && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="flex h-6 w-6 items-center justify-center text-gray-500"
                      >
                        <TbTrash size={20} />
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 댓글 입력 */}
          <div className="flex items-center rounded-t-md border-t p-2">
            <input
              type="text"
              className="h-8 flex-1 rounded border border-gray-300 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="댓글을 입력하세요..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && content.trim().length > 0) {
                  handleAddComment()
                }
              }}
            />
            {content.trim().length > 0 && (
              <button
                onClick={handleAddComment}
                className="ml-2 flex h-8 w-8 items-center justify-center"
              >
                <Image
                  src={commentSubmitButton}
                  alt="Submit Comment"
                  width={36}
                  height={36}
                />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 바텀시트 */}
      {/* <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        height="50%"
      >
        {selectedSong && (
          <div className="p-4">
            <h3 className="truncate text-lg font-medium">
              {selectedSong.title}
            </h3>
            <p className="truncate text-base text-gray-500">
              {selectedSong.artist}
            </p>
            <div className="mt-4"></div>
          </div>
        )}
      </BottomSheet> */}
    </div>
  )
}
