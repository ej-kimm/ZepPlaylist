'use server';

import type { Database } from '@/types/supabase';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// 플레이리스트 가져오기
export async function getPlaylists() {
  try {
    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .order('created_at', { ascending: false }); // 최신순으로 정렬

    if (error) {
      console.error('Error fetching playlists:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Unexpected error:', error);
    throw new Error('Unexpected error occurred');
  }
}

// 인기 있는 플레이리스트 가져오기
export async function getPopularPlaylists(limit: number = 5) {
  try {
    const { data, error } = await supabase
      .from('playlists')
      .select('*, playlist_like(count)');

    if (error) {
      console.error('Error fetching popular playlists:', error);
      throw new Error(error.message);
    }

    if (!data) {
      return [];
    }

    // 좋아요 수 정렬 및 상위 limit 반환
    const sortedData = data.sort((a, b) => (b.playlist_like.count || 0) - (a.playlist_like.count || 0));
    return sortedData.slice(0, limit);
  } catch (error) {
    console.error('Unexpected error:', error);
    throw new Error('Unexpected error occurred');
  }
}

// 좋아요 토글
export async function toggleLikeServerAction(playlistId: string, userId: string) {
  const { data, error } = await supabase
    .from('playlist_like')
    .select('*')
    .eq('playlist_id', playlistId)
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error toggling like:', error);
    throw new Error(error.message);
  }

  if (data) {
    // 이미 좋아요 눌렀다면 삭제
    const { error: deleteError } = await supabase
      .from('playlist_like')
      .delete()
      .eq('playlist_id', playlistId)
      .eq('user_id', userId);

    if (deleteError) {
      console.error('Error removing like:', deleteError);
      throw new Error(deleteError.message);
    }

    return { liked: false };
  } else {
    // 좋아요 추가
    const { error: insertError } = await supabase
      .from('playlist_like')
      .insert({ playlist_id: playlistId, user_id: userId });

    if (insertError) {
      console.error('Error adding like:', insertError);
      throw new Error(insertError.message);
    }

    return { liked: true };
  }
}
