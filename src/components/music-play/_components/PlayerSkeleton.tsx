import { Skeleton } from '@/components/common'
import clsx from 'clsx'

const PlayerSkeleton = () => {
  return (
    <section
      className={clsx(
        'fixed bottom-0 left-0 z-player flex h-player w-full bg-white shadow-drop',
        'desktop:h-navBar-desktop',
      )}
    >
      <div className="flex h-full w-full items-center justify-between px-6">
        {/* MusicDetails */}
        <div
          className={clsx(
            'flex flex-grow',
            'desktop:min-w-[200px] desktop:flex-grow-0',
          )}
        >
          <Skeleton
            width="56px"
            height="56px"
            className={clsx('mr-3 hidden flex-shrink-0', 'desktop:block')}
          />
          <div
            className={clsx(
              'flex w-full flex-col items-start justify-center gap-1',
              'desktop:gap-2',
            )}
          >
            <Skeleton width="100%" height="16px" className="max-w-[180px]" />
            <Skeleton width="80%" height="12px" className="max-w-[120px]" />
          </div>
        </div>

        <div
          className={clsx(
            'desktop:absolute desktop:left-1/2 desktop:w-[546px] desktop:-translate-x-1/2',
          )}
        >
          {/* PlayerControls */}
          <div
            className={clsx(
              'flex shrink-0 items-center justify-end gap-2',
              'desktop:mb-[10px] desktop:w-full desktop:justify-center desktop:gap-[60px]',
            )}
          >
            <Skeleton width="24px" height="24px" borderRadius="8px" />
            <Skeleton width="24px" height="24px" borderRadius="8px" />
            <Skeleton width="24px" height="24px" borderRadius="8px" />
            <Skeleton
              width="24px"
              height="24px"
              borderRadius="8px"
              className={clsx('desktop:hidden')}
            />
          </div>

          {/* ProgressBar */}
          <div className={clsx('hidden w-full flex-col gap-1', 'desktop:flex')}>
            <div className="flex justify-between">
              <Skeleton width="20px" height="8px" />
              <Skeleton width="20px" height="8px" />
            </div>
            <Skeleton width="327px" height="4px" className="mx-auto" />
          </div>
        </div>

        {/* ActionButtons */}
        <div className={clsx('hidden', 'desktop:flex desktop:gap-[29px]')}>
          <Skeleton width={24} height={24} />
          <Skeleton width={24} height={24} />
          <Skeleton width={24} height={24} />
          <Skeleton width={24} height={24} />
        </div>
      </div>
    </section>
  )
}

export default PlayerSkeleton
