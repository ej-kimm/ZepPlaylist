'use client'
import pause from '@/assets/images/pause.svg'
import play from '@/assets/images/play.svg'
import playlist from '@/assets/images/playlist.svg'
import skipBack from '@/assets/images/skipBack.svg'
import skipNext from '@/assets/images/skipNext.svg'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import Image from 'next/image'

type PlayerControlsProps = {
  isModalOpen: boolean
}

const PlayerControls = ({ isModalOpen }: PlayerControlsProps) => {
  const { isPlaying, togglePlay, playNextTrack, playPreviousTrack } =
    useMusicPlayerStore()

  const ICON_SIZE = isModalOpen ? 36 : 24

  return (
    <div
      className={`flex items-center justify-end ${isModalOpen ? 'gap-10' : 'gap-2'}`}
    >
      <button type="button" onClick={playPreviousTrack}>
        <Image
          src={skipBack}
          width={ICON_SIZE}
          height={ICON_SIZE}
          alt="skipBack"
        />
      </button>
      <button type="button" onClick={togglePlay}>
        <Image
          src={isPlaying ? pause : play}
          width={ICON_SIZE}
          height={ICON_SIZE}
          alt={isPlaying ? 'pause' : 'play'}
        />
      </button>
      <button type="button" onClick={playNextTrack}>
        <Image
          src={skipNext}
          width={ICON_SIZE}
          height={ICON_SIZE}
          alt="skipNext"
        />
      </button>
      {/* TODO : playlist 기능 만들어야함 */}
      {!isModalOpen && (
        <button type="button" onClick={playNextTrack}>
          <Image
            src={playlist}
            width={ICON_SIZE}
            height={ICON_SIZE}
            alt="playlist"
          />
        </button>
      )}
    </div>
  )
}

export default PlayerControls
