'use client'

import { toggleLikeServerAction } from '@/api/community/playlists'
import { useState, useTransition } from 'react'

type PlaylistCardProps = {
  playlist: {
    id: string
    name: string
    description: string
    playlist_like?: { count: number }
  }
  userId: string // 로그인된 사용자 ID를 상위 컴포넌트에서 전달받음
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, userId }) => {
  const [likeCount, setLikeCount] = useState(playlist.playlist_like?.count || 0)
  const [liked, setLiked] = useState(false) // 초기 상태
  const [isPending, startTransition] = useTransition()

  const handleLike = () => {
    startTransition(async () => {
      try {
        const response = await toggleLikeServerAction(playlist.id, userId)
        setLiked(response.liked)
        setLikeCount((prev) => (response.liked ? prev + 1 : prev - 1))
      } catch (error) {
        console.error('Error toggling like:', error)
      }
    })
  }

  return (
    <div className="rounded border p-4 shadow">
      <h2 className="text-xl font-semibold">{playlist.name}</h2>
      <p>{playlist.description}</p>
      <p className="text-sm text-gray-500">Likes: {likeCount}</p>
      <button
        className={`mt-2 rounded px-4 py-2 ${
          liked ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'
        }`}
        onClick={handleLike}
        disabled={isPending}
      >
        {liked ? 'Unlike' : 'Like'}
      </button>
    </div>
  )
}

export default PlaylistCard
