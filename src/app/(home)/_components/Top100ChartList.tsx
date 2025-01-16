'use client'

import { fetchPlaylistsWithCovers } from '@/api/playlist/actions'
import MoreOptionsButton from '@/components/common/MoreOptionsButton'
import { useSpotifySearch } from '@/hooks/useGetSpotifyMusicId'
import { userStore } from '@/store/userSlice'
import type { PlaylistRow } from '@/types/playlist'
import Image from 'next/image'
import { useState } from 'react'

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

type playListData = {
  id: string
  artist: string
  title: string
}

const Top100ChartList = ({
  isKoreaChart,
  musicName,
  artistName,
  albumCover,
  index,
}: Chart) => {
  // 유저정보 가져오기
  const { user } = userStore((state) => state)

  const [isLoading, setIsLoading] = useState(false)
  const [playlists, setPlaylists] = useState<PlaylistRow[]>([])

  const { searchSpotifyId } = useSpotifySearch()

  const getplayList = async () => {
    setIsLoading(true)
    try {
      const data = await fetchPlaylistsWithCovers()
      setPlaylists(data)
    } catch (error) {
      console.error('Error fetching playlists:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMoreOptionBtn = async (
    musicName: string,
    artistName: string,
  ): Promise<playListData> => {
    await getplayList() // Wait for the playlist to be fetched
    const data = await searchSpotifyId(musicName, artistName)

    if (!data) {
      throw new Error('Failed to fetch Spotify ID')
    }

    return data
  }

  return (
    <li className="flex items-center space-x-4 rounded-lg p-3 transition-colors">
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
        onClickMoreOptionBtn={() => handleMoreOptionBtn(musicName, artistName)}
        playlists={playlists}
      />
    </li>
  )
}

export default Top100ChartList
