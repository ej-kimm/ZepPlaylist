'use client'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { FetchPlay } from './FetchPlay'
const PlayList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['playlist'],
    queryFn: ({ pageParam = 0 }) => FetchPlay({ pageParam }),
    getNextPageParam: (lastPage) => lastPage?.nextCurosr || undefined,
    getPreviousPageParam: (firstPage) => firstPage?.prevCursor || undefined,
    initialPageParam: 0,
  })
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
  })
  console.log('first', data)
  if (isLoading) return <p>스켈레톤 들어갈거임</p>
  if (error) return <p>글로벌에러 들어갈거임</p>
  return (
    <div>
      <h1>playlist</h1>
      <div>
        {data?.pages.map((page, pageIndex) => {
          return (
            <div key={pageIndex}>
              {page?.playlistsWithCovers.map((p) => {
                return (
                  <div key={p.id}>
                    {p.name}
                    <h1 className="mt-32">{p.description}</h1>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <div ref={ref}>{isFetchingNextPage && <p>스켈레톤들어갈자리임 </p>}</div>
    </div>
  )
}

export default PlayList
