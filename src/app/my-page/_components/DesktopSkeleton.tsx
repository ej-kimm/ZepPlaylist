import { Skeleton } from '@/components/common'

const DesktopSkeleton = () => {
  return (
    <div className="mt-8 gap-x-9 gap-y-12 desktop:mx-auto desktop:grid desktop:h-full desktop:w-full desktop:grid-cols-5 desktop:place-items-center">
      <Skeleton width="252px" height="252px" />
      <Skeleton width="252px" height="252px" />
      <Skeleton width="252px" height="252px" />
      <Skeleton width="252px" height="252px" />
      <Skeleton width="252px" height="252px" />
      <Skeleton width="252px" height="252px" />
      <Skeleton width="252px" height="252px" />
      <Skeleton width="252px" height="252px" />
      <Skeleton width="252px" height="252px" />
      <Skeleton width="252px" height="252px" />
    </div>
  )
}

export default DesktopSkeleton
