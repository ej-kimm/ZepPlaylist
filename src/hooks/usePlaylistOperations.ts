import { fetchPlaylistsWithCovers } from '@/api/playlist/actions'
import { userStore } from '@/store/userSlice'
import type { PlaylistRow } from '@/types/playlist'
import { useQuery } from '@tanstack/react-query'

const usePlaylistOperations = () => {
  const { user } = userStore()
  const { data: playlists = [], isPending } = useQuery<PlaylistRow[]>({
    queryKey: ['playlists', user?.id],
    queryFn: async () => fetchPlaylistsWithCovers(),
    enabled: !!user,
  })
  console.log(playlists)

  return {
    playlists,
    isPending,
  }
}

export default usePlaylistOperations
