'use client'
import { PlaylistUI } from '@/components/common'
import PlaylistDesktopUI from '@/components/common/PlaylistDesktop'
import { usePlaylistQuery } from '@/hooks/usePlaylistQuery'
import { useDeletePlaylist } from '@/hooks/usePlaylists'
import { useToggleLike } from '@/hooks/useToggle'
import { userStore } from '@/store/userSlice'
import { supabase } from '@/utils/supabase/client'
import { useQueries } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import MyPageSkeleton from './MyPageSkeleton'
const MyPlayList = () => {
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
  const { handleDeleteConfirmation } = useDeletePlaylist()

  const playlistLikes = useQueries({
    queries:
      playlists?.pages
        .flatMap((page) => page.data)
        .map((p) => ({
          queryKey: ['playlist_like', p.id],
          queryFn: async () => {
            const { data, error } = await supabase
              .from('playlist_like')
              .select('user_id')
              .eq('playlist_id', p.id)

            if (error) throw new Error(error.message)
            return data || []
          },
        })) || [],
  })
  const toggle = useToggleLike()
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
          <div
            key={pageIndex}
            className="gap-x-6 gap-y-10 desktop:mx-auto desktop:grid desktop:h-full desktop:w-full desktop:grid-cols-5 desktop:place-items-center"
          >
            {page?.data.map((p, index) => {
              const isLiked = p.playlist_like.some(
                (like) => like.user_id === p.user_id,
              )
              const likes = playlistLikes[index]?.data || []
              const likeCount = likes?.length || 0
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
                        toggle.mutate({ playlist_id: p.id, user_id: user.id })
                      }}
                    />
                  </div>
                  <div className="mb-10 mt-10 hidden desktop:block">
                    <PlaylistDesktopUI
                      album_cover={p.latest_song_cover}
                      onClick={() => {
                        router.replace(`/community/${p.id}`)
                      }}
                      title={p.name}
                      description={p.description || '설명창'}
                      isLiked={isLiked}
                      onDelete={() => handleDeleteConfirmation(p.id)}
                      onEdit={() => handleDeleteConfirmation(p.id)}
                      onLikeToggle={() => {
                        toggle.mutate({ playlist_id: p.id, user_id: user.id })
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

export default MyPlayList
