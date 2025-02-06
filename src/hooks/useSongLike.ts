import { fetchSongLikesAndMusic } from '@/api/home/actions'
import { isSongLiked, updateSongLike } from '@/api/music-play/actions'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { Tables } from '@/types/supabase'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type useSongLikeProps = {
  user_id: Tables<'song_like'>['user_id']
}

const useSongLike = ({ user_id }: useSongLikeProps) => {
  const queryClient = useQueryClient()
  const currentTrackId = useMusicPlayerStore(
    (state) => state.trackIds[state.currentTrackIndex],
  )

  const { data: songLike } = useQuery({
    queryKey: ['song_like', user_id, currentTrackId],
    queryFn: () => isSongLiked({ user_id, music_id: currentTrackId }),
    enabled: !!user_id && !!currentTrackId,
  })

  const { data: userLikedSong } = useQuery({
    queryKey: ['userLikedSong', user_id],
    queryFn: () => fetchSongLikesAndMusic({ user_id }),
    enabled: !!user_id,
  })

  const updateLike = useMutation({
    mutationFn: ({ user_id }: useSongLikeProps) =>
      updateSongLike({ music_id: currentTrackId, user_id }),
    onMutate: async ({ user_id }) => {
      const queryKey = ['song_like', user_id, currentTrackId]

      await queryClient.cancelQueries({ queryKey })
      // 이전 데이터를 백업
      const previousLikeState = queryClient.getQueryData<boolean>(queryKey)

      // 낙관적 업데이트 적용
      queryClient.setQueryData(queryKey, (prev: boolean) => !prev)

      return { previousLikeState }
    },
    onError: (err, variables, context) => {
      // 에러 발생 시 이전 데이터 복원
      queryClient.setQueryData(
        ['song_like', variables.user_id, currentTrackId],
        context?.previousLikeState,
      )
    },
    onSettled: () => {
      // 서버 요청 이후 데이터 동기화
      queryClient.invalidateQueries({
        queryKey: ['song_like', user_id, currentTrackId],
      })
      queryClient.invalidateQueries({
        queryKey: ['userLikedSong', user_id],
      })
    },
  })

  return { songLike, updateLike, userLikedSong }
}

export default useSongLike
