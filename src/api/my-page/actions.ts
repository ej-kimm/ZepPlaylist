'use server'

import { userStore } from '@/store/userSlice'
import type { TablesInsert } from '@/types/supabase'
import { createClient } from '@/utils/supabase/server'
type UserInsert = TablesInsert<'users'>
const supabase = createClient()
export const updateProfile = async (
  updateData: Partial<Omit<UserInsert, 'id'>>,
  userId: string,
) => {
  const { data, error } = await supabase
    .from('users')
    .update({
      nickname: updateData.nickname,
      profile_image: updateData.profile_image,
    })
    .eq('id', userId)
    .select()
  if (error) {
    console.log('error', error)
    throw error.message
  }

  return data
}

export const getPlaylists = async () => {
  // const { data: user, error: userError } = await supabase.auth.getUser()
  const { user } = userStore()
  // if (userError) {
  //   console.error(userError.message)
  //   return
  // }
  const { data: playlists, error } = await supabase
    .from('playlists')
    .select(`*, playlist_like(*), playlist_music(* , music(*)) `)
    .eq('user_id', user!.id)
  if (error) {
    console.error('error', error)
    throw error.message
  }
  return playlists
}

type Parameter = {
  playlist_id: string
  user_id: string
}

// 토글 쓰게되면
export const toggleLike = async ({ playlist_id, user_id }: Parameter) => {
  const { data: likeCount, error } = await supabase
    .from('playlist_like')
    .select('*')
    .eq('playlist_id', playlist_id)
    .eq('user_id', user_id)
    .single()
  if (error) {
    console.error(error.message)
  }
  if (likeCount) {
    const { error: deleteError } = await supabase
      .from('playlist_like')
      .delete()
      .eq('playlist_id', playlist_id)
      .eq('user_id', user_id)
    if (deleteError) {
      console.error(deleteError.message)
    }
    return { status: 'deleting', playlist_id, user_id }
  } else {
    const { error: inError } = await supabase
      .from('playlist_like')
      .insert({ playlist_id, user_id })
    if (inError) {
      console.error(inError.message)
    }
    return { status: 'add', playlist_id, user_id }
  }
}

// 삭제 나중에 파라미터 타입 이거 슈파베이스 뭐 어케해서 바꾸기기
export const deleteLike = async ({ playlist_id, user_id }: Parameter) => {
  const { error } = await supabase
    .from('playlist_like')
    .delete()
    .eq('playlist_id', playlist_id)
    .eq('user_id', user_id)
  if (error) {
    return { succes: false, error: error.message }
  }
  return { succes: true }
}
