'use client'

import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { supabase } from '@/utils/supabase/client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Song = {
  spotify_id: string
  title: string
  artist: string
  album_cover: string | null
  play_time: number
}

type Comment = {
  id: string
  created_at: string
  user_id: string
  content: string
}

type Props = {
  songs: Song[]
  songCount: number
  comments: Comment[]
  playlistId: string
}

export default function CommunityDetail({
  songs,
  songCount,
  comments: initialComments,
  playlistId,
}: Props) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [content, setContent] = useState<string>('')
  const [editingComment, setEditingComment] = useState<Comment | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const { setTrackIds, togglePlay, playNextTrack, setPlayerOpen } =
    useMusicPlayerStore()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userSession } = await supabase.auth.getSession()
      if (userSession?.session?.user) {
        setCurrentUserId(userSession.session.user.id)
      }
    }
    fetchUser()

    if (songs.length > 0) {
      setTrackIds(songs.map((song) => song.spotify_id))
      setPlayerOpen()
      togglePlay()
    }
  }, [songs, setTrackIds, setPlayerOpen, togglePlay])

  const handleSongClick = () => {
    setTrackIds(songs.map((song) => song.spotify_id))
    playNextTrack()

    const debugState = () => {
      const state = useMusicPlayerStore.getState()
      console.log('Music Player State:', state)
    }

    debugState()
  }

  const handleAddComment = async () => {
    if (!currentUserId) {
      alert('로그인이 필요합니다.')
      return
    }

    const { data, error } = await supabase
      .from('comments')
      .insert({ playlist_id: playlistId, user_id: currentUserId, content })
      .select()
      .single()

    if (error) {
      console.error('Error adding comment:', error.message)
      return
    }

    setComments((prev) => [...prev, data as Comment])
    setContent('')
  }

  const handleDeleteComment = async (commentId: string) => {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)

    if (error) {
      console.error('Error deleting comment:', error.message)
      return
    }

    setComments((prev) => prev.filter((comment) => comment.id !== commentId))
  }

  const handleUpdateComment = async () => {
    if (!editingComment) return

    const { error } = await supabase
      .from('comments')
      .update({ content: editingComment.content })
      .eq('id', editingComment.id)

    if (error) {
      console.error('Error updating comment:', error.message)
      return
    }

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === editingComment.id
          ? { ...comment, content: editingComment.content }
          : comment,
      ),
    )

    setEditingComment(null)
  }

  return (
    <div className="flex flex-row gap-8 p-4">
      <div className="flex-1">
        <h1 className="text-xl font-bold">플레이리스트 정보</h1>
        <h2 className="mt-4 text-lg font-semibold">총 곡 수: {songCount}</h2>

        <ul className="mt-6">
          {songs?.length > 0 ? (
            songs.map((song) => (
              <li
                key={song.spotify_id}
                className="flex cursor-pointer items-center justify-between border-b py-2 hover:bg-gray-100"
                onClick={() => handleSongClick()}
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
                <p className="text-sm text-gray-600">
                  {formatPlayTime(song.play_time)}
                </p>
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
              {editingComment?.id === comment.id ? (
                <textarea
                  className="w-full resize-none rounded-md border p-2"
                  value={editingComment.content}
                  onChange={(e) =>
                    setEditingComment((prev) =>
                      prev ? { ...prev, content: e.target.value } : null,
                    )
                  }
                />
              ) : (
                <p className="text-gray-700">{comment.content}</p>
              )}

              {currentUserId === comment.user_id && (
                <div className="flex space-x-2">
                  {editingComment?.id === comment.id ? (
                    <>
                      <button
                        onClick={handleUpdateComment}
                        className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
                      >
                        저장
                      </button>
                      <button
                        onClick={() => setEditingComment(null)}
                        className="rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-600"
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingComment(comment)}
                        className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                      >
                        삭제
                      </button>
                    </>
                  )}
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
  )
}

function formatPlayTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
