'use client'
type PlayerControlsProps = {
  isPlaying: boolean
  togglePlay: () => void
  playPreviousTrack: () => void
  playNextTrack: () => void
}

const PlayerControls = ({
  isPlaying,
  togglePlay,
  playPreviousTrack,
  playNextTrack,
}: PlayerControlsProps) => {
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
