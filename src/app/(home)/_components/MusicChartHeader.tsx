'use client'

import clock from '@/assets/images/clock.svg'
import Image from 'next/image'
import Link from 'next/link'

type MusicChartHeaderProps = {
  top100ChartMusic: {
    songName: string
    artistName: string
    albumCover: string
  }[]
  isKoreaChart: boolean
}

// Vercel Cron Jobs로 1시간 마다 chart 테이블에 데이터를 넣어줘서
// 한시간에 한번만 api호출하여 데이터를 적재하여 사용하면 호출 비용을 줄일 수 있다.
// https://www.junetein.com/blog/Next-js-cron-job
const MusicChartHeader = ({
  // top100ChartMusic,
  isKoreaChart,
}: MusicChartHeaderProps) => {
  // const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
  //   useMusicPlayerStore()

  // const { searchSpotifyId } = useSpotifySearch()

  // const { upsertMusic } = usePlaylistMusicUpsert()

  // const handlePlayAll = () => {
  //   // 재생버튼을 눌렀을떄는 테이블의 데이터로 사용
  //   const musicData = top100ChartMusic.map(async (item) => {
  //     const spotifyData = await searchSpotifyId(item.songName, item.artistName)
  //     return spotifyData
  //   })

  //   Promise.all(musicData)
  //     .then((resolvedData) => {
  //       return resolvedData
  //         .filter((data) => !!data)
  //         .map((newMusicData) => {
  //           upsertMusic(newMusicData)
  //           return newMusicData.id
  //         })
  //     })
  //     .then((ids) => {
  //       if (!isPlayerOpen) setPlayerOpen()
  //       setTrackIds(ids)
  //       play()
  //     })
  // }

  const currentDate = new Date()
  const currentHour = currentDate.getHours()

  return (
    <>
      <div className="flex items-center gap-3.5 self-stretch py-[10px]">
        <Link href={'/koreaTopChart'}>
          <p
            className={`text-lg font-semibold ${isKoreaChart ? 'text-black' : 'text-gray-300'}`}
          >
            국내
          </p>
        </Link>
        <Link href={'/billboardTopChart'}>
          <p
            className={`text-lg font-semibold ${!isKoreaChart ? 'text-black' : 'text-gray-300'}`}
          >
            빌보드
          </p>
        </Link>
      </div>
      <div className="mb-3 mt-4 flex items-center justify-between self-stretch">
        {/* <button
          onClick={handlePlayAll}
          className="flex w-[65px] items-center gap-1"
        >
          <Image src={whitePlay} alt="전체 재생" width={16} height={16} />
          <p className="text-xs font-normal">전체 재생</p>
        </button> */}
        <div className="mb-3 flex w-[150px] items-center gap-1">
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
    </>
  )
}

export default MusicChartHeader
