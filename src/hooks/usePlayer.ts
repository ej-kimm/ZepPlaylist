'use client'
import { fetchMusicDetailByMusicId } from '@/api/music-play/actions'
import { getSongLyrics } from '@/api/music-play/genius-api'
import { fetchPreviewUrl } from '@/api/spotifyToken'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import type { Tables } from '@/types/supabase'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

type usePlayerProps =
  | Tables<'music'>['spotify_id']
  | Tables<'music'>['spotify_id'][]

const usePlayer = (trackId: usePlayerProps) => {
  const { trackIds, currentTrackIndex } = useMusicPlayerStore()

  useEffect(() => {
    const updatedTrackIds = Array.isArray(trackId) ? trackId : [trackId] // 여러곡 또는 한곡 재생할 경우 => 배열
    useMusicPlayerStore.setState({ trackIds: updatedTrackIds })
  }, [])

  const { data: musicDetail, isPending } = useQuery({
    queryKey: ['music', trackIds[currentTrackIndex]],
    queryFn: async () => {
      const trackId = trackIds[currentTrackIndex]
      const [trackUrl, musicDetail] = await Promise.all([
        fetchPreviewUrl(trackId),
        fetchMusicDetailByMusicId(trackId),
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
    enabled: trackIds.length > 0,
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
