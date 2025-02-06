import Skeleton from '@/components/common/Skeleton'
import useIsDesktop from '@/hooks/useIsDesktop'

export default function PlaylistDetailSkeleton() {
  const isDesktop = useIsDesktop()

  return (
    <div className="mx-auto w-full bg-white px-[24px]">
      {isDesktop ? (
        <>
          <div className="mb-[50px]">
            <Skeleton height={40} width={240} />
          </div>

          <section className="flex w-full items-start gap-6">
            <div className="flex flex-shrink-0 items-start">
              <div className="flex w-[212px] flex-wrap items-start gap-[8px]">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    height={102}
                    width={102}
                    borderRadius="8px"
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-center">
              <Skeleton height={32} width={220} />
              <Skeleton height={24} width={300} className="mt-2" />

              <div className="mt-4 space-y-2">
                <Skeleton height={20} width={150} />
                <Skeleton height={20} width={200} />
                <Skeleton height={20} width={180} />
              </div>
            </div>
          </section>

          <div className="mt-6 w-full">
            <div className="mt-[100px] space-y-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Skeleton height={44} width={44} borderRadius="8px" />
                    <div className="flex flex-col">
                      <Skeleton height={20} width={160} />
                      <Skeleton height={16} width={100} />
                    </div>
                  </div>
                  <Skeleton height={20} width={120} />
                  <Skeleton height={20} width={120} />
                  <Skeleton height={20} width={120} />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-4 flex justify-center">
            <Skeleton height={200} width={200} borderRadius="12px" />
          </div>

          <div className="flex flex-col items-center">
            <div className="mt-4 flex items-center gap-4"></div>
          </div>

          <div className="mt-[160px] w-full space-y-4 pl-[110px]">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                <Skeleton height={44} width={44} borderRadius="8px" />
                <div className="flex flex-col space-y-1">
                  <Skeleton height={20} width={240} />
                  <Skeleton height={16} width={200} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
