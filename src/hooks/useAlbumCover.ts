import { fetchGenre, fetchTrack } from '@/api/music-play/spotify-api'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { useQuery } from '@tanstack/react-query'

const useAlbumCover = () => {
  const currentTrackId = useMusicPlayerStore(
    (state) => state.trackIds[state.currentTrackIndex],
  )

  const { data: album, isPending: isAlbumPending } = useQuery({
    queryKey: ['album', currentTrackId],
    queryFn: () => fetchTrack(currentTrackId),
    select: (data) => {
      const releaseDate = data.album.release_date || ''
      const formattedReleaseDate = releaseDate
        ? new Date(releaseDate).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : ''
      return {
        artistId: data.artists[0].id || '',
        releaseDate: formattedReleaseDate,
        albumName: data.album.name || '',
      }
    },
    enabled: !!currentTrackId,
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
