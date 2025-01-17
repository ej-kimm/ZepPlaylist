'use client'
import { fetchMusicId } from '@/api/music-play/actions'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'

export default function Test() {
  const { isPlaying, isPlayerOpen, setTrackIds, setPlayerOpen, stopPlay } =
    useMusicPlayerStore()
  const test = '5alUYFVxEur17iUbc3sNsX' // 1. 한곡 재생할 경우

  return (
    <p
      onClick={async () => {
        // 2. 여러곡 재생할 경우
        const trackId = await fetchMusicId()

        // 첫 번째 곡 재생 시 플레이어를 열고
        if (!isPlayerOpen) setPlayerOpen()

        setTrackIds(trackId) // 재생할 곡 아이디 넘기기
        stopPlay()
      }}
      className="cursor-pointer"
    >
      곡 테스트 컴포넌트 클릭
    </p>
  )
}
