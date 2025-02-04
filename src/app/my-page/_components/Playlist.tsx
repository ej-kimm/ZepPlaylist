'use client'
import ddd from '@/assets/images/ddd.png'
import { PlaylistUI } from '@/components/common'
import PlaylistDesktopUI from '@/components/common/PlaylistDesktop'
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
  } = usePlaylistQuery('user')

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
      {playlists?.pages.map((page, pageIndex) => {
        return (
          // 화면 사이즈가 늘어나면 이미지 크기 늘릴지
          // 그냥 이상태에서 1056사이즈로 갈지지
          // max-w 정정
          // 이미지 크기 제한이 있어야함
          <div
            key={pageIndex}
            className="desktop:mx-auto desktop:w-[1056px] gap-x-6 gap-y-10 desktop:grid desktop:grid-cols-3 desktop:place-items-center desktop-lg:grid-cols-5"
          >
            {page?.playlists.map((p) => {
              const isLiked = p.playlist_like.some(
                (like) => like.user_id === p.user_id,
              )
              const likeCount = p.playlist_like.length
              return (
                <div key={p.id}>
                  <div className="block desktop:hidden">
                    <PlaylistUI
                      profileImg={
                        user.profile_image ||
                        '/_next/static/media/defaultProfileImg.caab3de8.png'
                      }
                      playlistName={p.name}
                      nickName={user.nickname}
                      isLiked={isLiked}
                      onClick={() => {
                        router.replace(`/community/${p.id}`)
                      }}
                      likeCount={likeCount}
                      onLikeToggle={() => {
                        toggleLike.mutate({
                          playlist_id: p.id,
                          user_id: user.id,
                        })
                      }}
                    />
                  </div>
                  <div className="mb-10 mt-10 hidden desktop:block">
                    <PlaylistDesktopUI
                      album_cover={ddd}
                      onClick={() => {
                        router.replace(`/community/${p.id}`)
                      }}
                      title={p.name}
                      description={p.description || '설명창'}
                      isLiked={isLiked}
                      onLikeToggle={() => {
                        toggleLike.mutate({
                          playlist_id: p.id,
                          user_id: user.id,
                        })
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}

      <div ref={ref}>{isFetchingNextPage && <p>Loading...</p>}</div>
    </div>
  )
}

export default PlayList
