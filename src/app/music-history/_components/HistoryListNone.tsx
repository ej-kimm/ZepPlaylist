import { BorderButton } from '@/components/common'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

const HistoryListNone = () => {
  const router = useRouter()

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div
        className={clsx(
          'flex w-[226px] flex-col items-center justify-center gap-3',
          'desktop:w-[292px]',
        )}
      >
        <h1 className={clsx('title-2', 'desktop:headline-1')}>
          아직 재생목록이 없습니다
        </h1>
        <p
          className={clsx(
            'caption-2 text-center text-opacity-40',
            'desktop:caption-3 desktop:text-opacity-40',
          )}
        >
          지금 Zepplaylist에서 인기있는 곡을 듣고
          <br />
          재생목록을 만들어보세요
        </p>
        <BorderButton
          onClick={() => router.push('/koreaTopChart')}
          className="px-[18px] py-[11px]"
        >
          TOP100 바로가기
        </BorderButton>
      </div>
    </div>
  )
}

export default HistoryListNone
