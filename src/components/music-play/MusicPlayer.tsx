'use client'
import usePlayer from '@/hooks/usePlayer'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import ActionButtons from './_components/ActionButtons'
import MusicDetailModal from './_components/MusicDetailModal'
import MusicDetails from './_components/MusicDetails'
import PlayerControls from './_components/PlayerControls'
import PlayerModalSkeleton from './_components/PlayerModalSkeleton'
import PlayerSkeleton from './_components/PlayerSkeleton'
import ProgressBar from './_components/ProgressBar'

const MusicPlayer = () => {
  const playerRef = useRef<ReactPlayer>(null)
  const [playerState, setPlayerState] = useState({
    ready: false, // onReady에서 영상이 로드된 상태값을 받아 사용
    played: 0, // 현재 재생 중인 시간 (0~0.9999)
    duration: 0, // 총 재생 시간
    volume: 0.3, // 노래 볼륨
  })
  const { isPlayerOpen, isPlaying, isPlayerModalOpen, stop } =
    useMusicPlayerStore()
  const { musicDetail, url, lyrics, isPending } = usePlayer()
  const pathname = usePathname()

  const hidePlayerBar =
    pathname === '/login' || pathname.startsWith('/community/')

  const handleReady = () => setPlayerState({ ...playerState, ready: true })
  const handleDuration = (duration: number) =>
    setPlayerState((prev) => ({ ...prev, duration }))
  const handleProgress = ({ played }: { played: number }) =>
    setPlayerState({ ...playerState, played })
  const handleSeek = (value: number) => {
    setPlayerState({ ...playerState, played: value }) // 클릭한 재생 위치로 업데이트
    playerRef.current?.seekTo(value) // 재생 위치 변경
  }
  const handleVolumeChange = (volume: number) =>
    setPlayerState({ ...playerState, volume })

  // 경로에 따른 동작
  useEffect(() => {
    if (hidePlayerBar) {
      stop()
    }
  }, [hidePlayerBar, stop])

  if (!isPlayerOpen) return null // 초기에 노래를 재생하지 않으면 플레이어바 숨김
  if (!url || isPending) {
    if (pathname.startsWith('/community/')) return null
    return isPlayerModalOpen ? <PlayerModalSkeleton /> : <PlayerSkeleton />
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
        volume={playerState.volume}
        onReady={handleReady} // 영상 준비 완료 상태
        onDuration={handleDuration} // 총 재생 시간
        onProgress={handleProgress} // 현재 재생 시간
        onEnded={stop}
      />
      {!hidePlayerBar && (
        <section
          className={clsx(
            'fixed bottom-0 left-0 z-player h-player w-full bg-white shadow-drop',
            'desktop:h-navBar-desktop',
          )}
        >
          <div className="flex h-full items-center justify-between px-6">
            <MusicDetails musicDetail={musicDetail} />
            <div
              className={clsx(
                'desktop:absolute desktop:left-1/2 desktop:top-1/2 desktop:w-[546px] desktop:-translate-x-1/2 desktop:-translate-y-1/2 desktop:bg-white',
              )}
            >
              <PlayerControls className="gap-2" ICON_SIZE={24} />
              <ProgressBar
                playerState={playerState}
                onSeek={handleSeek}
                url={url}
              />
            </div>
            <ActionButtons
              musicName={musicDetail?.title}
              artistName={musicDetail?.artist}
              volumeLevel={playerState.volume}
              onVolumeChange={handleVolumeChange}
            />
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
