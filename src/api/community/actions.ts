'use server'

import type { Database } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

type PlaylistRow = Database['public']['Tables']['playlists']['Row']
type MusicRow = Database['public']['Tables']['music']['Row']

type GroupedPlaylist = {
  id: string
  created_at: string
  user_id: string
  name: string
  description: string | null
  is_public: boolean
  keyword: string
  playlist_music: MusicRow[]
  likeCount: number
  likedByUser: boolean
  profile_image: string | null
  nickname: string | null
}

export async function getPlaylists(userId: string, keywords: string[] = []) {
  try {
    let playlistQuery = supabase
      .from('playlist_music')
      .select(
        `
        playlist_id,
        music:music_id (
          album_cover
        ),
        playlists (
          *,
          playlist_like (
            user_id
          )
        )
      `,
      )
      .eq('playlists.is_public', true)
      .order('created_at', { ascending: false })

    if (keywords.length > 0) {
      const keywordConditions = keywords
        .map((keyword) => `playlists.keyword.ilike.%${keyword}%`)
        .join(',')
      playlistQuery = playlistQuery.or(keywordConditions)
    }

    const { data: playlistMusic, error: playlistError } = await playlistQuery

    if (playlistError) {
      console.error('Error fetching playlists:', playlistError)
      throw new Error(playlistError.message)
    }

    const userIds = Array.from(
      new Set(
        playlistMusic?.map((item) => item.playlists?.user_id).filter(Boolean),
      ),
    )

    const { data: users, error: userError } = await supabase
      .from('users')
      .select('id, profile_image, nickname')
      .in('id', userIds)

    if (userError) {
      console.error('Error fetching users:', userError)
      throw new Error(userError.message)
    }

    const groupedPlaylists = playlistMusic?.reduce<
      Record<string, GroupedPlaylist>
    >((acc, item) => {
      const playlistId = item.playlist_id

      if (!playlistId) {
        console.error('Missing playlist_id:', item)
        return acc
      }

      if (!item.playlists?.is_public) {
        console.error('Non-public playlist included:', item)
        return acc
      }

      if (!acc[playlistId]) {
        const user = users?.find((u) => u.id === item.playlists?.user_id)
        acc[playlistId] = {
          ...(item.playlists as PlaylistRow),
          playlist_music: [],
          likeCount: item.playlists?.playlist_like.length || 0,
          likedByUser:
            item.playlists?.playlist_like.some(
              (like: { user_id: string }) => like.user_id === userId,
            ) || false,
          profile_image: user?.profile_image || null,
          nickname: user?.nickname || 'Anonymous',
        }
      }

      acc[playlistId].playlist_music.push(item.music as MusicRow)
      return acc
    }, {})

    return Object.values(groupedPlaylists).map((playlist) => ({
      ...playlist,
      album_cover: playlist.playlist_music[0]?.album_cover || null,
    }))
  } catch (error) {
    console.error('Unexpected error fetching playlists:', error)
    throw new Error('Unexpected error occurred while fetching playlists.')
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

export async function fetchPlaylistLikeCount(playlist_id: string) {
  try {
    const { count, error } = await supabase
      .from('playlist_like')
      .select('id', { count: 'exact' })
      .eq('playlist_id', playlist_id)

    if (error) {
      console.error('Error fetching like count:', error)
      throw new Error(error.message)
    }

    return count || 0
  } catch (error) {
    console.error('Unexpected error fetching like count:', error)
    throw new Error('Unexpected error occurred while fetching like count.')
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
