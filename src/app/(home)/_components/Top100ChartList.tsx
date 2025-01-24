'use client'
import { MusicSaveBottomSheet } from '@/components/common'
import { useSpotifySearch } from '@/hooks/useGetSpotifyMusicId'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import Image from 'next/image'
import { useState } from 'react'
import { FiMoreHorizontal } from 'react-icons/fi'

type KoreanChart = {
  isKoreaChart: true
  musicName: string
  artistName: string
  albumCover: string
  index: number
}

type BillboardChart = {
  isKoreaChart: false
  musicName: string
  artistName: string
  albumCover: string
  index: number
}

type Chart = KoreanChart | BillboardChart

const Top100ChartList = ({
  musicName,
  artistName,
  albumCover,
  index,
}: Chart) => {
  const { searchSpotifyId } = useSpotifySearch()
  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()
  const { upsertMusic } = usePlaylistMusicUpsert()
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)

  const handlePlayBtn = async () => {
    // 데이터 일치화를 위해 ()와 안의 텍스트 제거
    const newMusicName = musicName.replace(/\s*\(.*?\)\s*/g, '').trim()
    const newArtistiName = artistName.replace(/\s*\(.*?\)\s*/g, '').trim()

    const musicData = await searchSpotifyId(newMusicName, newArtistiName)

    const newMusicData = {
      id: musicData!.id, // 스포티파이로 변환한 아이디
      title: musicData!.title,
      artist: musicData!.artist,
      playTime: musicData!.playTime,
      albumCover,
    }

    await upsertMusic(newMusicData)

    const songId = musicData!.id

    if (!isPlayerOpen) setPlayerOpen()
    setTrackIds(songId)
    play()
  }
  const handleOpenBottomSheet = () => setIsBottomSheetOpen((prev) => !prev)

  return (
    <li className="flex flex-row items-center transition-shadow">
      <div
        className="flex w-full cursor-pointer items-center space-x-2 py-2 pr-2 transition-colors"
        onClick={() => handlePlayBtn()}
      >
        <p className="title-2">{index + 1}</p>
        <div className="relative flex-shrink-0">
          <Image
            src={albumCover}
            alt={musicName}
            width={50}
            height={50}
            className="mr-4 rounded-md"
            priority
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium text-gray-900">
            {musicName}
          </h3>
          <p className="truncate text-xs text-gray-500">{artistName}</p>
        </div>
      </div>

      <button type="button" onClick={handleOpenBottomSheet}>
        <FiMoreHorizontal fontSize={24} />
      </button>

      <MusicSaveBottomSheet
        isOpen={isBottomSheetOpen}
        handleClose={handleOpenBottomSheet}
        musicName={musicName}
        artistName={artistName}
      />
    </li>
  )
}

export default Top100ChartList
