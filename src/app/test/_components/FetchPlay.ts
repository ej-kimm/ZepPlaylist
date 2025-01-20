import { supabase } from '@/utils/supabase/client'

type Param = {
  pageParam: number
}

export const FetchPlay = async ({ pageParam = 0 }: Param) => {
  const { data } = await supabase.auth.getUser()
  console.log('data', data.user?.id)

  const { data: playlist, error } = await supabase
    .from('playlists')
    .select('*')
    .eq('user_id', data.user!.id)
    .range(pageParam * 10, (pageParam + 1) * 10 - 1)
  if (error) {
    console.error(error.message)
  }
  const totalPage = playlist?.length || 0
  const nextCurosr = totalPage === 10 ? pageParam + 1 : undefined
  const prevCursor = pageParam > 0 ? pageParam - 1 : undefined
  return {
    playlist,
    nextCurosr,
    prevCursor,
  }
}
