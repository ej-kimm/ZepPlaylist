'use client'
import pause from '@/assets/images/pause.svg'
import playing from '@/assets/images/play.svg'
import playlist from '@/assets/images/playlist.svg'
import skipBack from '@/assets/images/skipBack.svg'
import skipNext from '@/assets/images/skipNext.svg'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type PlayerControlsProps = {
  className: string
  ICON_SIZE: number
}

const PlayerControls = ({ className, ICON_SIZE }: PlayerControlsProps) => {
  const router = useRouter()
  const {
    trackIds,
    currentTrackIndex,
    isPlaying,
    isPlayerModalOpen,
    togglePlay,
    playNextTrack,
    playPreviousTrack,
  } = useMusicPlayerStore()

  const isFirstTrack = currentTrackIndex === 0
  const isLastTrack = currentTrackIndex === trackIds.length - 1

  return (
    <div
      className={clsx(
        'flex shrink-0 items-center justify-end py-2',
        'desktop:mb-[10px] desktop:w-full desktop:justify-center desktop:gap-[60px] desktop:py-0',
        className,
      )}
    >
      <button type="button" onClick={playPreviousTrack} disabled={isFirstTrack}>
        <Image
          src={skipBack}
          width={ICON_SIZE}
          height={ICON_SIZE}
          alt="skipBack"
          className={clsx(isFirstTrack ? 'opacity-40' : 'opacity-100')}
        />
      </button>
      <button type="button" onClick={togglePlay}>
        <Image
          src={isPlaying ? pause : playing}
          width={ICON_SIZE}
          height={ICON_SIZE}
          alt={isPlaying ? 'pause' : 'play'}
        />
      </button>
      <button type="button" onClick={playNextTrack} disabled={isLastTrack}>
        <Image
          src={skipNext}
          width={ICON_SIZE}
          height={ICON_SIZE}
          alt="skipNext"
          className={clsx(isLastTrack ? 'opacity-40' : 'opacity-100')}
        />
      </button>
      {!isPlayerModalOpen && (
        <button type="button" className={clsx('desktop:hidden')}>
          <Image
            src={playlist}
            width={ICON_SIZE}
            height={ICON_SIZE}
            alt="playlist"
            onClick={() => {
              router.push('/music-history')
            }}
          />
        </button>
      )}
    </div>
  )
}

export default PlayerControls
