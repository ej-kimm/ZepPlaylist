'use client'

import ChevronDownXL from '@/assets/images/Chevron_Down_XL.svg'
import ChevronUpXL from '@/assets/images/Chevron_Up_XL.svg'
import commentSubmitButton from '@/assets/images/commentSubmit.svg'
import CommunityWebCircle from '@/assets/images/communityWebCircle.svg'
import defaultProfileImg from '@/assets/images/defaultProfileImg.png'
import likeFalse from '@/assets/images/likeFalse.svg'
import likeTrue from '@/assets/images/likeTrue.svg'
import moreButton from '@/assets/images/moreButton.svg'
import { Modal, MusicSaveModal } from '@/components/common'
import MusicSaveBottomSheet from '@/components/common/MusicSaveBottomSheet'
import useIsDesktop from '@/hooks/useIsDesktop'
import type { SpotifyTrack } from '@/types/billboradCharts'
import type { Comment } from '@/types/comment'
import type { CommunitySong } from '@/types/communitySong'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { TbTrash } from 'react-icons/tb'

type CommunityDetailUIProps = {
  nickname: string
  profileImage: string | null
  description: string | null
  playlistName: string
  songs: CommunitySong[]
  comments: Comment[]
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
  handleAddComment: () => Promise<void>
  handleDeleteComment: (commentId: string) => Promise<void>
  currentUserId: string | null
  isLiked: boolean
  onLikeToggle: () => Promise<void>
  handlePlayFromIndex: (index: number) => void
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
  handlePlayFromIndex,
  handleAddComment,
  handleDeleteComment,
  currentUserId,
  isLiked,
  onLikeToggle,
}: CommunityDetailUIProps) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [selectedSong, setSelectedSong] = useState<SpotifyTrack>()
  console.log('CommunityDetailUI', selectedSong)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null,
  )
  const [isCommentVisible, setIsCommentVisible] = useState(true)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const isDesktop = useIsDesktop(720)

  const router = useRouter()

  const handleAddCommentWithRedirect = async () => {
    if (!currentUserId) {
      setIsLoginModalOpen(true)
      return
    }
    await handleAddComment()
    console.log('API Response:', comments)
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

  const handleMoreButtonClick = (song: CommunitySong) => {
    const newSong = {
      id: song.spotify_id,
      artist: song.artist,
      title: song.title,
      albumCover: song.album_cover!,
    }
    setSelectedSong(newSong)
    setIsBottomSheetOpen(true)
  }

  const handleConfirmLogin = () => {
    router.push('/login')
  }

  const toggleCommentVisibility = () => {
    setIsCommentVisible((prev) => !prev)
  }

  return (
    <div
      className={clsx(
        'flex flex-col',
        'desktop:flex-row desktop:items-start desktop:gap-20',
      )}
    >
      {/* 노래 목록 섹션 (60%) */}
      <div className={clsx('flex-1', 'desktop:max-w-[60%]')}>
        {/* 상단 정보 (모바일) */}
        <div className="desktop:hidden">
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
              style={{ width: '24px', height: '24px' }}
            >
              <Image
                src={profileImage || defaultProfileImg}
                alt="프로필 이미지"
                width={24}
                height={24}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="caption-2">{nickname}</span>
          </div>
        </div>

        {/* 상단 정보 (PC) */}
        <div className="hidden desktop:block">
          <div className="flex w-full items-center justify-between">
            <h1 className="headline-1 mt-12">{playlistName}</h1>
            <button onClick={onLikeToggle} className="mt-12 h-8 w-8">
              <Image
                src={isLiked ? likeTrue : likeFalse}
                alt="Like Button"
                width={24}
                height={24}
              />
            </button>
          </div>
          <p className="caption-3 mt-3">{description || '설명이 없습니다.'}</p>
          <div className="flex items-center gap-3">
            <div
              className="mb-10 mt-3 flex-shrink-0 overflow-hidden rounded-full"
              style={{ width: '36px', height: '36px' }} // PC에서 프로필 이미지 크기 증가
            >
              <Image
                src={profileImage || defaultProfileImg}
                alt="프로필 이미지"
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="caption-1 mb-10 mt-3">{nickname}</span>
          </div>
        </div>

        {/* 노래 목록 */}
        <div className="flex flex-col">
          <ul className="mb-12">
            {songs.length > 0 ? (
              songs.map((song, index) => (
                <li
                  key={song.spotify_id}
                  className={clsx(
                    'flex cursor-pointer items-center justify-between py-4',
                    'desktop:hidden', // PC에서는 모바일 버전 숨김
                  )}
                  onClick={() => handlePlayFromIndex(index)}
                >
                  {/* 모바일 버전 (기존 코드 유지) */}
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

            {/* PC 버전 추가 */}
            {songs.length > 0 &&
              songs.map((song, index) => (
                <li
                  key={`pc-${song.spotify_id}`}
                  className={clsx(
                    'hidden cursor-pointer items-center justify-between py-4',
                    'desktop:flex', // PC에서만 표시
                  )}
                  onClick={() => handlePlayFromIndex(index)}
                >
                  {/* 앨범 커버 */}
                  <div className="relative h-[54px] w-[54px] flex-shrink-0">
                    <Image
                      src={song.album_cover || '이미지가 없습니다.'}
                      alt={`${song.title} 앨범 커버`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>

                  {/* 텍스트 정보 (가로 배치) */}
                  <div className="flex flex-1 items-center justify-between text-center">
                    <p className="body-2 flex-1">{song.title}</p>
                    <p className="caption-1 flex-1">{song.artist}</p>
                    <p className="caption-1 flex-1">{song.album_name}</p>
                  </div>

                  {/* 커뮤니티 웹 서클 아이콘 */}
                  <button
                    className="h-9 w-9 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleMoreButtonClick(song)
                    }}
                  >
                    <Image
                      src={CommunityWebCircle}
                      alt="More Options"
                      width={36}
                      height={36}
                    />
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* 웹 전용 댓글 섹션 (40%) */}
      <div
        className={clsx(
          'hidden desktop:block desktop:max-w-[40%] desktop:flex-1',
          'desktop:sticky desktop:top-4 desktop:h-[calc(100vh-140px)]',
          'relative', // 추가
        )}
      >
        {/* 블러 배경 레이어 */}
        <div
          className="absolute inset-0 z-0 bg-gradient-to-t from-black/70 via-gray-800/30 to-white/10 p-4 shadow-lg backdrop-blur-[6px]"
          aria-hidden="true"
        />
        <div className="relative z-10 flex h-full flex-col gap-4 bg-transparent">
          {/* 댓글 목록 */}
          <div className="flex-1 overflow-y-auto [&>*]:bg-transparent">
            <ul className="space-y-4 bg-transparent pl-4">
              {comments.map((comment) => (
                <li key={comment.id} className="flex items-start gap-4 py-2">
                  <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={comment.users?.profile_image || defaultProfileImg}
                      alt="프로필"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="mt-1 text-sm font-medium">
                        {comment.users?.nickname}:
                      </span>
                      <p className="flex-1 text-sm">{comment.content}</p>
                      {currentUserId === comment.user_id && (
                        <button
                          onClick={() => openDeleteModal(comment.id)}
                          className="hover:text-bold mr-4 text-gray-600"
                        >
                          <TbTrash size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 웹 댓글 입력창 */}
          <div className="sticky bottom-0 border-t border-white/20 bg-white/10 backdrop-blur-[6px]">
            <div className="flex items-center px-4 py-4">
              <input
                type="text"
                className="flex-1 rounded-lg border border-white/20 bg-white px-4 py-2 text-sm text-black focus:outline-none"
                placeholder="댓글을 입력해주세요!"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && content.trim().length > 0) {
                    handleAddCommentWithRedirect()
                  }
                }}
              />
              {content.trim().length > 0 && (
                <button
                  onClick={handleAddCommentWithRedirect}
                  className="ml-2 flex h-8 w-8 flex-shrink-0 items-center justify-center"
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
      </div>

      {/* 모바일 댓글 섹션 */}
      <div className="desktop:hidden">
        {isCommentVisible && (
          <div className="fixed bottom-28 left-0 right-0 z-10 h-[240px] w-full overflow-y-auto bg-gradient-to-t from-black/50 via-gray-800/30 to-white/10 p-4 shadow-lg backdrop-blur-[6px]">
            <div className="relative h-8 w-full">
              <button
                onClick={toggleCommentVisibility}
                className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center"
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
                <li
                  key={comment.id}
                  className="flex items-start space-x-4 pb-4"
                >
                  <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={comment.users?.profile_image || defaultProfileImg}
                      alt="프로필"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-1 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="caption-1 text-sm font-medium text-white">
                        {comment.users?.nickname}:
                      </span>
                      <p className="caption-1 flex-1 text-sm text-white">
                        {comment.content}
                      </p>
                      {currentUserId === comment.user_id && (
                        <button
                          onClick={() => openDeleteModal(comment.id)}
                          className="mr-3 text-white"
                        >
                          <TbTrash size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 모바일 댓글 입력창 */}
        <div
          className={`fixed bottom-12 left-0 right-0 z-10 h-16 w-full transition-all duration-300 ${isCommentVisible ? 'bg-black/50 backdrop-blur-[5px]' : 'bg-black/50 backdrop-blur-[5px]'} shadow-lg`}
        >
          <div className="flex items-center gap-2 p-2">
            <input
              type="text"
              className="h-9 min-w-[50px] flex-1 rounded-lg border border-gray-200 bg-white px-4 text-sm focus:outline-none md:min-w-[120px]"
              placeholder="댓글을 입력해주세요!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && content.trim().length > 0) {
                  handleAddCommentWithRedirect()
                }
              }}
              disabled={!isCommentVisible}
            />
            {isCommentVisible && content.trim().length > 0 && (
              <button
                onClick={handleAddCommentWithRedirect}
                className="ml-1 flex h-8 w-8 flex-shrink-0 items-center justify-center"
                disabled={!isCommentVisible}
              >
                <Image
                  src={commentSubmitButton}
                  alt="Submit Comment"
                  width={36}
                  height={36}
                />
              </button>
            )}
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
      </div>

      {/* 모달 및 기타 요소 */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="댓글 삭제"
        content="작성한 댓글을 삭제하시겠습니까?"
        type="horizontal"
        onConfirm={confirmDeleteComment}
        onCancel={() => setIsDeleteModalOpen(false)}
        className="desktop:w-[434px]"
      />

      <Modal
        isOpen={isLoginModalOpen}
        title="로그인 필요"
        content="댓글을 작성하려면 로그인이 필요합니다."
        type="vertical"
        onConfirm={handleConfirmLogin}
        onCancel={() => setIsLoginModalOpen(false)}
        className="desktop:w-[434px]"
      />

      {selectedSong && (
        <>
          {isDesktop ? (
            <MusicSaveModal
              isOpen={isBottomSheetOpen}
              handleClose={() => setIsBottomSheetOpen(false)}
              musicName={selectedSong.title}
              artistName={selectedSong.artist}
            />
          ) : (
            <MusicSaveBottomSheet
              isOpen={isBottomSheetOpen}
              handleClose={() => setIsBottomSheetOpen(false)}
              musicName={selectedSong.title}
              artistName={selectedSong.artist}
              musicData={selectedSong}
            />
          )}
        </>
      )}
    </div>
  )
}
