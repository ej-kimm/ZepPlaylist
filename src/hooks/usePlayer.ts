'use client'
import {
  fetchMusicDetailByMusicId,
  fetchMusicLyricsByMusicId,
} from '@/api/music-play/actions'
import { getSongLyrics } from '@/api/music-play/lyrics-api'
import { fetchPreviewUrl } from '@/api/spotifyToken'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import type { Tables } from '@/types/supabase'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

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
  // 뮤직디테일 8개 담기 (현재재생목록 만들거) 로컬스토리지에 담아서 8개 갯수제한두고 가사 애매한데 그냥 제목클릭하면 다시 은지님 컴포넌트로 넘길지지
  // 은지님한테 타입 물어봐서 지정해주기기
  useEffect(() => {
    if (musicDetail?.musicDetail) {
      const storedMusicDetails = JSON.parse(
        localStorage.getItem('current-playlist') || '[]',
      )
      const validation = storedMusicDetails.some(
        (track: Tables<'music'>) =>
          track.title === musicDetail.musicDetail.title,
      )
      if (!validation) {
        const updatedMusicDetails = [
          musicDetail.musicDetail,
          ...storedMusicDetails,
        ]
        if (updatedMusicDetails.length > 8) {
          updatedMusicDetails.pop()
        }
        localStorage.setItem(
          'current-playlist',
          JSON.stringify(updatedMusicDetails),
        )
      }
    }
  }, [musicDetail?.musicDetail])

  return {
    musicDetail: musicDetail?.musicDetail,
    url: musicDetail?.trackUrl,
    lyrics: musicDetail?.lyrics ?? '😥 제공되는 가사가 없습니다',
    isPending,
  }
}

export default usePlayer
