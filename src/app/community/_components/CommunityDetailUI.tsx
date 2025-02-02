'use client'

import ChevronDownXL from '@/assets/images/Chevron_Down_XL.svg'
import ChevronUpXL from '@/assets/images/Chevron_Up_XL.svg'
import commentSubmitButton from '@/assets/images/commentSubmit.svg'
import defaultProfileImg from '@/assets/images/defaultProfileImg.png'
import likeFalse from '@/assets/images/likeFalse.svg'
import likeTrue from '@/assets/images/likeTrue.svg'
import moreButton from '@/assets/images/moreButton.svg'
import { Modal } from '@/components/common'
import MusicSaveBottomSheet from '@/components/common/MusicSaveBottomSheet'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null,
  )
  const [isCommentVisible, setIsCommentVisible] = useState(true)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const router = useRouter()

  const handleAddCommentWithRedirect = async () => {
    if (!currentUserId) {
      setIsLoginModalOpen(true)
      return
    }
    await handleAddComment()
  }

  const openDeleteModal = (commentId: string) => {
    setSelectedCommentId(commentId)
    setIsDeleteModalOpen(true)
  }

  const confirmDeleteComment = async () => {
    if (selectedCommentId) {
      await handleDeleteComment(selectedCommentId)
      setSelectedCommentId(null)
      setIsDeleteModalOpen(false)
    }
  }

  const handleMoreButtonClick = (song: Song) => {
    setSelectedSong(song)
    setIsBottomSheetOpen(true)
  }

  const handleConfirmLogin = () => {
    router.push('/login')
  }

  const toggleCommentVisibility = () => {
    setIsCommentVisible((prev) => !prev)
  }

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
                  onClick={(e) => {
                    e.stopPropagation()
                    handleMoreButtonClick(song)
                  }}
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

      {/* 댓글 목록 섹션 */}
      {isCommentVisible && (
        <div className="fixed bottom-16 left-0 right-0 z-10 h-[240px] w-full overflow-y-auto bg-gradient-to-t from-black/50 via-gray-800/30 to-white/10 p-4 shadow-lg backdrop-blur-md">
          {/* 댓글 숨기기 버튼 (우측 상단) */}
          <div className="relative h-8 w-full">
            <button
              onClick={toggleCommentVisibility}
              className="absolute right-3 top-1 flex h-8 w-8 items-center justify-center"
            >
              <Image
                src={ChevronDownXL}
                alt="Hide Comments"
                width={24}
                height={24}
              />
            </button>
          </div>
          <ul className="space-y-4 pt-4">
            {comments.map((comment) => (
              <li key={comment.id} className="flex items-start space-x-4 pb-4">
                <div className="flex-shrink-0 rounded-full">
                  <Image
                    src={comment.profileImage || defaultProfileImg}
                    alt="작성자 프로필 이미지"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <p className="caption-1 flex-1text-gray-500 mt-2">
                    {comment.content}
                  </p>
                  {currentUserId === comment.user_id && (
                    <button
                      onClick={() => openDeleteModal(comment.id)}
                      className="mr-4 flex h-6 w-6 items-center justify-center text-gray-500"
                    >
                      <TbTrash size={20} />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 댓글 입력 섹션 */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-10 h-16 w-full transition-all duration-300 ${
          isCommentVisible ? 'bg-white/50 backdrop-blur-md' : 'bg-white'
        } shadow-lg`}
      >
        <div className="flex items-center gap-2 p-2">
          <input
            type="text"
            className="md:min-w-[120px] h-9 min-w-[50px] flex-1 rounded-full border border-gray-200 px-4 text-sm focus:outline-none"
            placeholder="댓글을 입력해주세요!"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && content.trim().length > 0) {
                handleAddCommentWithRedirect()
              }
            }}
            disabled={!isCommentVisible} // 댓글 숨김 상태에서 입력창 비활성화
          />
          {content.trim().length > 0 && (
            <button
              onClick={handleAddCommentWithRedirect}
              className="ml-2 flex h-8 w-8 flex-shrink-0 items-center justify-center"
              disabled={!isCommentVisible} // 댓글 숨김 상태에서 제출 버튼 비활성화
            >
              <Image
                src={commentSubmitButton}
                alt="Submit Comment"
                width={36}
                height={36}
              />
            </button>
          )}
          {/* 댓글 보이기 버튼 (댓글 숨김 상태일 때만 표시) */}
          {!isCommentVisible && (
            <button
              onClick={toggleCommentVisibility}
              className="ml-1 flex h-8 w-8 items-center justify-center"
            >
              <Image
                src={ChevronUpXL}
                alt="Show Comments"
                width={24}
                height={24}
              />
            </button>
          )}
        </div>
      </div>

      {/* 댓글 삭제 모달 */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="댓글 삭제"
        content="작성한 댓글을 삭제하시겠습니까?"
        type="horizontal"
        onConfirm={confirmDeleteComment}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      <Modal
        isOpen={isLoginModalOpen}
        title="로그인 필요"
        content="댓글을 작성하려면 로그인이 필요합니다."
        type="vertical"
        onConfirm={handleConfirmLogin}
        onCancel={() => setIsLoginModalOpen(false)}
      />

      {selectedSong && (
        <MusicSaveBottomSheet
          musicName={selectedSong.title}
          artistName={selectedSong.artist}
          isOpen={isBottomSheetOpen}
          handleClose={() => setIsBottomSheetOpen(false)}
        />
      )}
    </div>
  )
}
