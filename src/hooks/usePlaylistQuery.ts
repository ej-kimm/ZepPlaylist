import { fetchUserPlayList } from '@/app/my-page/_components/fetchUserPlayList'
import { useInfiniteQuery } from '@tanstack/react-query'

export const usePlaylistQuery = () => {
  const {
    data: playlists,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['playlist'],
    queryFn: ({ pageParam = 0 }) => fetchUserPlayList({ pageParam }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor || undefined,
    getPreviousPageParam: (firstPage) => firstPage?.prevCursor || undefined,
    initialPageParam: 0,
  })

  return {
    playlists,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  }
}
