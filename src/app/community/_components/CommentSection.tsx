'use client'

import { Modal } from '@/components/common'
import usePlaylistLike from '@/hooks/usePlaylistLike'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { supabase } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import CommunityDetailUI from './CommunityDetailUI'

type User = {
  profile_image: string | null
}

type Song = {
  spotify_id: string
  title: string
  artist: string
  album_cover: string | null
}

type Comment = {
  users?: User
  id: string
  created_at: string
  user_id: string
  content: string
  profile_image?: string | null
}

type Props = {
  songs: Song[]
  comments: Comment[]
  playlistId: string
  nickname: string
  profileImage: string | null
  description: string | null
  playlistName: string
  isLiked: boolean
}

export default function CommentSection({
  songs,
  comments: initialComments,
  playlistId,
  nickname,
  profileImage,
  description,
  playlistName,
}: Props) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [content, setContent] = useState<string>('')
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const { setTrackIds, playNextTrack, setPlayerOpen, play } =
    useMusicPlayerStore()
  const { toggleLike, isLiked } = usePlaylistLike({
    user_id: currentUserId || '',
    playlist_id: playlistId,
  })

  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userSession } = await supabase.auth.getSession()
      if (userSession?.session?.user) {
        setCurrentUserId(userSession.session.user.id)
      }
    }

    const fetchCommentsWithProfiles = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select(
          `
          id,
          created_at,
          user_id,
          content,
          users (
            profile_image
          )
        `,
        )
        .eq('playlist_id', playlistId)

      if (error) {
        console.error(
          'Error fetching comments with user profiles:',
          error.message,
        )
        return
      }

      const commentsWithProfiles = data.map((comment: Comment) => ({
        ...comment,
        profile_image: comment.users?.profile_image || null,
      }))

      setComments(commentsWithProfiles)
    }

    fetchUser()
    fetchCommentsWithProfiles()

    if (songs.length > 0) {
      setTrackIds(songs.map((song) => song.spotify_id))
      setPlayerOpen()
      play()
    }
  }, [songs, playlistId, play, setPlayerOpen, setTrackIds])

  const handleSongClick = () => {
    setTrackIds(songs.map((song) => song.spotify_id))
    playNextTrack()
    play()
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

    setComments((prev) => [
      ...prev,
      { ...data, profile_image: null } as unknown as Comment,
    ])
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

  const handleToggleLike = async () => {
    if (!currentUserId) {
      setIsLoginModalOpen(true)
      return
    }

    return new Promise<void>((resolve) => {
      toggleLike()
      resolve()
    })
  }

  const handleConfirmLogin = () => {
    router.push('/login')
  }

  return (
    <>
      <CommunityDetailUI
        nickname={nickname}
        profileImage={profileImage}
        description={description}
        playlistName={playlistName}
        songs={songs}
        comments={comments}
        content={content}
        setContent={setContent}
        handleSongClick={handleSongClick}
        handleAddComment={handleAddComment}
        handleDeleteComment={handleDeleteComment}
        currentUserId={currentUserId}
        isLiked={isLiked}
        onLikeToggle={handleToggleLike}
      />
      <Modal
        isOpen={isLoginModalOpen}
        title="로그인 필요" 
        content="좋아요를 누르려면 로그인이 필요합니다." 
        type="horizontal"
        onConfirm={handleConfirmLogin}
        onCancel={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}
