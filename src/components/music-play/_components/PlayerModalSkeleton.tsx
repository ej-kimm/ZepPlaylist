import { Skeleton } from '@/components/common'
import useIsDesktop from '@/hooks/useIsDesktop'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import clsx from 'clsx'

const PlayerModalSkeleton = () => {
  const { isPlayerModalOpen } = useMusicPlayerStore()
  const isDesktop = useIsDesktop()

  return (
    <section
      className={clsx(
        'fixed bottom-0 left-0 z-player-modal h-navBar-calc w-full bg-white px-6 pb-5',
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
          {/* Title, Artist */}
          <header className="flex w-full flex-col items-center gap-2">
            <Skeleton width="70%" height="22px" />
            <Skeleton width="30%" height="18px" />
          </header>
          {/* Buttons */}
          <div
            className={clsx(
              'flex items-center justify-center gap-[23px]',
              'desktop:hidden',
            )}
          >
            <Skeleton width="16px" height="16px" />
            <Skeleton width="16px" height="16px" />
          </div>
          {/* AlbumCover */}
          <Skeleton
            width={isDesktop ? '433px' : '266px'}
            height={isDesktop ? '433px' : '266px'}
          />
        </div>
        {/* Lyrics */}
        {isDesktop ? (
          <div
            className={clsx('flex h-full w-[432px] flex-col justify-between')}
          >
            <div className={clsx('mb-1 flex gap-1')}>
              <Skeleton width="40px" height="30px" />
              <Skeleton width="40px" height="30px" />
            </div>
            <Skeleton width="100%" height="455px" />
          </div>
        ) : (
          <Skeleton width="60%" height="40px" />
        )}

        {/* ProgressBar */}
        <div className={clsx('flex w-full flex-col gap-1', 'desktop:hidden')}>
          <div className="flex justify-between">
            <Skeleton width="20px" height="8px" />
            <Skeleton width="20px" height="8px" />
          </div>
          <Skeleton height="4px" />
        </div>

        {/* PlayerControls */}
        <div
          className={clsx(
            'flex shrink-0 items-center justify-end gap-10 py-2',
            'desktop:hidden',
          )}
        >
          <Skeleton width="36px" height="36px" />
          <Skeleton width="36px" height="36px" />
          <Skeleton width="36px" height="36px" />
        </div>
      </div>
    </section>
  )
}

export default PlayerModalSkeleton
