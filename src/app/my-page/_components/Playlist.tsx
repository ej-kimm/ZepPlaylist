'use client'
import { toggleLike } from '@/api/my-page/actions'
import PlaylistUI from '@/components/common/PlaylistUI'
import { userStore } from '@/store/userSlice'
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { fetchUserLikePlaylist } from './fetchUserLikePlaylist'
import { fetchUserPlayList } from './fetchUserPlayList'
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
  const { data: likedPlaylist } = useQuery({
    queryKey: ['playlists', user?.id],
    queryFn: () => fetchUserLikePlaylist(),
  })
  console.log('============================', likedPlaylist)
  const { mutate: toggleLike1 } = useMutation({
    mutationFn: toggleLike,
    onSuccess: (_, variables) => {
      setIsLiked((prev) => ({
        ...prev,
        [variables.user_id]: !prev[variables.user_id],
      }))
      queryClient.invalidateQueries({
        queryKey: ['playlists', user!.id],
      })
    },
  })
  const likeCount2 = likedPlaylist?.playlistLikeId
  console.log('first', likeCount2)
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>에러가 발생하였습니다!</p>
  if (!user) return
  if (!likeCount2) return
  const likeLength = likeCount2.map((p) => p!.length || 0)
  console.log('aaaaaaaaaaaaaa', likeLength)

  return (
    <div>
      <div>
        {data?.pages.map((page, pageIndex) => {
          return (
            <div key={pageIndex}>
              {page?.playlistsWithCovers.map((p, index) => {
                return (
                  <PlaylistUI
                    key={p.id}
                    profileImg={user.profile_image!}
                    playlistName={p.name}
                    nickName={user.nickname}
                    isLiked={isLiked[p.id] ?? false}
                    onClick={() => {
                      router.push(`/community/${p.id}`)
                    }}
                    likeCount={likeLength[index]}
                    onLikeToggle={() => {
                      toggleLike1({ playlist_id: p.id, user_id: user.id })
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
