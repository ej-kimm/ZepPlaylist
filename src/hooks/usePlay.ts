import { supabase } from '@/utils/supabase/client'
import { useQuery } from '@tanstack/react-query'

export const usePlay = (playlist_id: string) => {
  return useQuery({
    queryKey: ['playlist_like', playlist_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('playlist_like')
        .select('user_id')
        .eq('playlist_id', playlist_id)

      if (error) throw new Error(error.message)
      return data
    },
  })
}
