import { supabase } from '@/utils/supabase/client'

export const fetchUserLikePlaylist = async () => {
  const { data } = await supabase.auth.getUser()
  const { data: playlists, error } = await supabase
    .from('playlists')
    .select(`*`)
    .eq('user_id', data.user!.id)
  // 내가 작성한 플레이리스트만 꺼내오기
  if (error) {
    console.log(error.message)
  }
  if (!playlists) {
    return
  }
  const likePlayListPromises = playlists.map(async (p) => {
    const { data: playlistLike, error: likeError } = await supabase
      .from('playlist_like')
      .select('playlist_id')
      .eq('playlist_id', p.id)
    if (likeError) return
    return playlistLike
  })
  const playlistLikeId = await Promise.all(likePlayListPromises)
  return { playlistLikeId, playlists }
}
