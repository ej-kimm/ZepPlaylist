import { toggleLike } from '@/api/my-page/actions'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useToggleLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleLike,
    onMutate: async (newLike) => {
      await queryClient.cancelQueries({
        queryKey: ['playlist_like', newLike.playlist_id],
      })

      const previousLikes = queryClient.getQueryData([
        'playlist_like',
        newLike.playlist_id,
      ])

      queryClient.setQueryData(
        ['playlist_like', newLike.playlist_id],
        (old: { user_id: string }[]) => {
          if (!old) return [newLike]
          return old.some((like) => like.user_id === newLike.user_id)
            ? old.filter((like) => like.user_id !== newLike.user_id)
            : [...old, newLike]
        },
      )

      return { previousLikes }
    },
    onError: (_err, newLike, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData(
          ['playlist_like', newLike.playlist_id],
          context.previousLikes,
        )
      }
    },
    onSettled: (_data, _error, newLike) => {
      queryClient.invalidateQueries({
        queryKey: ['playlist_like', newLike.playlist_id],
      })
      queryClient.invalidateQueries({
        queryKey: ['playlists'],
      })
    },
  })
}
