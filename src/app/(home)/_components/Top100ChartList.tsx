'use client'

import MoreOptionsButton from '@/components/common/MoreOptionsButton'
import { userStore } from '@/store/userSlice'
import Image from 'next/image'

type KoreanChart = {
  isKoreaChart: true
  musicName: string
  artistName: string
  albumCover: string
  id: number
  index: number
}

type BillboardChart = {
  isKoreaChart: false
  musicName: string
  artistName: string
  albumCover: string
  id: number
  index: number
}

type Chart = KoreanChart | BillboardChart

const Top100ChartList = ({
  isKoreaChart,
  musicName,
  artistName,
  albumCover,
  id,
  index,
}: Chart) => {
  // 유저정보 가져오기
  const { user } = userStore((state) => state)

  const SeachSpotifyId = () => {}

  return (
    <li
      key={isKoreaChart ? '(chart as MelonChartSong).SONGID' : id}
      className="flex items-center space-x-4 rounded-lg p-3 transition-colors"
    >
      <div className="relative flex-shrink-0">
        <Image
          src={albumCover}
          alt={musicName}
          width={50}
          height={50}
          className="rounded-md"
          priority
        />
      </div>
      <p className="truncate text-lg">{index + 1}</p>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-medium text-gray-900">
          {musicName}
        </h3>
        <p className="truncate text-sm text-gray-500">{artistName}</p>
      </div>
      <MoreOptionsButton
        musicName={musicName}
        artistName={artistName}
        songImage={albumCover}
        user={user}
        onClick={() => SeachSpotifyId()}
      />
    </li>
  )
}

export default Top100ChartList
