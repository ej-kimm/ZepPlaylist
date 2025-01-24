'use server'

import { userStore } from '@/store/userSlice'
import { createClient } from '@/utils/supabase/server'

export async function getUser() {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.error('사용자 정보 가져오기 오류:', error)
    throw new Error('사용자 정보를 가져오는 중 문제가 발생했습니다.')
  }

  return user
}

export async function fetchLikedSongs() {
  const supabase = createClient()
  // const user = await getUser()
  const { user } = userStore()

  if (!user?.id) {
    throw new Error('로그인된 사용자 정보를 확인할 수 없습니다.')
  }

  try {
    const { data, error } = await supabase
      .from('song_like')
      .select(
        `
        music:music_id (
          spotify_id,
          title,
          album_cover,
          artist
        ),
        created_at,
        id
      `,
      )
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return data || []
  } catch (error) {
    console.error('좋아요 리스트 가져오기 오류:', error)
    throw new Error('좋아요 리스트 데이터를 가져오는 중 문제가 발생했습니다.')
  }
}

export async function removeLikedSong(likeId: string) {
  const supabase = createClient()
  // const user = await getUser()
  const { user } = userStore()

  if (!user?.id) {
    throw new Error('로그인된 사용자 정보를 확인할 수 없습니다.')
  }

  try {
    const { error } = await supabase
      .from('song_like')
      .delete()
      .eq('id', likeId)
      .eq('user_id', user.id)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('좋아요 리스트 삭제 오류:', error)
    throw new Error('좋아요 곡을 삭제하는 중 문제가 발생했습니다.')
  }
}
