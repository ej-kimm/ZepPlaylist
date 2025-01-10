'use server'

import type { Database } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export async function getPlaylists() {
  try {
    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .order('created_at', { ascending: false }) // 최신순으로 정렬해주는 기능

    if (error) {
      console.error('Error fetching playlists:', error)
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    console.error('Unexpected error:', error)
    throw new Error('Unexpected error occurred')
  }
}

// 좋아요 조회
export async function getPopularPlaylists(limit: number = 5) {
  const { data, error } = await supabase
    .from('playlists')
    .select('*, playlist_like(count)'); // 좋아요 수를 포함한 데이터 가져오기

  if (error) {
    console.error('Error fetching popular playlists:', error);
    throw new Error(error.message);
  }

  if (!data) {
    return [];
  }

  // 클라이언트에서 정렬
  const sortedData = data.sort((a, b) => (b.playlist_like.count || 0) - (a.playlist_like.count || 0));

  // 상위 limit 개수 반환
  return sortedData.slice(0, limit);
}

// 좋아요 토글
export async function toggleLike(playlistId: string, userId: string) {
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
    // 이미 좋아요를 눌렀다면 삭제
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