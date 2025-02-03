'use cleint'
import save from '@/assets/images/close.svg'
import likeFalse from '@/assets/images/heart.svg'
import leftArrow from '@/assets/images/leftArrow.svg'
import likeTrue from '@/assets/images/likeTrue.svg'
import volume from '@/assets/images/volume.svg'
import volumeZero from '@/assets/images/volumeZero.svg'
import useSongLike from '@/hooks/useSongLike'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { userStore } from '@/store/userSlice'
import clsx from 'clsx'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type ActionButtonsProps = {
  className: string
  ICON_SIZE: number
  volumeLevel?: number
  onVolumeChange?: (volume: number) => void
  onUserAction: (type: 'like' | 'save') => void
}

const ActionButtons = ({
  className,
  ICON_SIZE,
  volumeLevel,
  onVolumeChange,
  onUserAction,
}: ActionButtonsProps) => {
  const { user } = userStore()
  const user_id = user?.id || ''
  const { songLike } = useSongLike({ user_id })
  const { isPlayerModalOpen, togglePlayerModal } = useMusicPlayerStore()

  const [isVolumeVisible, setIsVolumeVisible] = useState(false)
  const volumeRef = useRef<HTMLButtonElement>(null)

  const toggleVolumeButton = () => setIsVolumeVisible((prev) => !prev)
  const handleVolumeClickOutside = (event: MouseEvent) => {
    if (
      volumeRef.current &&
      !volumeRef.current.contains(event.target as Node)
    ) {
      setIsVolumeVisible(false)
    }
  }
  const handleLikeClick = () => {
    onUserAction && onUserAction('like')
  }

  const handleSaveClick = () => {
    onUserAction && onUserAction('save')
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleVolumeClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleVolumeClickOutside)
    }
  }, [])

  return (
    <div
      className={clsx(
        'items-center justify-center gap-[23px]',
        'desktop:gap-[29px]',
        className,
      )}
    >
      <button
        ref={volumeRef}
        type="button"
        className={clsx('relative hidden', 'desktop:order-1 desktop:block')}
        onClick={toggleVolumeButton}
      >
        {isVolumeVisible && (
          <div className="z-volume absolute bottom-[calc(100%+20px)] left-1/2 flex h-[126px] w-11 -translate-x-1/2 justify-center bg-white px-5 py-2">
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
        onClick={handleLikeClick}
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
        onClick={handleSaveClick}
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
          className={isPlayerModalOpen ? '-rotate-90' : 'rotate-90'}
        />
      </button>
    </div>
  )
}

export default ActionButtons
