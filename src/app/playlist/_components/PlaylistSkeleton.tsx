import Skeleton from '@/components/common/Skeleton'
import useIsDesktop from '@/hooks/useIsDesktop'

export default function PlaylistSkeleton() {
  const isDesktop = useIsDesktop()

  return (
    <div className="mx-auto h-full w-full bg-white">
      {isDesktop ? (
        <div className="mx-auto w-full">
          <div className="mb-6 mt-24 flex justify-start">
            <Skeleton height={32} width={220} />
          </div>

          <div className="mx-auto mt-[90px] grid grid-cols-5 gap-6 pr-[50px]">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <Skeleton height={232} width={232} borderRadius="22px" />
                <div className="mt-2 flex w-full flex-col items-center"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full">
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
      )}
    </div>
  )
}
