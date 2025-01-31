import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePlaylistLike } from '@/api/my-page/actions'
import type { OldData } from '@/types/playlistLike'

export const useToggleLikeMutation = () => {
  const queryClient = useQueryClient()

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

  return toggleLike
}
