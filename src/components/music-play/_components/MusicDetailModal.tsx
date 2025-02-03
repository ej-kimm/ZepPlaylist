import { Modal, MusicSaveBottomSheet } from '@/components/common'
import useIsDesktop from '@/hooks/useIsDesktop'
import useScrollLock from '@/hooks/useScrollLock'
import useSongLike from '@/hooks/useSongLike'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { userStore } from '@/store/userSlice'
import { Tables } from '@/types/supabase'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
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
}

export default function MusicDetailModal({
  musicDetail,
  url,
  lyrics,
  playerState: { played, duration, ready },
  onSeek,
}: MusicDetailModalProps) {
  const router = useRouter()
  const { user } = userStore()
  const user_id = user?.id || ''
  const { title, artist } = musicDetail || {}
  const { isPlayerModalOpen, closePlayerModal, setPlayerClose } =
    useMusicPlayerStore()
  const { updateLike } = useSongLike({ user_id })
  const isDesktop = useIsDesktop()
  useScrollLock(isPlayerModalOpen)

  const [isFullLyrics, setIsFullLyrics] = useState<boolean>(false)
  const [isSaved, setIsSaved] = useState<boolean>(false) // save 상태 관리
  const [isOpen, setIsOpen] = useState<boolean>(false) // 로그인 모달 상태

  const handleClickLyrics = () => {
    if (isDesktop) return
    setIsFullLyrics((prev) => !prev)
  }
  const handleUserAction = (type: 'like' | 'save') => {
    if (!user_id) {
      setIsOpen(true)
      return
    }

    if (type === 'like') {
      updateLike.mutate({ user_id })
    } else if (type === 'save') {
      setIsSaved((prev) => !prev)
    }
  }
  const closeModal = () => setIsOpen(false)
  const handleCloseAllModals = () => {
    closePlayerModal()
    closeModal()
    setPlayerClose()
  }
  const redirectToLogin = () => {
    handleCloseAllModals()
    router.push('/login')
  }

  return (
    <>
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
              onUserAction={handleUserAction}
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

      <Modal
        isOpen={isOpen}
        title="로그인 필요"
        content="로그인 화면으로 이동합니다"
        type="vertical"
        onConfirm={redirectToLogin}
        onCancel={closeModal}
      />

      <MusicSaveBottomSheet
        isOpen={isSaved}
        handleClose={() => handleUserAction('save')}
        musicName={title || ''}
        artistName={artist || ''}
      />
    </>
  )
}
