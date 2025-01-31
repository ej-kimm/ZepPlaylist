'use client'
import { PlaylistUI } from '@/components/common'
import { usePlaylistQuery } from '@/hooks/usePlaylistQuery'
import { useToggleLikeMutation } from '@/hooks/useToggleLikeMutation'
import { userStore } from '@/store/userSlice'
import { useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import MyPageSkeleton from './MyPageSkeleton'

const PlayList = () => {
  const { user } = userStore()
  const router = useRouter()
  const {
    playlists,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = usePlaylistQuery()

  const toggleLike = useToggleLikeMutation()
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
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
              {page?.playlists.map((p) => {
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
