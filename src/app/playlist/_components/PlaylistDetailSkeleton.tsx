import Skeleton from '@/components/common/Skeleton'

export default function PlaylistDetailSkeleton() {
  return (
    <div className="mx-auto w-full bg-white px-[24px]">
      <div className="mb-[50px]">
        <Skeleton height={40} width={240} />
      </div>

      <section className="flex w-full items-start gap-6">
        <div className="flex flex-shrink-0 items-start">
          <div className="flex w-[212px] flex-wrap items-start gap-[8px]">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} height={102} width={102} borderRadius="8px" />
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

      <section className="mt-6 flex w-full items-center gap-[26px]">
        <Skeleton height={36} width={120} borderRadius="8px" />
        <Skeleton height={36} width={120} borderRadius="8px" />
      </section>

      <div className="mt-6 w-full">
        <Skeleton height={24} width={100} />
        <div className="mt-4 space-y-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Skeleton height={44} width={44} borderRadius="8px" />
                <div className="flex flex-col">
                  <Skeleton height={20} width={160} />
                  <Skeleton height={16} width={100} />
                </div>
              </div>
              <Skeleton height={20} width={80} />
              <Skeleton height={20} width={120} />
              <Skeleton height={36} width={36} borderRadius="50%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
