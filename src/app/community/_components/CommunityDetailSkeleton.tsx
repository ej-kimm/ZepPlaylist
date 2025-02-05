import { Skeleton } from '@/components/common'
import clsx from 'clsx'

const CommunityDetailSekleton = () => {
  return (
    <div
      className={clsx(
        'flex flex-col',
        'desktop:flex-row desktop:items-start desktop:gap-20',
      )}
    >
      {/* 노래 목록 섹션 (60%) */}
      <div className={clsx('flex-1', 'desktop:max-w-[60%]')}>
        {/* 상단 정보 (모바일) */}
        <div className="desktop:hidden">
          <div className="flex w-full items-center justify-between">
            <Skeleton width="60%" height="28px" className="title-1 mb-2 mt-2" />
            <Skeleton
              width={24}
              height={24}
              borderRadius="8px"
              className="mb-2 mt-2"
            />
          </div>
          <Skeleton width="100%" height="16px" className="body-1 mb-2" />
          <div className="flex items-center gap-2">
            <Skeleton width={24} height={24} borderRadius="50%" />
            <Skeleton width="80px" height="12px" className="caption-2" />
          </div>
        </div>

        {/* 상단 정보 (PC) */}
        <div className="hidden desktop:block">
          <div className="flex w-full items-center justify-between">
            <Skeleton width="70%" height="32px" className="headline-1 mt-12" />
            <Skeleton
              width={32}
              height={32}
              borderRadius="8px"
              className="mt-12"
            />
          </div>
          <Skeleton width="85%" height="14px" className="caption-3 mt-3" />
          <div className="flex items-center gap-3">
            <Skeleton
              width={36}
              height={36}
              borderRadius="50%"
              className="mb-10 mt-3"
            />
            <Skeleton
              width="100px"
              height="16px"
              className="caption-1 mb-10 mt-3"
            />
          </div>
        </div>

        {/* 노래 목록 스켈레톤 */}
        <div className="flex flex-col">
          <ul className="mb-12">
            {[...Array(5)].map((_, index) => (
              <>
                {/* 모바일 버전 스켈레톤 */}
                <li
                  key={`mobile-skeleton-${index}`}
                  className={clsx(
                    'flex items-center justify-between py-4',
                    'desktop:hidden',
                  )}
                >
                  <div className="flex items-center">
                    <Skeleton width={48} height={48} borderRadius="4px" />
                    <div className="ml-4">
                      <Skeleton width="120px" height="16px" className="mb-1" />
                      <Skeleton width="80px" height="12px" />
                    </div>
                  </div>
                  <Skeleton width={24} height={24} borderRadius="8px" />
                </li>

                {/* PC 버전 스켈레톤 */}
                <li
                  key={`pc-skeleton-${index}`}
                  className={clsx(
                    'hidden items-center justify-between py-4',
                    'desktop:flex',
                  )}
                >
                  <Skeleton width={54} height={54} borderRadius="4px" />
                  <div className="ml-6 flex flex-1 items-center justify-between">
                    <Skeleton width="30%" height="16px" className="body-2" />
                    <Skeleton width="25%" height="14px" className="caption-1" />
                    <Skeleton width="25%" height="14px" className="caption-1" />
                  </div>
                  <Skeleton width={36} height={36} borderRadius="50%" />
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>

      {/* 웹 전용 댓글 섹션 스켈레톤 */}
      <div
        className={clsx(
          'hidden desktop:block desktop:max-w-[40%] desktop:flex-1',
          'desktop:sticky desktop:top-4 desktop:h-[calc(100vh-140px)]',
          'relative',
        )}
      >
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/70 via-gray-800/30 to-white/10 p-4 shadow-lg backdrop-blur-[6px]" />
        <div className="relative z-10 flex h-full flex-col gap-4 bg-transparent">
          <div className="flex-1 overflow-y-auto">
            <ul className="space-y-4 bg-transparent pl-4">
              {[...Array(3)].map((_, index) => (
                <li
                  key={`comment-skeleton-${index}`}
                  className="flex items-start gap-4 py-2"
                >
                  <Skeleton width={32} height={32} borderRadius="50%" />
                  <div className="flex-1 space-y-2">
                    <Skeleton width="40%" height="14px" />
                    <Skeleton width="100%" height="12px" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="sticky bottom-0 border-t border-white/20 bg-white/10 backdrop-blur-[6px]">
            <div className="flex items-center px-4 py-4">
              <Skeleton width="100%" height="40px" borderRadius="8px" />
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 댓글 섹션 스켈레톤 */}
      <div className="desktop:hidden">
        <div className="fixed bottom-28 left-0 right-0 z-10 h-[240px] w-full overflow-y-auto bg-gradient-to-t from-black/50 via-gray-800/30 to-white/10 p-4 shadow-lg backdrop-blur-[6px]">
          <div className="relative h-8 w-full">
            <Skeleton
              width={24}
              height={24}
              className="absolute right-1 top-1"
            />
          </div>
          <ul className="space-y-4 pt-4">
            {[...Array(2)].map((_, index) => (
              <li
                key={`mobile-comment-skeleton-${index}`}
                className="flex items-start space-x-4 pb-4"
              >
                <Skeleton width={24} height={24} borderRadius="50%" />
                <div className="mt-1 flex-1 space-y-1">
                  <Skeleton width="50%" height="12px" />
                  <Skeleton width="80%" height="12px" />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="fixed bottom-12 left-0 right-0 z-10 h-16 w-full bg-black/50 shadow-lg backdrop-blur-[5px]">
          <div className="flex items-center gap-2 p-2">
            <Skeleton width="100%" height="36px" borderRadius="8px" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityDetailSekleton
