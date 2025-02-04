import clsx from 'clsx'

interface HistoryListHeaderProps {
  trackCount: number
  totalTime: number
}

const HistoryListHeader = ({
  trackCount,
  totalTime,
}: HistoryListHeaderProps) => {
  return (
    <header className={clsx('flex gap-5')}>
      <p className="caption-2">곡 수: {trackCount}개</p>
      <p className="caption-2">재생시간: {totalTime}분</p>
    </header>
  )
}

export default HistoryListHeader
