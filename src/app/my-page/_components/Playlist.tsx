'use client'
import { toggleLike } from '@/api/my-page/actions'
import { PlaylistUI } from '@/components/common'
import { userStore } from '@/store/userSlice'
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { fetchUserPlayList } from './fetchUserPlayList'
import MyPageSkeleton from './MyPageSkeleton'
const PlayList = () => {
  const { user } = userStore()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isLiked, setIsLiked] = useState<{ [playlistId: string]: boolean }>({})
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
  console.log('first', isLiked)
  const { mutate: likedToggle } = useMutation({
    mutationFn: toggleLike,

    onSuccess: (_, variables) => {
      setIsLiked((isLiked) => ({
        ...isLiked,
        [variables.user_id]: !isLiked[variables.user_id],
      }))
      queryClient.invalidateQueries({
        queryKey: ['myPagePlaylists', user!.id],
      })
    },
  })
  if (isLoading)
    return Array.from({
      length: 6,
    }).map((_, index) => <MyPageSkeleton key={index} />)
  if (error) return <p>에러가 발생하였습니다!</p>
  if (!user) return
  console.log('first', data)
  return (
    <div className="h-full w-full overflow-hidden">
      <div>
        {data?.pages.map((page, pageIndex) => {
          return (
            <div key={pageIndex}>
              {page?.playlists.map((p, index) => {
                const isLiked = p.playlist_like.some(
                  (like) => like.user_id === p.user_id,
                )
                const likeCount = p.playlist_like.length
                return (
                  <PlaylistUI
                    key={p.id}
                    profileImg={
                      user.profile_image ||
                      '/_next/static/media/defaultProfileImg.caab3de8.png'
                    }
                    playlistName={p.name}
                    nickName={user.nickname}
                    isLiked={isLiked}
                    onClick={() => {
                      router.push(`/community/${p.id}`)
                    }}
                    likeCount={likeCount}
                    onLikeToggle={() => {
                      //   [p.id]: !liked,
                      // }))
                      likedToggle({ playlist_id: p.id, user_id: user.id })
                    }}
                  />
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
