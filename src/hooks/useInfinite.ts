// import { FetchPlay } from '@/app/my-page/_components/FetchPlay'
// import { useInfiniteQuery } from '@tanstack/react-query'

// export const useInfinite = () => {
//   const {
//     fetchNextPage,
//     fetchPreviousPage,
//     hasNextPage,
//     hasPreviousPage,
//     isFetchingNextPage,
//     isFetchingPreviousPage,
//   } = useInfiniteQuery({
//     queryKey: ['playlist'],
//     queryFn: ({ pageParam }) => FetchPlay({ pageParam }),
//     initialPageParam: 0,
//     getNextPageParam: (lastPage) => lastPage.nextCurosr,
//     getPreviousPageParam: (firstPage) => firstPage.prevCursor,
//   })
//   return {
//     fetchNextPage,
//     fetchPreviousPage,
//     hasNextPage,
//     hasPreviousPage,
//     isFetchingNextPage,
//     isFetchingPreviousPage,
//   }
// }
