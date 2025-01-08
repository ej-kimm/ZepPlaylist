'use client'

import { PlaylistDetails } from '@/types/song'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { fetchPlaylistDetails } from './actions'

export default function PlaylistPage({ params }: { params: { id: string } }) {
  const [playlistDetails, setPlaylistDetails] =
    useState<PlaylistDetails | null>(null)

  useEffect(() => {
    const loadPlaylistDetails = async () => {
      const data = await fetchPlaylistDetails(params.id)
      setPlaylistDetails(data)
    }

    loadPlaylistDetails()
  }, [params.id])

  // 밀리초를 분:초 형식으로 변환
  const formatPlayTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (!playlistDetails) {
    return <div>로딩 중...</div>
  }

  const {
    name,
    description,
    song_count,
    total_play_time,
    last_updated,
    songs,
  } = playlistDetails

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Music Streaming App</h1>
      <h2 className="mt-4 text-lg font-semibold">{name}</h2>
      <p className="text-gray-500">{description}</p>

      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <p>곡 수: {song_count}곡</p>
        <p>재생시간: {total_play_time}</p>
        <p>업데이트 날짜: {new Date(last_updated).toLocaleDateString()}</p>
      </div>

      <ul className="mt-6">
        {songs.map((song) => (
          <li
            key={song.spotify_id}
            className="flex items-center justify-between border-b py-2"
          >
            <div className="flex items-center">
              <div className="relative h-12 w-12">
                <Image
                  src={song.album_cover || '/default-album-cover.jpg'}
                  alt={`${song.title} 앨범 커버`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
              <div className="ml-4">
                <p className="font-semibold">{song.title}</p>
                <p className="text-sm text-gray-500">{song.artist}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {formatPlayTime(song.play_time)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
