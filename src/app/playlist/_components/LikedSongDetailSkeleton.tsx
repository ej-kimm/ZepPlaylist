import Skeleton from '@/components/common/Skeleton'
import useIsDesktop from '@/hooks/useIsDesktop'

export default function LikedSongDetailSkeleton() {
  const isDesktop = useIsDesktop()

  return (
    <div className="mx-auto w-full bg-white px-4 py-6">
      {/* ✅ 페이지 제목 */}
      <div className="mb-4">
        <Skeleton height={32} width={300} />
      </div>

      {isDesktop ? (
        // ✅ 데스크탑 스켈레톤
        <div className="mt-12">
          <div className="border-b border-gray-200 pb-2">
            <div className="flex items-center justify-between"></div>
          </div>

          <div className="mt-4 space-y-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Skeleton height={44} width={44} borderRadius="8px" />
                  <div className="flex flex-col">
                    <Skeleton height={20} width={160} />
                  </div>
                </div>
                <Skeleton height={20} width={120} />
                <Skeleton height={20} width={120} />
                <Skeleton height={20} width={120} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <ul className="mt-14 space-y-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Skeleton height={50} width={50} borderRadius="8px" />{' '}
                  <div className="flex flex-col">
                    <Skeleton height={18} width={140} />
                    <Skeleton height={14} width={100} className="mt-1" />{' '}
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
