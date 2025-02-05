import Skeleton from '@/components/common/Skeleton'

export default function PlaylistSkeleton() {
  return (
    <div className="mx-auto h-full w-full bg-white">
      <div className="mb-4 mt-8 flex justify-start">
        <Skeleton height={24} width={180} />
      </div>

      <ul className="space-y-3">
        <li className="flex items-center space-x-4 pb-2">
          <Skeleton height={44} width={44} borderRadius="8px" />
          <Skeleton height={20} width={140} />
        </li>

        <li className="flex items-center space-x-4">
          <Skeleton height={44} width={44} borderRadius="8px" />
          <Skeleton height={20} width={120} />
        </li>

        {Array.from({ length: 3 }).map((_, idx) => (
          <li key={idx} className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-4">
              <Skeleton height={44} width={44} borderRadius="8px" />
              <div className="flex flex-col space-y-1">
                <Skeleton height={20} width={160} />
                <Skeleton height={16} width={100} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
