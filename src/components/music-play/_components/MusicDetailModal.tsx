import useIsDesktop from '@/hooks/useIsDesktop'
import useScrollLock from '@/hooks/useScrollLock'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { Tables } from '@/types/supabase'
import clsx from 'clsx'
import { useState } from 'react'
import ActionButtons from './ActionButtons'
import AlbumCover from './AlbumCover'
import Lyrics from './Lyrics'
import PlayerControls from './PlayerControls'
import ProgressBar from './ProgressBar'

type PlayerState = {
  played: number
  duration: number
  ready: boolean
}

type MusicDetailModalProps = {
  musicDetail: Tables<'music'> | undefined
  lyrics: string
  url: string[]
  playerState: PlayerState
  onSeek: (value: number) => void
  onUserAction: (type: 'like' | 'save') => void
}

export default function MusicDetailModal({
  musicDetail,
  url,
  lyrics,
  playerState: { played, duration, ready },
  onSeek,
  onUserAction,
}: MusicDetailModalProps) {
  const { title, artist } = musicDetail || {}
  const { isPlayerModalOpen } = useMusicPlayerStore()
  const isDesktop = useIsDesktop()
  useScrollLock(isPlayerModalOpen)

  const [isFullLyrics, setIsFullLyrics] = useState<boolean>(false)

  const handleClickLyrics = () => {
    if (isDesktop) return
    setIsFullLyrics((prev) => !prev)
  }

  return (
    <section
      className={clsx(
        'fixed bottom-0 left-0 z-player-modal h-navBar-calc w-full bg-white px-6 pb-5 transition-all duration-500 ease-out',
        'desktop:flex desktop:h-navBar-desktop-calc desktop:items-center desktop:justify-center desktop:p-0',
        isPlayerModalOpen
          ? 'translate-y-0 desktop:bottom-[66px]'
          : 'translate-y-full',
      )}
    >
      <div
        className={clsx(
          'grid h-full w-full grid-cols-1 place-items-center',
          'desktop:h-[533px] desktop:w-[1042px] desktop:grid-cols-2 desktop:bg-white',
        )}
      >
        <div
          className={clsx(
            'flex h-full w-full flex-col items-center justify-between',
          )}
        >
          <header>
            <h3 className="title-1 mb-2 text-center">{title}</h3>
            <p className="caption-1 text-center">{artist}</p>
          </header>
          <ActionButtons
            className="flex desktop:hidden"
            ICON_SIZE={16}
            onUserAction={onUserAction}
          />
          {!isFullLyrics && <AlbumCover musicDetail={musicDetail} />}
        </div>
        <Lyrics
          lyrics={lyrics}
          isFullLyrics={isFullLyrics}
          onClickLyrics={handleClickLyrics}
        />
        <ProgressBar
          url={url}
          playerState={{ ready, played, duration }}
          onSeek={onSeek}
          className="flex desktop:hidden"
        />
        <PlayerControls className="gap-10 desktop:hidden" ICON_SIZE={36} />
      </div>
    </section>
  )
}
