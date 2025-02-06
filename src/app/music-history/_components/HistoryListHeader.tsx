import playButton from '@/assets/images/playButton.svg'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import type { Tables } from '@/types/supabase'
import clsx from 'clsx'
import Image from 'next/image'
import { FaRandom } from 'react-icons/fa'

interface HistoryListHeaderProps {
  historyTracks: Tables<'music'>[]
  totalTime: number
}

const HistoryListHeader = ({
  historyTracks,
  totalTime,
}: HistoryListHeaderProps) => {
  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()
  const isDisabled = historyTracks.length < 1

  const handlePlayAll = () => {
    if (!isPlayerOpen) setPlayerOpen()
    setTrackIds(historyTracks.map((song) => song.spotify_id))
    play()
  }

  const handleShufflePlay = () => {
    if (!isPlayerOpen) setPlayerOpen()
    const shuffledTracks = [
      ...historyTracks.map((song) => song.spotify_id),
    ].sort(() => Math.random() - 0.5)
    setTrackIds(shuffledTracks)
    play()
  }

  return (
    <header>
      <h1
        className={clsx('title-3 mb-[38px] mt-[30px] hidden', 'desktop:block')}
      >
        재생목록
      </h1>

      <div className="flex items-center gap-10">
        <div
          className={clsx('hidden gap-14', 'desktop:flex desktop:items-center')}
        >
          <button
            onClick={handlePlayAll}
            className="flex gap-1 desktop:items-center"
            disabled={isDisabled}
          >
            <Image
              src={playButton}
              width={16}
              height={16}
              alt="전체 재생"
              className={clsx(isDisabled && 'opacity-60')}
            />
            <span className={clsx('caption-1', isDisabled && 'text-[#636363]')}>
              전체 재생
            </span>
          </button>

          <button
            onClick={handleShufflePlay}
            className="flex gap-1 desktop:items-center"
            disabled={isDisabled}
          >
            <FaRandom
              fontSize={16}
              className={clsx(isDisabled && 'text-[#636363]')}
            />
            <span className={clsx('caption-1', isDisabled && 'text-[#636363]')}>
              랜덤 재생
            </span>
          </button>
        </div>

        <div className={clsx('flex items-center gap-5', 'desktop:gap-10')}>
          <p
            className={clsx(
              'caption-2',
              'desktop:caption-1',
              isDisabled && 'text-[#636363] desktop:text-[#636363]',
            )}
          >
            곡 수: {historyTracks.length}개
          </p>
          <p
            className={clsx(
              'caption-2',
              'desktop:caption-1',
              isDisabled && 'text-[#636363] desktop:text-[#636363]',
            )}
          >
            재생시간: {totalTime}분
          </p>
        </div>
      </div>
    </header>
  )
}

export default HistoryListHeader
