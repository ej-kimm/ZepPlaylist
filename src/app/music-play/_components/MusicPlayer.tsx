'use client'
import usePlayer from '@/hooks/usePlayer'
import type { Tables } from '@/types/supabase'
import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import MusicDetails from './MusicDetails'
import PlayerControls from './PlayerControls'
import ProgressBar from './ProgressBar'

// 플레이 리스트 전체 재생(배열) 또는 한 곡만 재생
type MusicPlayerProps = {
  trackId: Tables<'music'>['spotify_id'] | Tables<'music'>['spotify_id'][]
}

const MusicPlayer = ({ trackId }: MusicPlayerProps) => {
  const { musicDetail, url, playNextTrack, playPreviousTrack } =
    usePlayer(trackId)
  const playerRef = useRef<ReactPlayer>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [ready, setReady] = useState(false) // onReady에서 영상이 로드된 상태값을 받아 사용
  const [played, setPlayed] = useState(0) // 현재 재생 시간 (0~0.9999)
  const [duration, setDuration] = useState(0) // 총 재생 시간

  const togglePlay = () => setIsPlaying((prev) => !prev)
  const handleSeek = (value: number) => {
    setPlayed(value) // 클릭한 재생 위치로 업데이트
    playerRef.current?.seekTo(value) // 재생 위치 변경
  }

  if (!url) {
    return null
  } 

  return (
    <div className="fixed bottom-0 left-0 h-14 w-full rounded-md bg-black">
      <ReactPlayer
        url={url}
        ref={playerRef}
        playing={isPlaying}
        controls={false}
        width="0"
        height="0"
        onReady={() => setReady(true)} // 영상 준비 완료 상태
        onDuration={setDuration} // 총 재생 시간
        onProgress={({ played }) => setPlayed(played)} // 현재 재생 시간
        onEnded={togglePlay}
      />
      <div className="flex items-center justify-between">
        <MusicDetails musicDetail={musicDetail} />
        <ProgressBar
          ready={ready}
          played={played}
          duration={duration}
          onSeek={handleSeek}
        />
        <PlayerControls
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          playPreviousTrack={playPreviousTrack}
          playNextTrack={playNextTrack}
        />
      </div>
    </div>
  )
}

export default MusicPlayer
