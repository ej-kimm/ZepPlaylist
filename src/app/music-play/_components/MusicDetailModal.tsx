import { Tables } from '@/types/supabase'
import Image from 'next/image'
import Lyrics from './Lyrics'
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
  lyrics: string
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
  lyrics,
  playerState: { isPlaying, played, duration, ready },
  togglePlay,
  playPreviousTrack,
  playNextTrack,
  onSeek,
}: MusicDetailModalProps) {
  const { title = '', artist = '', album_cover } = musicDetail || {}

  return (
    <div className="absolute bottom-0 left-0 h-screen w-full overflow-y-scroll bg-slate-200">
      <div>
        <h3>{title}</h3>
        <p>{artist}</p>
        <Image
          src={album_cover || '/No cover'}
          alt={title || 'No Title'}
          width={200}
          height={200}
        />
        <Lyrics lyrics={lyrics} />
        <ProgressBar
          playerState={{ ready, played, duration }}
          onSeek={onSeek}
        />
        <PlayerControls
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          playPreviousTrack={playPreviousTrack}
          playNextTrack={playNextTrack}
        />
        <button onClick={toggleModal}>모달닫기임시버튼^^..</button>
      </div>
    </div>
  )
}
