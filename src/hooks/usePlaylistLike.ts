import {
  fetchLikeCount,
  fetchPlaylistLike,
  updatePlaylistLike,
} from '@/api/community/actions'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type UsePlaylistLikeProps = {
  user_id: string
  playlist_id: string
}

const usePlaylistLike = ({ user_id, playlist_id }: UsePlaylistLikeProps) => {
  const queryClient = useQueryClient()

  const { data: isLiked, isLoading: isPending } = useQuery({
    queryKey: ['playlist_like', user_id, playlist_id],
    queryFn: () => fetchPlaylistLike({ user_id, playlist_id }),
    enabled: !!user_id,
    retry: false,
    initialData: false,
  })

  const { data: likeCount = 0 } = useQuery({
    queryKey: ['playlist_like_count', playlist_id],
    queryFn: () => fetchLikeCount({ playlist_id }), 
    enabled: !!playlist_id,
  })

  const updateLike = useMutation({
    mutationFn: () => updatePlaylistLike({ user_id, playlist_id }),
    onMutate: async () => {
      const likeStateKey = ['playlist_like', user_id, playlist_id]
      const countKey = ['playlist_like_count', playlist_id]

      await queryClient.cancelQueries({ queryKey: likeStateKey })
      await queryClient.cancelQueries({ queryKey: countKey })

      const previousLikeState =
        queryClient.getQueryData<boolean>(likeStateKey) ?? false
      const previousLikeCount = queryClient.getQueryData<number>(countKey) ?? 0

      const newLikeState = !previousLikeState
      const newLikeCount = newLikeState
        ? previousLikeCount + 1
        : previousLikeCount - 1

      queryClient.setQueryData(likeStateKey, newLikeState)
      queryClient.setQueryData(countKey, newLikeCount)

      return { previousLikeState, previousLikeCount }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['playlist_like', user_id, playlist_id],
      })
      queryClient.invalidateQueries({
        queryKey: ['playlist_like_count', playlist_id],
      })
    },
  })

  return {
    toggleLike: updateLike.mutate,
    isLiked,
    isPending,
    likeCount,
  }
}

export default usePlaylistLike
