import useScrollLock from '@/hooks/useScrollLock'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { Tables } from '@/types/supabase'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
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
}

export default function MusicDetailModal({
  musicDetail,
  url,
  lyrics,
  playerState: { played, duration, ready },
  onSeek,
}: MusicDetailModalProps) {
  const { title, artist } = musicDetail || {}
  const { isPlayerModalOpen } = useMusicPlayerStore()
  useScrollLock(isPlayerModalOpen)

  const [isFullLyrics, setIsFullLyrics] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 720) // 화면 크기 상태

  const handleClickLyrics = () => setIsFullLyrics((prev) => !prev)

  const handleResize = () => {
    const isDesktopView = window.innerWidth >= 720
    setIsDesktop(isDesktopView)
    if (isDesktopView) {
      setIsFullLyrics(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
            musicName={musicDetail?.title}
            artistName={musicDetail?.artist}
          />
          {!isFullLyrics && <AlbumCover musicDetail={musicDetail} />}
        </div>
        <Lyrics
          lyrics={lyrics}
          isFullLyrics={isFullLyrics}
          isDesktop={isDesktop}
          onClickLyrics={handleClickLyrics}
        />
        <ProgressBar
          url={url}
          playerState={{ ready, played, duration }}
          onSeek={onSeek}
        />
        <PlayerControls />
      </div>
    </section>
  )
}
