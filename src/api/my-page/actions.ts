'use server'

import type { TablesInsert } from '@/types/supabase'
import { supabase } from '@/utils/supabase/client'
type UserInsert = TablesInsert<'users'>

export const updateProfile = async (
  updateUser: Partial<Omit<UserInsert, 'id'>>,
  userId: string,
) => {
  const { error } = await supabase
    .from('users')
    .update(updateUser)
    .eq('id', userId)
    .select()
  if (error) {
    throw error
  }
  return true
}
