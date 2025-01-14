'use client'

import PlaylistCard from '@/app/community/_components/PlaylistCard'
import ClientSwiper from '@/components/common/ClientSwiper'
import { supabase } from '@/utils/supabase/client'

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

const PlaylistSection = ({
  userId,
  playlists,
  isSwiper,
}: PlaylistSectionProps) => {
  const [likes, setLikes] = useState<Record<string, boolean>>({}) // 좋아요 상태 관리

  useEffect(() => {
    // 초기 좋아요 상태 설정
    const initialLikes = playlists.reduce(
      (acc, playlist) => {
        acc[playlist.id] = playlist.likedByUser || false
        return acc
      },
      {} as Record<string, boolean>,
    )
    setLikes(initialLikes)

    // Supabase Realtime 구독
    const channel = supabase
    .channel('realtime:playlist_like')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'playlist_like' },
      (payload) => {
        console.log('Realtime payload:', payload); // 디버깅용 로그 출력
        if (payload.eventType === 'INSERT') {
          setLikes((prev) => ({
            ...prev,
            [payload.new.playlist_id]: true,
          }));
        } else if (payload.eventType === 'DELETE') {
          setLikes((prev) => ({
            ...prev,
            [payload.old.playlist_id]: false,
          }));
        }
      }
    )
    .subscribe();
  

      channel.on('status', (status) => {
        console.log('Realtime status:', status); // 연결 상태 디버깅
      });

    return () => {
      supabase.removeChannel(channel)
    }
  }, [playlists])

  const handleLikeToggle = async (playlistId: string) => {
    const { data: user, error: userError } = await supabase.auth.getUser();
  
    if (userError || !user) {
      console.error('Error fetching user data:', userError?.message);
      return;
    }
    
  
    const currentLiked = likes[playlistId];
    setLikes((prev) => ({ ...prev, [playlistId]: !currentLiked })); // Optimistic UI
  
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
              .then(() => ({ liked: false }));
          } else {
            return supabase
              .from('playlist_like')
              .insert({ playlist_id: playlistId, user_id: userId })
              .then(() => ({ liked: true }));
          }
        });
  
      setLikes((prev) => ({ ...prev, [playlistId]: liked })); // 서버 응답으로 상태 동기화
    } catch (error) {
      console.error('Error toggling like:', error);
      setLikes((prev) => ({ ...prev, [playlistId]: currentLiked })); // 실패 시 롤백
    }
  };
  

  if (isSwiper) {
    const items = playlists.map((playlist) => ({
      id: playlist.id,
      content: (
        <PlaylistCard
          playlist={playlist}
          likeCount={playlist.likeCount}
          liked={likes[playlist.id] || false}
          onLikeToggle={() => handleLikeToggle(playlist.id)}
        />
      ),
    }))

    return <ClientSwiper items={items} />
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          playlist={playlist}
          likeCount={playlist.likeCount}
          liked={likes[playlist.id] || false}
          onLikeToggle={() => handleLikeToggle(playlist.id)}
        />
      ))}
    </div>
  )
}

export default PlaylistSection
