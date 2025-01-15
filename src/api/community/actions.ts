'use server'

import type { Database } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export async function getPlaylists(userId: string, keywords: string[] = []) {
  try {
    // 키워드 필터링 추가
    let query = supabase
      .from('playlists')
      .select('*')
      .order('created_at', { ascending: false })

    if (keywords.length > 0) {
      query = query.in('keyword', keywords) // 키워드 조건 추가
    }

    const { data: playlists, error } = await query

    if (error) {
      console.error('Error fetching playlists:', error)
      throw new Error(error.message)
    }

    // 좋아요 수 및 사용자가 좋아요를 눌렀는지 확인
    const playlistsWithLikes = await Promise.all(
      playlists.map(async (playlist) => {
        const { count: likeCount, error: likeError } = await supabase
          .from('playlist_like')
          .select('*', { count: 'exact', head: true })
          .eq('playlist_id', playlist.id)

        if (likeError) {
          console.error(
            `Error fetching likes for playlist ${playlist.id}:`,
            likeError,
          )
          throw new Error(likeError.message)
        }

        const { data: liked, error: likedError } = await supabase
          .from('playlist_like')
          .select('*')
          .eq('playlist_id', playlist.id)
          .eq('user_id', userId)
          .single()

        if (likedError && likedError.code !== 'PGRST116') {
          console.error(
            `Error checking if user liked playlist ${playlist.id}:`,
            likedError,
          )
          throw new Error(likedError.message)
        }

        return {
          ...playlist,
          likeCount: likeCount || 0,
          likedByUser: !!liked,
        }
      }),
    )

    return playlistsWithLikes
  } catch (error) {
    console.error('Unexpected error fetching playlists:', error)
    throw new Error('Unexpected error occurred while fetching playlists.')
  }
}

export async function getPopularPlaylists(userId: string, limit: number = 5) {
  try {
    const playlists = await getPlaylists(userId)

    return playlists.sort((a, b) => b.likeCount - a.likeCount).slice(0, limit)
  } catch (error) {
    console.error('Unexpected error fetching popular playlists:', error)
    throw new Error(
      'Unexpected error occurred while fetching popular playlists.',
    )
  }
}
