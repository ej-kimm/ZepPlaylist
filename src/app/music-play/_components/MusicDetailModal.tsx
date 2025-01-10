import { Tables } from '@/types/supabase'
import Image from 'next/image'
import PlayerControls from './PlayerControls'
import ProgressBar from './ProgressBar'

type PlayerState = {
  isPlaying: boolean
  played: number
  duration: number
  ready: boolean
}

type MusicDetailModalProps = {
  musicDetail: Tables<'music'> | undefined
  playerState: PlayerState
  toggleModal: () => void
  togglePlay: () => void
  playPreviousTrack: () => void
  playNextTrack: () => void
  onSeek: (value: number) => void
}

export default function MusicDetailModal({
  toggleModal,
  musicDetail,
  playerState: { isPlaying, played, duration, ready },
  togglePlay,
  playPreviousTrack,
  playNextTrack,
  onSeek,
}: MusicDetailModalProps) {
  return (
    <div className="absolute bottom-0 left-0 h-screen w-full bg-slate-200">
      <div>
        <h3>{musicDetail?.title}</h3>
        <p>{musicDetail?.artist}</p>
        <Image
          src={musicDetail?.album_cover || '/No cover'}
          alt={musicDetail?.title || 'No Title'}
          width={200}
          height={200}
        />
        <PlayerControls
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          playPreviousTrack={playPreviousTrack}
          playNextTrack={playNextTrack}
        />
        <ProgressBar
          playerState={{ ready, played, duration }}
          onSeek={onSeek}
        />
        <button onClick={toggleModal}>모달닫기임시버튼^^..</button>
      </div>
    </div>
  )
}
