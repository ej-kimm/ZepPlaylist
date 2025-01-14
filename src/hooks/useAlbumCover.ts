import { fetchGenre, fetchTrack } from '@/api/music-play/spotify-api'
import { Tables } from '@/types/supabase'
import { useQuery } from '@tanstack/react-query'

const useAlbumCover = (spotify_id: Tables<'music'>['spotify_id']) => {
  const { data: album, isPending: isAlbumPending } = useQuery({
    queryKey: ['album', spotify_id],
    queryFn: () => fetchTrack(spotify_id),
    select: (data) => {
      return {
        artistId: data.artists[0].id || '',
        releaseDate: data.album.release_date || '',
        albumName: data.album.name || '',
      }
    },
    enabled: !!spotify_id,
  })

  const { data: genre, isPending: isGenrePending } = useQuery({
    queryKey: ['genre', album?.artistId],
    queryFn: () => fetchGenre(album?.artistId),
    enabled: !!album,
  })

  const isPending = isAlbumPending || isGenrePending

  return { album, genre, isPending }
}

export default useAlbumCover
