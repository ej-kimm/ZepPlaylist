import { userStore } from '@/store/userSlice'
import { supabase } from '@/utils/supabase/client'

type Param = {
  pageParam: number
}

export const fetchUserPlayList = async ({ pageParam = 0 }: Param) => {
  const { user } = userStore.getState()
  if (!user) return
  const { data: playlists, error } = await supabase
    .from('playlists')
    .select(`*,playlist_like!left(user_id)`)
    .eq('user_id', user.id!)
    .range(pageParam * 10, (pageParam + 1) * 10 - 1)
  if (error) {
    console.error(error.message)
  }
  if (!playlists) {
    return
  }
  const totalPage = playlists?.length || 0
  const nextCursor = totalPage === 10 ? pageParam + 1 : undefined
  const prevCursor = pageParam > 0 ? pageParam - 1 : undefined
  return {
    playlists,
    nextCursor,
    prevCursor,
  }
}
