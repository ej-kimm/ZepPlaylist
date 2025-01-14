'use client'
import usePlayer from '@/hooks/usePlayer'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import type { Tables } from '@/types/supabase'
import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import MusicDetailModal from './MusicDetailModal'
import MusicDetails from './MusicDetails'
import PlayerControls from './PlayerControls'
import ProgressBar from './ProgressBar'

// 플레이 리스트 전체 재생(배열) 또는 한 곡만 재생
type MusicPlayerProps = {
  trackId: Tables<'music'>['spotify_id'] | Tables<'music'>['spotify_id'][]
}

const MusicPlayer = ({ trackId }: MusicPlayerProps) => {
  const { musicDetail, url, lyrics, isPending } = usePlayer(trackId)
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

  if (!url) return <>URL loading</>
  if (isPending) return <>Loading...</>

  return (
    <div className="fixed bottom-0 left-0 h-14 w-full rounded-md bg-black">
      <ReactPlayer
        url={url}
        ref={playerRef}
        playing={isPlaying}
        controls={false}
        width="0"
        height="0"
        onReady={handleReady} // 영상 준비 완료 상태
        onDuration={handleDuration} // 총 재생 시간
        onProgress={handleProgress} // 현재 재생 시간
        onEnded={togglePlay}
      />
      <div className="flex items-center justify-between">
        <MusicDetails musicDetail={musicDetail} />
        <ProgressBar playerState={playerState} onSeek={handleSeek} url={url} />
        <PlayerControls />
        <button className="text-white" onClick={toggleModal}>
          열기
        </button>
      </div>
      {isModalOpen && (
        <MusicDetailModal
          url={url}
          toggleModal={toggleModal}
          musicDetail={musicDetail}
          lyrics={lyrics}
          playerState={playerState}
          onSeek={handleSeek}
        />
      )}
    </div>
  )
}

export default MusicPlayer
