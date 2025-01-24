import { Skeleton } from '@/components/common'

const PlayerSkeleton = () => {
  return (
    <section className="fixed bottom-0 left-0 z-player flex h-player w-full bg-white shadow-drop">
      <div className="flex h-full w-full items-center justify-between px-6">
        <div className="flex flex-grow">
          <div className="flex w-full flex-col items-start justify-start gap-1">
            <Skeleton width="60%" height="16px" borderRadius="4px" />
            <Skeleton width="40%" height="12px" borderRadius="4px" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Skeleton width="24px" height="24px" borderRadius="8px" />
          <Skeleton width="24px" height="24px" borderRadius="8px" />
          <Skeleton width="24px" height="24px" borderRadius="8px" />
          <Skeleton width="24px" height="24px" borderRadius="8px" />
        </div>
      </div>
    </section>
  )
}

export default PlayerSkeleton
