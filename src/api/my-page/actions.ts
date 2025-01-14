'use server'

import type { TablesInsert } from '@/types/supabase'
import { createClient } from '@/utils/supabase/server'
type UserInsert = TablesInsert<'users'>

export const updateProfile = async (
  updateData: Partial<Omit<UserInsert, 'id'>>,
  userId: string,
) => {
  const supabase = createClient()
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
