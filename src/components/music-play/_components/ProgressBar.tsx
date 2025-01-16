'use client'

type PlayerState = {
  ready: boolean
  played: number
  duration: number
}

type ProgressBarProps = {
  playerState: PlayerState
  isModalOpen: boolean
  onSeek: (value: number) => void
  url: string[]
}

const ProgressBar = ({
  playerState: { ready, played, duration },
  isModalOpen,
  onSeek,
  url,
}: ProgressBarProps) => {
  // 시간 포맷 함수 (초 → mm:ss)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes < 10 ? `0${minutes}` : minutes}:${secs < 10 ? `0${secs}` : secs}`
  }

  if (url.length === 0) {
    return null
  }

  return (
    <div className={`${isModalOpen ? 'block' : 'hidden'} flex flex-col gap-1`}>
      <div className="flex justify-between">
        <time className="text-[8px] font-normal leading-none tracking-normal text-[rgba(0,0,0,0.6)]">
          {formatTime(played * duration)}
        </time>
        <time className="text-[8px] font-normal leading-none tracking-normal text-[rgba(0,0,0,0.6)]">
          {formatTime(duration)}
        </time>
      </div>
      <input
        className="range-slider"
        type="range"
        min="0"
        max="0.999999"
        step="any"
        value={played}
        disabled={!ready}
        onChange={(e) => onSeek(parseFloat(e.target.value))}
        style={{
          background: `linear-gradient(to right, #B15EFF ${played * 100}%, #B15EFF ${played * 100}%, rgba(177, 94, 255, 0.1) ${played * 100}%, rgba(177, 94, 255, 0.1) 100%)`,
        }}
      />
    </div>
  )
}

export default ProgressBar
