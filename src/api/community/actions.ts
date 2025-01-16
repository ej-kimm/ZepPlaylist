'use server';

import type { Database } from '@/types/supabase';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Fetch playlists with optional keyword filtering
export async function getPlaylists(userId: string, keywords: string[] = []) {
  try {
    let query = supabase
      .from('playlists')
      .select('*')
      .order('created_at', { ascending: false });

    if (keywords.length > 0) {
      const keywordConditions = keywords
        .map((keyword) => `keyword.ilike.%${keyword}%`)
        .join(',');

      query = query.or(keywordConditions);
    }

    const { data: playlists, error } = await query;

    if (error) {
      console.error('Error fetching playlists:', error);
      throw new Error(error.message);
    }

    const playlistsWithLikes = await Promise.all(
      playlists.map(async (playlist) => {
        const { count: likeCount } = await supabase
          .from('playlist_like')
          .select('*', { count: 'exact', head: true })
          .eq('playlist_id', playlist.id);

        const { data: liked } = await supabase
          .from('playlist_like')
          .select('*')
          .eq('playlist_id', playlist.id)
          .eq('user_id', userId)
          .single();

        return {
          ...playlist,
          likeCount: likeCount || 0,
          likedByUser: !!liked,
        };
      }),
    );

    return playlistsWithLikes;
  } catch (error) {
    console.error('Unexpected error fetching playlists:', error);
    throw new Error('Unexpected error occurred while fetching playlists.');
  }
}

// Fetch popular playlists based on like counts
export async function getPopularPlaylists(userId: string, limit: number = 5) {
  try {
    const playlists = await getPlaylists(userId);

    return playlists.sort((a, b) => b.likeCount - a.likeCount).slice(0, limit);
  } catch (error) {
    console.error('Unexpected error fetching popular playlists:', error);
    throw new Error(
      'Unexpected error occurred while fetching popular playlists.',
    );
  }
}

// Fetch the like status of a playlist for a user
export async function fetchPlaylistLike({
  user_id,
  playlist_id,
}: {
  user_id: string;
  playlist_id: string;
}) {
  try {
    const { data, error } = await supabase
      .from('playlist_like')
      .select('*')
      .eq('playlist_id', playlist_id)
      .eq('user_id', user_id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching playlist like:', error);
      throw new Error(error.message);
    }

    return !!data;
  } catch (error) {
    console.error('Unexpected error fetching playlist like:', error);
    throw new Error('Unexpected error occurred while fetching playlist like.');
  }
}

// Update the like status of a playlist for a user
export async function updatePlaylistLike({
  user_id,
  playlist_id,
}: {
  user_id: string;
  playlist_id: string;
}) {
  try {
    const { data: existingLike, error: fetchError } = await supabase
      .from('playlist_like')
      .select('*')
      .eq('playlist_id', playlist_id)
      .eq('user_id', user_id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error checking existing like:', fetchError);
      throw new Error(fetchError.message);
    }

    if (existingLike) {
      const { error: deleteError } = await supabase
        .from('playlist_like')
        .delete()
        .eq('playlist_id', playlist_id)
        .eq('user_id', user_id);

      if (deleteError) {
        console.error('Error removing like:', deleteError);
        throw new Error(deleteError.message);
      }
    } else {
      const { error: insertError } = await supabase
        .from('playlist_like')
        .insert({ playlist_id, user_id });

      if (insertError) {
        console.error('Error adding like:', insertError);
        throw new Error(insertError.message);
      }
    }
  } catch (error) {
    console.error('Unexpected error updating playlist like:', error);
    throw new Error('Unexpected error occurred while updating playlist like.');
  }
}
