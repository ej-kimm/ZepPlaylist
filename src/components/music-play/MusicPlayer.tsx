'use client'
import useIsDesktop from '@/hooks/useIsDesktop'
import usePlayer from '@/hooks/usePlayer'
import useSongLike from '@/hooks/useSongLike'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { userStore } from '@/store/userSlice'
import type { SpotifyTrack } from '@/types/billboradCharts'
import clsx from 'clsx'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { Modal, MusicSaveBottomSheet, MusicSaveModal } from '../common'
import ActionButtons from './_components/ActionButtons'
import MusicDetailModal from './_components/MusicDetailModal'
import MusicDetails from './_components/MusicDetails'
import PlayerControls from './_components/PlayerControls'
import PlayerModalSkeleton from './_components/PlayerModalSkeleton'
import PlayerSkeleton from './_components/PlayerSkeleton'
import ProgressBar from './_components/ProgressBar'

const MusicPlayer = () => {
  const router = useRouter()
  const { user } = userStore()
  const user_id = user?.id || ''
  const playerRef = useRef<ReactPlayer>(null)
  const [playerState, setPlayerState] = useState({
    ready: false, // onReady에서 영상이 로드된 상태값을 받아 사용
    played: 0, // 현재 재생 중인 시간 (0~0.9999)
    duration: 0, // 총 재생 시간
    volume: 0.3, // 노래 볼륨
  })
  const [isSaved, setIsSaved] = useState<boolean>(false) // save 상태 관리
  const [isOpen, setIsOpen] = useState<boolean>(false) // 로그인 모달 상태
  const [selectedSong, setSelectedSong] = useState<SpotifyTrack>()
  const { updateLike } = useSongLike({ user_id })
  const {
    isPlayerOpen,
    isPlaying,
    isPlayerModalOpen,
    closePlayerModal,
    setPlayerClose,
    stop,
  } = useMusicPlayerStore()
  const { musicDetail, url, lyrics, isPending } = usePlayer()
  const pathname = usePathname()
  const isDesktop = useIsDesktop()

  const stopPlaying =
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

  const handleUserAction = (type: 'like' | 'save') => {
    if (!user_id) {
      setIsOpen(true)
      return
    }

    if (type === 'like') {
      updateLike.mutate({ user_id })
    } else if (type === 'save') {
      setIsSaved((prev) => !prev)

      const newSong = {
        id: musicDetail!.spotify_id,
        artist: musicDetail!.artist,
        title: musicDetail!.title,
        albumCover: musicDetail!.album_cover,
        plyTime: musicDetail!.play_time,
        albumName: musicDetail!.album_name,
      }
      setSelectedSong(newSong)
    }
  }
  const closeModal = () => setIsOpen(false)
  const handleCloseAllModals = () => {
    closePlayerModal()
    closeModal()
    setPlayerClose()
  }
  const redirectToLogin = () => {
    handleCloseAllModals()
    router.push('/login')
  }

  // 경로에 따른 동작
  useEffect(() => {
    if (stopPlaying) {
      stop()
    }
  }, [stopPlaying, stop])

  if (!isPlayerOpen) return null // 초기에 노래를 재생하지 않으면 플레이어바 숨김
  if (!url || isPending) {
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
              'desktop:absolute desktop:left-1/2 desktop:top-1/2 desktop:w-[327px] desktop:-translate-x-1/2 desktop:-translate-y-1/2 desktop:bg-white',
              'desktop-xl:w-[546px]',
            )}
          >
            <PlayerControls className="gap-2" ICON_SIZE={24} />
            <ProgressBar
              playerState={playerState}
              onSeek={handleSeek}
              url={url}
              className="hidden desktop:flex"
            />
          </div>
          <ActionButtons
            volumeLevel={playerState.volume}
            onVolumeChange={handleVolumeChange}
            className="hidden desktop:flex"
            ICON_SIZE={24}
            onUserAction={handleUserAction}
          />
        </div>

        <MusicDetailModal
          url={url}
          musicDetail={musicDetail}
          lyrics={lyrics}
          playerState={playerState}
          onSeek={handleSeek}
          onUserAction={handleUserAction}
        />
      </section>

      <Modal
        isOpen={isOpen}
        title="로그인 필요"
        content="로그인 화면으로 이동합니다"
        type="vertical"
        className="desktop:w-[434px]"
        onConfirm={redirectToLogin}
        onCancel={closeModal}
      />

      {isDesktop ? (
        <MusicSaveModal
          isOpen={isSaved}
          handleClose={() => handleUserAction('save')}
          musicName={musicDetail?.title || ''}
          artistName={musicDetail?.artist || ''}
        />
      ) : (
        <MusicSaveBottomSheet
          isOpen={isSaved}
          handleClose={() => handleUserAction('save')}
          musicName={musicDetail?.title || ''}
          artistName={musicDetail?.artist || ''}
          musicData={selectedSong!}
        />
      )}
    </>
  )
}

export default MusicPlayer
