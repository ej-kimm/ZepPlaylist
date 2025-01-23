'use client'
import usePlayer from '@/hooks/usePlayer'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import MusicDetailModal from './_components/MusicDetailModal'
import MusicDetails from './_components/MusicDetails'
import PlayerControls from './_components/PlayerControls'
import PlayerSkeleton from './_components/PlayerSkeleton'
import ProgressBar from './_components/ProgressBar'

const MusicPlayer = () => {
  const playerRef = useRef<ReactPlayer>(null)
  const [playerState, setPlayerState] = useState({
    ready: false, // onReady에서 영상이 로드된 상태값을 받아 사용
    played: 0, // 현재 재생 중인 시간 (0~0.9999)
    duration: 0, // 총 재생 시간
  })
  const { isPlayerOpen, isPlaying, isPlayerModalOpen, stop } =
    useMusicPlayerStore()
  const { musicDetail, url, lyrics, isPending } = usePlayer()
  const pathname = usePathname()
  const hidePlayerBar =
    pathname.startsWith('/community/') ||
    pathname === '/community' ||
    pathname === '/login'

  const handleReady = () => setPlayerState({ ...playerState, ready: true })
  const handleDuration = (duration: number) =>
    setPlayerState((prev) => ({ ...prev, duration }))
  const handleProgress = ({ played }: { played: number }) =>
    setPlayerState({ ...playerState, played })
  const handleSeek = (value: number) => {
    setPlayerState({ ...playerState, played: value }) // 클릭한 재생 위치로 업데이트
    playerRef.current?.seekTo(value) // 재생 위치 변경
  }

  // 커뮤니티 페이지일 경우 노래 멈추기
  useEffect(() => {
    if (hidePlayerBar) {
      stop()
    }
  }, [hidePlayerBar])

  if (!isPlayerOpen) return null // 초기에 노래를 재생하지 않으면 플레이어바 숨김
  if (!url || isPending) {
    // TODO : 스켈레톤 UI 공용으로 로직분리
    return !isPlayerModalOpen && <PlayerSkeleton />
  }

  return (
    <>
      <ReactPlayer
        url={url}
        ref={playerRef}
        playing={playerState.ready ? isPlaying : undefined}
        controls={false}
        width="0"
        height="0"
        volume={0.3} // TODO : 임시로 볼륨 조절
        onReady={handleReady} // 영상 준비 완료 상태
        onDuration={handleDuration} // 총 재생 시간
        onProgress={handleProgress} // 현재 재생 시간
        onEnded={stop}
      />
      {!hidePlayerBar && (
        <section className="fixed bottom-0 left-0 z-player h-[60px] w-full bg-white shadow-drop">
          <div className="flex h-full items-center justify-between px-6">
            <MusicDetails musicDetail={musicDetail} />
            <ProgressBar
              playerState={playerState}
              onSeek={handleSeek}
              url={url}
            />
            <PlayerControls />
          </div>

          <MusicDetailModal
            url={url}
            musicDetail={musicDetail}
            lyrics={lyrics}
            playerState={playerState}
            onSeek={handleSeek}
          />
        </section>
      )}
    </>
  )
}

export default MusicPlayer
