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
    .select(`*, playlist_like(*), playlist_music(* , music(*)) `)
    .eq('user_id', user.user!.id)
  if (error) {
    console.error('error', error)
    throw error.message
  }
  return playlists
}

// export const getAlbumImg = async () => {
//   const { data: playlists } = await supabase.from('playlists').select('id')
//   if (!playlists) {
//     return
//   }
//   const id = playlists[0].id
//   const { data: albumImg, error } = await supabase
//     .from('playlist_music')
//     .select(`*,music_id(*), playlists(*)`)
//     .eq('playlists_id', id)
//   if (error) {
//     console.error('albumImgError', error)
//   }
//   return albumImg
// }

// 1.a 라는 playlists_music 테이블에서 playlists가 a라는 music 의 모든정보를 찾을수있음
// 2. 가져올때 create_at 을통해 정렬시켜서 get해와서 첫번째꺼만 빼오면 최신앨범커버 <<
