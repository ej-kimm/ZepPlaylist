'use cleint'
import save from '@/assets/images/close.svg'
import likeFalse from '@/assets/images/heart.svg'
import leftArrow from '@/assets/images/leftArrow.svg'
import likeTrue from '@/assets/images/likeTrue.svg'
import volume from '@/assets/images/volume.svg'
import volumeZero from '@/assets/images/volumeZero.svg'
import { Modal, MusicSaveBottomSheet } from '@/components/common'
import useSongLike from '@/hooks/useSongLike'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { userStore } from '@/store/userSlice'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type ActionButtonsProps = {
  musicName: string | undefined
  artistName: string | undefined
  className: string
  ICON_SIZE: number
  volumeLevel?: number
  onVolumeChange?: (volume: number) => void
}

const ActionButtons = ({
  musicName,
  artistName,
  className,
  ICON_SIZE,
  volumeLevel,
  onVolumeChange,
}: ActionButtonsProps) => {
  const router = useRouter()
  const { user } = userStore()
  const user_id = user?.id || ''
  const { songLike, updateLike } = useSongLike({ user_id })
  const { closePlayerModal, setPlayerClose, togglePlayerModal } =
    useMusicPlayerStore()

  const [isSaved, setIsSaved] = useState<boolean>(false) // save 상태 관리
  const [isOpen, setIsOpen] = useState<boolean>(false) // 로그인 모달 상태
  const [isVolumeVisible, setIsVolumeVisible] = useState(false)
  const volumeRef = useRef<HTMLDivElement>(null)

  const toggleVolumeButton = () => setIsVolumeVisible((prev) => !prev)
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
  const handleVolumeClickOutside = (event: MouseEvent) => {
    if (
      volumeRef.current &&
      !volumeRef.current.contains(event.target as Node)
    ) {
      setIsVolumeVisible(false)
    }
  }

  useEffect(() => {
    if (isVolumeVisible) {
      document.addEventListener('mousedown', handleVolumeClickOutside)
    } else {
      document.removeEventListener('mousedown', handleVolumeClickOutside)
    }

    return () =>
      document.removeEventListener('mousedown', handleVolumeClickOutside)
  }, [isVolumeVisible])

  return (
    <>
      <div
        className={clsx(
          'items-center justify-center gap-[23px]',
          'desktop:gap-[29px]',
          className,
        )}
      >
        <button
          type="button"
          className={clsx('relative hidden', 'desktop:order-1 desktop:block')}
          onClick={toggleVolumeButton}
        >
          {isVolumeVisible && (
            <div
              ref={volumeRef}
              className="z-volume absolute bottom-[calc(100%+20px)] left-1/2 flex h-[126px] w-11 -translate-x-1/2 justify-center bg-white px-5 py-2"
            >
              <input
                className="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volumeLevel}
                onChange={(e) => onVolumeChange?.(parseFloat(e.target.value))}
                style={{
                  background: `linear-gradient(to top, #B15EFF ${(volumeLevel ?? 0.3) * 100}%, #E5E7EB ${(volumeLevel ?? 0.3) * 100}%)`,
                }}
              />
            </div>
          )}

          <Image
            src={volumeLevel === 0 ? volumeZero : volume}
            width={ICON_SIZE}
            height={ICON_SIZE}
            alt="volume"
          />
        </button>
        <button
          type="button"
          onClick={() => handleUserAction('like')}
          className="desktop:order-3"
        >
          <Image
            src={songLike ? likeTrue : likeFalse}
            width={ICON_SIZE}
            height={ICON_SIZE}
            alt="heart"
          />
        </button>
        <button
          type="button"
          onClick={() => handleUserAction('save')}
          className="desktop:order-2"
        >
          <Image src={save} width={ICON_SIZE} height={ICON_SIZE} alt="save" />
        </button>
        <button
          type="button"
          onClick={togglePlayerModal}
          className={clsx('hidden', 'desktop:order-4 desktop:block')}
        >
          <Image
            src={leftArrow}
            width={ICON_SIZE}
            height={ICON_SIZE}
            alt="leftArrow"
            className="rotate-90"
          />
        </button>
      </div>

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
        musicName={musicName || ''}
        artistName={artistName || ''}
      />
    </>
  )
}

export default ActionButtons
