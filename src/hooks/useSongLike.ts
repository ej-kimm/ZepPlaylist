import { fetchSongLike, updateSongLike } from '@/api/music-play/actions'
import { Tables } from '@/types/supabase'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type useSongLikeProps = {
  music_id: Tables<'song_like'>['music_id']
  user_id: Tables<'song_like'>['user_id']
}

const useSongLike = ({ user_id, music_id }: useSongLikeProps) => {
  const queryClient = useQueryClient()

  const { data: songLike, isPending } = useQuery({
    queryKey: ['song_like', user_id, music_id],
    queryFn: () => fetchSongLike({ user_id, music_id }),
  })

  const updateLike = useMutation({
    mutationFn: ({ music_id, user_id }: useSongLikeProps) =>
      updateSongLike({ music_id, user_id }),
    onMutate: async ({ music_id, user_id }) => {
      const queryKey = ['song_like', user_id, music_id]

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
        ['song_like', variables.user_id, variables.music_id],
        context?.previousLikeState,
      )
    },
    onSettled: () => {
      // 서버 요청 이후 데이터 동기화
      queryClient.invalidateQueries({
        queryKey: ['song_like', user_id, music_id],
      })
    },
  })

  return { songLike, isPending, updateLike }
}

export default useSongLike
