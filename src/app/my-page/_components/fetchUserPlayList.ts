import { fetchLatestAlbumCover } from '@/api/playlist/actions'
import { userStore } from '@/store/userSlice'
import { supabase } from '@/utils/supabase/client'

type Param = {
  pageParam: number
}

export const fetchUserPlayList = async ({ pageParam = 0 }: Param) => {
  // const { data } = await supabase.auth.getUser()
  const { user } = userStore()
  const { data: playlists, error } = await supabase
    .from('playlists')
    .select('*')
    .eq('user_id', user!.id)
    .range(pageParam * 10, (pageParam + 1) * 10 - 1)
  if (error) {
    console.error(error.message)
  }
  if (!playlists) {
    return
  }
  const playlistsWithCovers = await Promise.all(
    playlists.map(async (playlist) => {
      const latestSongCover = await fetchLatestAlbumCover(playlist.id)
      return {
        ...playlist,
        latest_song_cover: latestSongCover,
      }
    }),
  )

  const totalPage = playlists?.length || 0
  const nextCursor = totalPage === 10 ? pageParam + 1 : undefined
  const prevCursor = pageParam > 0 ? pageParam - 1 : undefined
  return {
    playlistsWithCovers,
    nextCursor,
    prevCursor,
  }
}
