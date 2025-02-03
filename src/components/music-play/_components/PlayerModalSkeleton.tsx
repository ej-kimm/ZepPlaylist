import { Skeleton } from '@/components/common'

// TODO : 웹 스켈레톤 해야함
const PlayerModalSkeleton = () => {
  return (
    <section className="fixed bottom-0 left-0 z-player-modal h-navBar-calc w-full bg-white px-6 pb-5">
      <div className="flex h-full flex-col items-center justify-between">
        {/* Title, Artist */}
        <header className="flex w-full flex-col items-center gap-2">
          <Skeleton width="70%" height="22px" />
          <Skeleton width="30%" height="18px" />
        </header>
        {/* Buttons */}
        <div className="flex items-center justify-center gap-[23px]">
          <Skeleton width="16px" height="16px" />
          <Skeleton width="16px" height="16px" />
        </div>
        {/* AlbumCover */}
        <Skeleton width="266px" height="266px" />
        {/* Lyrics */}
        <Skeleton width="60%" height="40px" />

        {/* ProgressBar */}
        <div className="flex w-full flex-col gap-1">
          <div className="flex justify-between">
            <Skeleton width="20px" height="8px" />
            <Skeleton width="20px" height="8px" />
          </div>
          <Skeleton height="4px" />
        </div>

        {/* PlayerControls */}
        <div className="flex shrink-0 items-center justify-end gap-10 py-2">
          <Skeleton width="36px" height="36px" />
          <Skeleton width="36px" height="36px" />
          <Skeleton width="36px" height="36px" />
        </div>
      </div>
    </section>
  )
}

export default PlayerModalSkeleton
