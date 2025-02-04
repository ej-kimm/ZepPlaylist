'use client'
import {
  fetchMusicDetailByMusicId,
  fetchMusicLyricsByMusicId,
} from '@/api/music-play/actions'
import { getSongLyrics } from '@/api/music-play/lyrics-api'
import { fetchPreviewUrl } from '@/api/spotifyToken'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { userStore } from '@/store/userSlice'
import type { Tables } from '@/types/supabase'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const usePlayer = () => {
  const { user } = userStore()
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

      // 테이블에 노래 가사 조회
      let lyrics = await fetchMusicLyricsByMusicId(musicDetail.spotify_id)

      // 테이블에 가사가 없거나 null이면 lyricsovh api호출
      if (!lyrics) {
        lyrics = await getSongLyrics({
          title: musicDetail.title,
          artist: musicDetail.artist,
        })
      }

      // // [local에서만 실행] 멜론 TOP100 lyrics 테이블에 넣기
      // let lyrics = null
      // if (musicDetail) {
      //   lyrics = await getSongLyrics({
      //     title: musicDetail.title,
      //     artist: musicDetail.artist,
      //   })
      //   if (!lyrics) return
      //   await insertMusicLyrics({
      //     spotifyId: musicDetail.spotify_id,
      //     lyrics,
      //   })
      // }

      return { trackUrl, musicDetail, lyrics }
    },
    enabled: !!currentTrackId,
    staleTime: 12 * 60 * 60 * 1000, // 12시간
    gcTime: 24 * 60 * 60 * 1000, // 24시간
  })

  // 재생했던 목록들 session저장
  useEffect(() => {
    if (musicDetail?.musicDetail) {
      // created_at, lyrics제외 저장
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { created_at, lyrics, ...rest } = musicDetail.musicDetail

      const storedMusicDetails = JSON.parse(
        localStorage.getItem(`${user?.id}-history-playlist`) || '[]',
      )
      const isAlreayStored = storedMusicDetails.some(
        (track: Tables<'music'>) => track.title === rest.title,
      )

      if (!isAlreayStored) {
        const updatedMusicDetails = [rest, ...storedMusicDetails].slice(0, 20) // 최대 20개 까지만 저장

        localStorage.setItem(
          `${user?.id}-history-playlist`,
          JSON.stringify(updatedMusicDetails),
        )
      }
    }
  }, [musicDetail?.musicDetail, user?.id])

  return {
    musicDetail: musicDetail?.musicDetail,
    url: musicDetail?.trackUrl,
    lyrics: musicDetail?.lyrics ?? '😥 제공되는 가사가 없습니다',
    isPending,
  }
}

export default usePlayer
