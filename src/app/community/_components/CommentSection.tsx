'use client';

import { useMusicPlayerStore } from '@/store/useMusicPlayerStore';
import { supabase } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import CommunityDetailUI from './CommunityDetailUI';

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

type Props = {
  songs: Song[];
  comments: Comment[];
  playlistId: string;
};

export default function CommentSection({
  songs,
  comments: initialComments,
  playlistId,
}: Props) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [content, setContent] = useState<string>('');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { setTrackIds, togglePlay, playNextTrack, setPlayerOpen } =
    useMusicPlayerStore();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userSession } = await supabase.auth.getSession();
      if (userSession?.session?.user) {
        setCurrentUserId(userSession.session.user.id);
      }
    };
    fetchUser();

    if (songs.length > 0) {
      setTrackIds(songs.map((song) => song.spotify_id));
      setPlayerOpen();
      togglePlay();
    }
  }, [songs, setTrackIds, setPlayerOpen, togglePlay]);

  const handleSongClick = () => {
    setTrackIds(songs.map((song) => song.spotify_id));
    playNextTrack();
  };

  const handleAddComment = async () => {
    if (!currentUserId) {
      alert('로그인이 필요합니다.');
      return;
    }

    const { data, error } = await supabase
      .from('comments')
      .insert({ playlist_id: playlistId, user_id: currentUserId, content })
      .select()
      .single();

    if (error) {
      console.error('Error adding comment:', error.message);
      return;
    }

    setComments((prev) => [...prev, data as Comment]);
    setContent('');
  };

  const handleDeleteComment = async (commentId: string) => {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) {
      console.error('Error deleting comment:', error.message);
      return;
    }

    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };

  return (
    <CommunityDetailUI
      songs={songs}
      comments={comments}
      content={content}
      setContent={setContent}
      handleSongClick={handleSongClick}
      handleAddComment={handleAddComment}
      handleDeleteComment={handleDeleteComment}
      currentUserId={currentUserId}
    />
  );
}
