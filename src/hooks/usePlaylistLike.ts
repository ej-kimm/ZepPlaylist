import { fetchPlaylistLike, updatePlaylistLike } from '@/api/community/actions'
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
  })

  const updateLike = useMutation({
    mutationFn: () => updatePlaylistLike({ user_id, playlist_id }),
    onMutate: async () => {
      const queryKey = ['playlist_like', user_id, playlist_id]

      await queryClient.cancelQueries({ queryKey })

      const previousState = queryClient.getQueryData<boolean>(queryKey)

      queryClient.setQueryData(queryKey, (prev: boolean | undefined) => !prev)

      return { previousState }
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        ['playlist_like', user_id, playlist_id],
        context?.previousState,
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['playlist_like', user_id, playlist_id],
      })
    },
  })

  return {
    toggleLike: updateLike.mutate,
    isLiked,
    isPending,
    updateLike,
  }
}

export default usePlaylistLike
