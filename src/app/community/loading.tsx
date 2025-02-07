import { Skeleton } from '@/components/common'

export default function Loading() {
  return (
    <div className="p-4">
      <Skeleton height={40} width="60%" className="mb-12 mt-20" />
      <Skeleton height={200} width="100%" className="mb-12" />
      <Skeleton height={80} width="100%" className="mb-12" />
      <Skeleton height={80} width="100%" className="mb-12" />
      <Skeleton height={80} width="100%" className="mb-12" />
      <Skeleton height={80} width="100%" className="mb-12" />
    </div>
  )
}
