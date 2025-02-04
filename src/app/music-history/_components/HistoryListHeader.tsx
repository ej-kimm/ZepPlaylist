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
          >
            <Image src={playButton} width={16} height={16} alt="전체 재생" />
            <span className="caption-1">전체 재생</span>
          </button>

          <button
            onClick={handleShufflePlay}
            className="flex gap-1 desktop:items-center"
          >
            <FaRandom fontSize={16} />
            <span className="caption-1">랜덤 재생</span>
          </button>
        </div>

        <div className={clsx('flex items-center gap-5', 'desktop:gap-10')}>
          <p className={clsx('caption-2', 'desktop:caption-1')}>
            곡 수: {historyTracks.length}개
          </p>
          <p className={clsx('caption-2', 'desktop:caption-1')}>
            재생시간: {totalTime}분
          </p>
        </div>
      </div>
    </header>
  )
}

export default HistoryListHeader
