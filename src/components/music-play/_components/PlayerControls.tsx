'use client'
import pause from '@/assets/images/pause.svg'
import play from '@/assets/images/play.svg'
import playlist from '@/assets/images/playlist.svg'
import skipBack from '@/assets/images/skipBack.svg'
import skipNext from '@/assets/images/skipNext.svg'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import Image from 'next/image'

const PlayerControls = () => {
  const { isPlaying, togglePlay, playNextTrack, playPreviousTrack } =
    useMusicPlayerStore()

  return (
    <div className="flex items-center justify-end gap-2">
      <button type="button" onClick={playPreviousTrack}>
        <Image src={skipBack} width={24} height={24} alt="skipBack" />
      </button>
      <button type="button" onClick={togglePlay}>
        <Image
          src={isPlaying ? play : pause}
          width={24}
          height={24}
          alt={isPlaying ? 'play' : 'pause'}
        />
      </button>
      <button type="button" onClick={playNextTrack}>
        <Image src={skipNext} width={24} height={24} alt="skipNext" />
      </button>
      {/* TODO : playlist 기능 만들어야함 */}
      <button type="button" onClick={playNextTrack}>
        <Image src={playlist} width={24} height={24} alt="playlist" />
      </button>
    </div>
  )
}

export default PlayerControls
