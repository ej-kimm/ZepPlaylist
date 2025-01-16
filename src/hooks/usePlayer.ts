'use client'
import { fetchMusicDetailByMusicId } from '@/api/music-play/actions'
import { getSongLyrics } from '@/api/music-play/genius-api'
import { fetchPreviewUrl } from '@/api/spotifyToken'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { useQuery } from '@tanstack/react-query'

const usePlayer = () => {
  const currentTrackId = useMusicPlayerStore(
    (state) => state.trackIds[state.currentTrackIndex],
  )

  const { data: musicDetail, isPending } = useQuery({
    queryKey: ['music', currentTrackId],
    queryFn: async () => {
      const [trackUrl, musicDetail] = await Promise.all([
        fetchPreviewUrl(currentTrackId),
        fetchMusicDetailByMusicId(currentTrackId),
      ])

      // 노래 가사 가져오기
      let lyrics = null
      if (musicDetail) {
        lyrics = await getSongLyrics({
          title: musicDetail.title,
          artist: musicDetail.artist,
        })
      }

      return { trackUrl, musicDetail, lyrics }
    },
    enabled: !!currentTrackId,
  })

  // const playerQueries = useQueries({
  //   queries: trackIds.map((trackId) => ({
  //     queryKey: ['music', trackId],
  //     queryFn: async () => {
  //       const [trackUrl, musicDetail] = await Promise.all([
  //         fetchPreviewUrl(trackId),
  //         fetchMusicDetailByMusicId(trackId),
  //       ])

  //       // 노래 가사 가져오기
  //       let lyrics = null
  //       if (musicDetail) {
  //         lyrics = await getSongLyrics({
  //           title: musicDetail.title,
  //           artist: musicDetail.artist,
  //         })
  //       }

  //       return { trackUrl, musicDetail, lyrics }
  //     },
  //   })),
  // })
  // const isPending = playerQueries.some(
  //   (playerQuery) => playerQuery.isLoading || playerQuery.isFetching,
  // )
  // const currentTrackData = playerQueries[currentTrackIndex]?.data

  return {
    // musicDetail: currentTrackData?.musicDetail,
    // url: currentTrackData?.trackUrl,
    // lyrics: currentTrackData?.lyrics ?? '',
    // isPending,
    musicDetail: musicDetail?.musicDetail,
    url: musicDetail?.trackUrl,
    lyrics: musicDetail?.lyrics ?? '😥 제공되는 가사가 없습니다',
    isPending,
  }
}

export default usePlayer
