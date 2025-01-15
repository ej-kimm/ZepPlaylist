'use server'

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
  const { data: user, error: userError } = await supabase.auth.getUser()
  if (userError) {
    console.error(userError.message)
    return
  }
  const { data: playlists, error } = await supabase
    .from('playlists')
    .select(`*, playlist_music(* , music(*)) `)
    .eq('user_id', user.user!.id)
  if (error) {
    console.error('error', error)
    throw error.message
  }
  return playlists
}
