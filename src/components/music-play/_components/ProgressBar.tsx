'use client'

type PlayerState = {
  ready: boolean
  played: number
  duration: number
}

type ProgressBarProps = {
  playerState: PlayerState
  onSeek: (value: number) => void
  url: string[]
}

const ProgressBar = ({
  playerState: { ready, played, duration },
  onSeek,
  url,
}: ProgressBarProps) => {
  // 시간 포맷 함수 (초 → mm:ss)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`
  }

  if (url.length === 0) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      <time className="text-sm text-white">
        {formatTime(played * duration)}
      </time>
      <input
        className="h-1 flex-grow cursor-pointer rounded-lg bg-gray-600"
        type="range"
        min="0"
        max="0.999999"
        step="any"
        value={played}
        disabled={!ready}
        onChange={(e) => onSeek(parseFloat(e.target.value))}
      />
      <time className="text-sm text-white">{formatTime(duration)}</time>
    </div>
  )
}

export default ProgressBar
