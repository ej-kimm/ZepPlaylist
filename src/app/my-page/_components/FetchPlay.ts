import { supabase } from '@/utils/supabase/client'

type Param = {
  pageParam: number
}

export const FetchPlay = async ({ pageParam = 0 }: Param) => {
  const { data } = await supabase.auth.getUser()
  console.log('data', data.user?.id)

  // 1. 플레이리스트 10개 를 가져오면서 조인을 할것임 플레이리스트 뮤직 - 뮤직 테이블 앨범커버
  // 2. 그안에 music_id
  const { data: playlist, error } = await supabase
    .from('playlists')
    .select('*')
    .eq('user_id', data.user!.id)
    .range(pageParam * 10, (pageParam + 1) * 10 - 1)
  if (error) {
    console.error(error.message)
  }

  // 자바스크립트 문법으로 플레이리스츠들의 아이디만 10개 뽑은다음에
  // 아이디들 변수에 담은다음에 포문 돌려서 fetchLatestAlbumCover() < 에 넣고
  const totalPage = playlist?.length || 0
  const nextCurosr = totalPage === 10 ? pageParam + 1 : undefined
  const prevCursor = pageParam > 0 ? pageParam - 1 : undefined
  return {
    playlist,
    nextCurosr,
    prevCursor,
  }
}
