'use client'
import { fetchMusicId } from '@/api/music-play/actions'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { useEffect } from 'react'

export default function Test() {
  const { isPlayerOpen, setTrackIds, togglePlay, setPlayerOpen } =
    useMusicPlayerStore()
  const test = '5alUYFVxEur17iUbc3sNsX' // 1. 한곡 재생할 경우

  useEffect(() => {
    const testfetch = async () => {
      // 재생 시키는 이벤트에서 해야할 필수 4가지!!
      const trackId = await fetchMusicId() // 2. 여러곡 재생할 경우
      if (!isPlayerOpen) setPlayerOpen() // 페이지 방문 후, 첫 곡 재생이면 플레이어바 보여줌
      setTrackIds(trackId) // 재생할 곡 아이디 넘겨주기
      togglePlay()
    }

    testfetch()
  }, [])

  return <>곡 테스트 컴포넌트</>
}
