import { FetchPlay } from '@/app/test/_components/FetchPlay'
import { useInfiniteQuery } from '@tanstack/react-query'

const {
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
  isFetchingNextPage,
  isFetchingPreviousPage,
  promise,
} = useInfiniteQuery({
  queryKey: ['playlist'],
  queryFn: ({ pageParam }) => FetchPlay({ pageParam }),
  initialPageParam: 0,
  getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
    lastPage.nextCurosr,
  getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
    firstPage.prevCursor,
})
