'use client'
import { fetchMusicId } from '@/api/music-play/actions'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'

export default function Test() {
  const { isPlaying, isPlayerOpen, setTrackIds, togglePlay, setPlayerOpen } =
    useMusicPlayerStore()
  const test = '5alUYFVxEur17iUbc3sNsX' // 1. 한곡 재생할 경우

  return (
    <p
      onClick={async () => {
        // 재생 시키는 이벤트에서 해야할 필수 4가지!!
        const trackId = await fetchMusicId() // 2. 여러곡 재생할 경우
        if (!isPlayerOpen) setPlayerOpen() // 첫 번째 곡 재생 시 플레이어를 열고
        setTrackIds(trackId) // 재생할 곡 아이디 넘기기
        if (!isPlaying) {
          togglePlay() // 재생 중이 아니면 음악 시작
        }
      }}
      className="cursor-pointer"
    >
      곡 테스트 컴포넌트 클릭
    </p>
  )
}
