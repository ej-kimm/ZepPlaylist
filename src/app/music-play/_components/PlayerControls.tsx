'use client'

import { useMusicPlayerStore } from '@/store/musicPlayerStore'

type PlayerControlsProps = {
  isPlaying: boolean
  togglePlay: () => void
}

const PlayerControls = ({ isPlaying, togglePlay }: PlayerControlsProps) => {
  const { playNextTrack, playPreviousTrack } = useMusicPlayerStore()

  return (
    <div>
      <button className="text-white" onClick={playPreviousTrack}>
        &lt;&lt;
      </button>
      <button className="text-white" onClick={togglePlay}>
        {isPlaying ? 'PLAY' : 'PAUSE'}
      </button>
      <button className="text-white" onClick={playNextTrack}>
        &gt;&gt;
      </button>
    </div>
  )
}

export default PlayerControls
