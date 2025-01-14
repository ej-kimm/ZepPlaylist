'use client'

import PlaylistCard from '@/app/community/_components/PlaylistCard'
import { supabase } from '@/utils/supabase/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type PlaylistSectionProps = {
  userId: string
  playlists: {
    id: string
    description: string
    likeCount: number
    likedByUser?: boolean
  }[]
  isSwiper?: boolean
}

const PlaylistSection = ({ userId, playlists }: PlaylistSectionProps) => {
  const [likes, setLikes] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const initialLikes = playlists.reduce(
      (acc, playlist) => {
        acc[playlist.id] = playlist.likedByUser || false
        return acc
      },
      {} as Record<string, boolean>,
    )
    setLikes(initialLikes)

    const channel = supabase
      .channel('realtime:playlist_like')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'playlist_like' },
        (payload) => {
          console.log('Realtime payload:', payload)
          if (payload.eventType === 'INSERT') {
            setLikes((prev) => ({
              ...prev,
              [payload.new.playlist_id]: true,
            }))
          } else if (payload.eventType === 'DELETE') {
            setLikes((prev) => ({
              ...prev,
              [payload.old.playlist_id]: false,
            }))
          }
        },
      )
      .subscribe()

    channel.on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'playlist_like' },
      (payload) => {
        console.log('Realtime payload:', payload)
      },
    )

    return () => {
      supabase.removeChannel(channel)
    }
  }, [playlists])

  const handleLikeToggle = async (playlistId: string) => {
    const { data: user, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error('Error fetching user data:', userError?.message)
      return
    }

    const currentLiked = likes[playlistId]
    setLikes((prev) => ({ ...prev, [playlistId]: !currentLiked }))

    try {
      const { liked } = await supabase
        .from('playlist_like')
        .select('*')
        .eq('playlist_id', playlistId)
        .eq('user_id', userId)
        .single()
        .then((res) => {
          if (res.data) {
            return supabase
              .from('playlist_like')
              .delete()
              .eq('playlist_id', playlistId)
              .eq('user_id', userId)
              .then(() => ({ liked: false }))
          } else {
            return supabase
              .from('playlist_like')
              .insert({ playlist_id: playlistId, user_id: userId })
              .then(() => ({ liked: true }))
          }
        })

      setLikes((prev) => ({ ...prev, [playlistId]: liked }))
    } catch (error) {
      console.error('Error toggling like:', error)
      setLikes((prev) => ({ ...prev, [playlistId]: currentLiked }))
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {playlists.map((playlist) => (
        <Link href={`/community/${playlist.id}`} key={playlist.id}>
          <PlaylistCard
            playlist={playlist}
            likeCount={playlist.likeCount}
            liked={likes[playlist.id] || false}
            onLikeToggle={() => handleLikeToggle(playlist.id)}
          />
        </Link>
      ))}
    </div>
  )
}

export default PlaylistSection
