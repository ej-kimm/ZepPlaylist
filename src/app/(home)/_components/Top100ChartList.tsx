'use client'

import { fetchPlaylistsWithCovers } from '@/api/playlist/actions'
import MoreOptionsButton from '@/components/common/MoreOptionsButton'
import { useSpotifySearch } from '@/hooks/useGetSpotifyMusicId'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
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

  const { isPlayerOpen, setTrackIds, togglePlay, setPlayerOpen } =
    useMusicPlayerStore()

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
    console.log('searchSpotifyId 71', data)

    if (!data) {
      throw new Error('Failed to fetch Spotify ID')
    }

    return data
  }

  const { upsertMusic } = usePlaylistMusicUpsert(albumCover)

  const handlePlayBtn = async () => {
    // 데이터 일치화를 위해 ()와 안의 텍스트 제거
    const newMusicName = musicName.replace(/\s*\(.*?\)\s*/g, '')
    const newArtistiName = artistName.replace(/\s*\(.*?\)\s*/g, '')

    const musicData = await searchSpotifyId(newMusicName, newArtistiName)

    await upsertMusic(musicData!)
    const songId = musicData!.id
    if (!isPlayerOpen) setPlayerOpen() // 페이지 방문 후, 첫 곡 재생이면 플레이어바 보여줌
    setTrackIds(songId)
    togglePlay()
  }

  if (isLoading) return <></>

  return (
    <li className="flex flex-row items-center transition-shadow">
      <div
        className="flex w-full cursor-pointer items-center space-x-2 py-2 pr-2 transition-colors"
        onClick={() => handlePlayBtn()}
      >
        <p className="text-center text-base font-medium">{index + 1}</p>
        <div className="relativeflex-shrink-0">
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
      <MoreOptionsButton
        musicName={musicName}
        artistName={artistName}
        albumCover={albumCover}
        user={user}
        onFetchMusicData={() => handleMoreOptionBtn(musicName, artistName)}
        playlists={playlists}
      />
      {/* </div> */}
    </li>
  )
}

export default Top100ChartList
