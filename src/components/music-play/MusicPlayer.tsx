'use client'
import usePlayer from '@/hooks/usePlayer'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import MusicDetailModal from './_components/MusicDetailModal'
import MusicDetails from './_components/MusicDetails'
import PlayerControls from './_components/PlayerControls'
import ProgressBar from './_components/ProgressBar'
import Skeleton from './_components/Skeleton'

const MusicPlayer = () => {
  const { isPlayerOpen } = useMusicPlayerStore()
  const { musicDetail, url, lyrics, isPending } = usePlayer()
  const { isPlaying, togglePlay } = useMusicPlayerStore()
  const [playerState, setPlayerState] = useState({
    ready: false, // onReady에서 영상이 로드된 상태값을 받아 사용
    played: 0, // 현재 재생 중인 시간 (0~0.9999)
    duration: 0, // 총 재생 시간
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const playerRef = useRef<ReactPlayer>(null)

  const toggleModal = () => setIsModalOpen((prev) => !prev)

  const handleReady = () => setPlayerState({ ...playerState, ready: true })
  const handleDuration = (duration: number) =>
    setPlayerState((prev) => ({ ...prev, duration }))
  const handleProgress = ({ played }: { played: number }) =>
    setPlayerState({ ...playerState, played })
  const handleSeek = (value: number) => {
    setPlayerState({ ...playerState, played: value }) // 클릭한 재생 위치로 업데이트
    playerRef.current?.seekTo(value) // 재생 위치 변경
  }

  if (!isPlayerOpen) return null // 초기에 노래를 재생하지 않으면 플레이어바 숨김
  if (!url || isPending) return <Skeleton />

  return (
    <section className="z-player shadow-drop fixed bottom-0 left-0 h-[60px] w-full bg-white">
      <ReactPlayer
        url={url}
        ref={playerRef}
        playing={isPlaying}
        controls={false}
        width="0"
        height="0"
        volume={0.3} // TODO : 임시로 볼륨 조절
        onReady={handleReady} // 영상 준비 완료 상태
        onDuration={handleDuration} // 총 재생 시간
        onProgress={handleProgress} // 현재 재생 시간
        onEnded={togglePlay}
      />
      <div className="flex h-full items-center justify-between px-6">
        <MusicDetails musicDetail={musicDetail} toggleModal={toggleModal} />
        <ProgressBar
          playerState={playerState}
          isModalOpen={isModalOpen}
          onSeek={handleSeek}
          url={url}
        />
        <PlayerControls isModalOpen={isModalOpen} />
      </div>

      <MusicDetailModal
        url={url}
        toggleModal={toggleModal}
        isModalOpen={isModalOpen}
        musicDetail={musicDetail}
        lyrics={lyrics}
        playerState={playerState}
        onSeek={handleSeek}
      />
    </section>
  )
}

export default MusicPlayer
