'use client'
import { updatePlaylistLike } from '@/api/my-page/actions'
import { PlaylistUI } from '@/components/common'
import { userStore } from '@/store/userSlice'
import type { OldData } from '@/types/playlistLike'
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import { fetchUserPlayList } from './fetchUserPlayList'
import MyPageSkeleton from './MyPageSkeleton'

const PlayList = () => {
  const { user } = userStore()
  const router = useRouter()
  const queryClient = useQueryClient()
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
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
  })
  const toggleLike = useMutation({
    mutationFn: updatePlaylistLike,
    onMutate: async (newLikeData: { playlist_id: string; user_id: string }) => {
      await queryClient.cancelQueries({ queryKey: ['playlist'] })
      const prevPlaylists = queryClient.getQueryData<OldData>(['playlist'])
      queryClient.setQueryData(['playlist'], (prevData: OldData) => {
        if (!prevData) return prevData
        return {
          ...prevData,
          pages: prevData.pages.map((page) => ({
            ...page,
            playlists: page.playlists.map((item) => {
              if (item.id === newLikeData.playlist_id) {
                return {
                  ...item,
                  playlist_like: item.playlist_like.some(
                    (like) => like.user_id === newLikeData.user_id,
                  )
                    ? item.playlist_like.filter(
                        (like) => like.user_id !== newLikeData.user_id,
                      ) // 좋아요 취소
                    : [...item.playlist_like, { user_id: newLikeData.user_id }],
                }
              }
              return item
            }),
          })),
        }
      })
      return { prevPlaylists }
    },
    onError: (err, newLikeData, context) => {
      if (context?.prevPlaylists) {
        queryClient.setQueryData(['playlist'], context.prevPlaylists)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlist'] })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['playlist'] })
    },
  })
  if (isLoading)
    return Array.from({
      length: 6,
    }).map((_, index) => <MyPageSkeleton key={index} />)
  if (error) return <p>에러가 발생하였습니다!</p>
  if (!user) return
  return (
    <div className="h-full w-full overflow-hidden">
      <div>
        {playlists?.pages.map((page, pageIndex) => {
          return (
            <div key={pageIndex}>
              {page?.playlists.map((p, index) => {
                const isLiked = p.playlist_like.some(
                  (like) => like.user_id === p.user_id,
                )
                const likeCount = p.playlist_like.length
                // 데이터리소스가 많이 낭비됨
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
                      toggleLike.mutate({
                        playlist_id: p.id,
                        user_id: user.id,
                      })
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
