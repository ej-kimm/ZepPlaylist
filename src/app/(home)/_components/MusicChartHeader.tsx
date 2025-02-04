'use client'

import clock from '@/assets/images/clock.svg'
import whitePlay from '@/assets/images/whitePlay.svg'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import type { Charts } from '@/types/billboradCharts'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

type MusicChartHeaderProps = {
  top100ChartMusic: Charts[]
  isKoreaChart: boolean
}

// Vercel Cron Jobs로 1시간 마다 chart 테이블에 데이터를 넣어줘서
// 한시간에 한번만 api호출하여 데이터를 적재하여 사용하면 호출 비용을 줄일 수 있다.
// https://www.junetein.com/blog/Next-js-cron-job
const MusicChartHeader = ({
  top100ChartMusic,
  isKoreaChart,
}: MusicChartHeaderProps) => {
  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()

  const { upsertMusic } = usePlaylistMusicUpsert()

  const handlePlayAll = () => {
    // 재생버튼을 눌렀을떄는 테이블의 데이터로 사용

    Promise.all(top100ChartMusic)
      .then((resolvedData) => {
        return resolvedData
          .filter((data) => !!data)
          .map((newMusicData) => {
            const convertNewMusicData = {
              id: newMusicData.spotify_id,
              title: newMusicData.title,
              artist: newMusicData.artist,
              playTime: newMusicData.play_time,
              albumCover: newMusicData.album_cover,
            }
            console.log(convertNewMusicData)
            upsertMusic(convertNewMusicData)
            return newMusicData.spotify_id
          })
      })
      .then((ids) => {
        console.log(ids)
        if (!isPlayerOpen) setPlayerOpen()
        setTrackIds(ids)
        play()
      })
  }

  const currentDate = new Date()
  const currentHour = currentDate.getHours()

  return (
    <>
      <div className={clsx('flex w-full flex-col gap-6', 'desktop: mt-10')}>
        <p className={clsx('title-1', 'desktop:title-3')}>TOP 100</p>
        <div
          className={clsx(
            'flex items-center gap-3.5 self-stretch',
            'desktop: flex gap-[65px]',
          )}
        >
          <Link
            href={'/koreaTopChart'}
            // className={clsx('desktop: flex gap-[65px]')}
          >
            <p
              className={clsx(
                `title-2 ${isKoreaChart ? 'text-black' : 'text-gray-300'}`,
                isKoreaChart && 'desktop:text-secondary',
                'desktop: px-[10px] py-2',
              )}
            >
              국내
            </p>
            <p
              className={clsx(
                isKoreaChart &&
                  'desktop:border-b-[1px] desktop:border-secondary',
              )}
            ></p>
          </Link>
          <Link href={'/billboardTopChart'}>
            <p
              className={clsx(
                `title-2 ${!isKoreaChart ? 'text-black' : 'text-gray-300'}`,
                !isKoreaChart && 'desktop:text-secondary',
                'desktop: px-[10px] py-2',
              )}
            >
              빌보드
            </p>
            <p
              className={clsx(
                !isKoreaChart &&
                  'desktop:border-b-[1px] desktop:border-secondary',
              )}
            ></p>
          </Link>
        </div>
        <div className="mb-3 flex items-center justify-between self-stretch">
          <button
            onClick={handlePlayAll}
            className="flex w-[65px] items-center gap-1"
          >
            <Image src={whitePlay} alt="전체 재생" width={16} height={16} />
            <p className="text-xs font-normal">전체 재생</p>
          </button>
          <div className="mb-3 flex items-center gap-1">
            <Image
              src={clock}
              alt="업데이트 시간"
              width={16}
              height={16}
              style={{ flexShrink: 0 }}
            />
            <p className="text-xs">업데이트 시간 {currentHour}:00 </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MusicChartHeader
