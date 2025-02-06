import { Skeleton } from '@/components/common'
import clsx from 'clsx'

const MyPageSkeleton = () => {
  return (
    <div
      className={clsx(
        'mt-4 flex cursor-pointer items-center justify-between rounded-lg bg-white p-4 shadow',
      )}
    >
      <Skeleton width={36} height={36} borderRadius="100%" />
      <div className="ml-4 flex-1">
        <Skeleton height={16} width="50%" />
        <Skeleton height={12} width="30%" className="mt-2" />
      </div>
      <div className="flex flex-col items-center">
        <Skeleton width={20} height={20} />
        <Skeleton height={15} width={15} className="mt-1" />
      </div>
    </div>
  )
}

export default MyPageSkeleton
