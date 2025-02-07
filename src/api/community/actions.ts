'use server'

import type { Database } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export async function getPlaylists(userId: string, keywords: string[] = []) {
  try {
    let query = supabase
      .from('playlists')
      .select(
        `
        *,
        playlist_music!inner(
          music:music_id(
            album_cover
          )
        ),
        playlist_like!left(
          user_id
        ),
        users!inner(
          profile_image,
          nickname
        )
      `,
      )
      .eq('is_public', true)
      .order('created_at', { ascending: false })

    if (keywords.length > 0) {
      query = query.or(keywords.map((k) => `keyword.ilike.%${k}%`).join(','))
    }

    const { data, error } = await query

    if (error) throw error

    return data.map((playlist) => ({
      ...playlist,
      playlist_music: playlist.playlist_music.map((pm) => pm.music),
      likeCount: playlist.playlist_like.length,
      likedByUser: playlist.playlist_like.some(
        (like) => like.user_id === userId,
      ),
      profile_image: playlist.users.profile_image,
      nickname: playlist.users.nickname || 'Anonymous',
      album_cover: playlist.playlist_music[0]?.music?.album_cover || null,
    }))
  } catch (error) {
    console.error('Error fetching playlists:', error)
    throw new Error('Failed to fetch playlists')
  }
}

export async function getPopularPlaylists(userId: string, limit: number = 10) {
  const playlists = await getPlaylists(userId)
  return playlists.sort((a, b) => b.likeCount - a.likeCount).slice(0, limit)
}

export async function fetchPlaylistLike({
  user_id,
  playlist_id,
}: {
  user_id: string
  playlist_id: string
}) {
  try {
    const { data, error } = await supabase
      .from('playlist_like')
      .select('*')
      .eq('playlist_id', playlist_id)
      .eq('user_id', user_id)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching playlist like:', error)
      throw new Error(error.message)
    }

    return !!data
  } catch (error) {
    console.error('Unexpected error fetching playlist like:', error)
    throw new Error('Unexpected error occurred while fetching playlist like.')
  }
}

export async function updatePlaylistLike({
  user_id,
  playlist_id,
}: {
  user_id: string
  playlist_id: string
}) {
  try {
    const { data: existingLike, error: fetchError } = await supabase
      .from('playlist_like')
      .select('*')
      .eq('playlist_id', playlist_id)
      .eq('user_id', user_id)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error checking existing like:', fetchError)
      throw new Error(fetchError.message)
    }

    if (existingLike) {
      const { error: deleteError } = await supabase
        .from('playlist_like')
        .delete()
        .eq('playlist_id', playlist_id)
        .eq('user_id', user_id)
        .select('*')

      if (deleteError) {
        console.error('Error removing like:', deleteError)
        throw new Error(deleteError.message)
      }
    } else {
      const { error: insertError } = await supabase
        .from('playlist_like')
        .insert({ playlist_id, user_id })
        .select('*')

      if (insertError) {
        console.error('Error adding like:', insertError)
        throw new Error(insertError.message)
      }
    }
  } catch (error) {
    console.error('Unexpected error updating playlist like:', error)
    throw new Error('Unexpected error occurred while updating playlist like.')
  }
}

export async function fetchLikeCount({ playlist_id }: { playlist_id: string }) {
  const { error, count } = await supabase
    .from('playlist_like')
    .select('id', { count: 'exact', head: true })
    .eq('playlist_id', playlist_id)

  if (error) {
    console.error('Error fetching like count:', error)
    throw new Error(error.message)
  }
  return count ?? 0
}
