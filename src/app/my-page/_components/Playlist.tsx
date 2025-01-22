'use client'
import { getPlaylists } from '@/api/community/actions'
import { userStore } from '@/store/userSlice'
import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import { fetchUserPlayList } from './fetchUserPlayList'
const PlayList = () => {
  const { user } = userStore()
  const router = useRouter()
  const {
    data,
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
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>에러가 발생하였습니다!</p>
  const a = getPlaylists(user!.id)
  console.log('first', a)
  console.log('first', data)
  // ui 만 쓰고 컴포넌트가 받는 프롭스 
  return (
    <div>
      <div>
        {data?.pages.map((page, pageIndex) => {
          return (
            <div key={pageIndex}>
              {page?.playlistsWithCovers.map((p) => {
                return (
                  <div
                    className="flex items-center justify-between"
                    key={p.id}
                    onClick={() => {
                      router.push(`/community/${p.id}`)
                    }}
                  >
                    <Image
                      className="mb-[21px] ml-4 h-9 w-9"
                      src={p.latest_song_cover || '/default-cover.jpg'}
                      height={36}
                      width={36}
                      alt="앨범커버 사진"
                    />
                    <div className="body-2 flex w-[calc(100%-52px)] items-center justify-between">
                      <div>
                        {p.name}
                        <h1 className="caption-2">{user?.nickname}</h1>
                      </div>
                    </div>
                    <button>♥</button>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <div ref={ref}>{isFetchingNextPage && <p>Loading...</p>}</div>
    </div>
  )
}

export default PlayList


                  // <div
                  //   className="flex items-center justify-between"
                  //   key={p.id}
                  //   onClick={() => {
                  //     router.push(`/community/${p.id}`)
                  //   }}
                  // >
                  //   <Image
                  //     className="mb-[21px] ml-4 h-9 w-9"
                  //     src={p.latest_song_cover || '/default-cover.jpg'}
                  //     height={36}
                  //     width={36}
                  //     alt="앨범커버 사진"
                  //   />
                  //   <div className="body-2 flex w-[calc(100%-52px)] items-center justify-between">
                  //     <div>
                  //       {p.name}
                  //       <h1 className="caption-2">{user?.nickname}</h1>
                  //     </div>
                  //   </div>
                  //   <button>♥</button>
                  // </div>
