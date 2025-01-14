'use client'

import { fetchPlaylistDetails } from '@/api/playlist-detail/actions'
import MusicPlayer from '@/app/music-play/_components/MusicPlayer'
import { PlaylistDetails } from '@/types/song'
import { formatPlayTime } from '@/utils/formatPlayTime'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa'

export default function PlaylistDetailsComponent({
  params,
}: {
  params: { id: string }
}) {
  const [playlistDetails, setPlaylistDetails] =
    useState<PlaylistDetails | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // 플레이리스트 데이터 가져오기 (useEffect활용)
  useEffect(() => {
    const loadPlaylistDetails = async () => {
      try {
        const data = await fetchPlaylistDetails(params.id)
        setPlaylistDetails(data)
      } catch (error) {
        console.error(
          '플레이리스트 데이터를 가져오는 중 오류가 발생했습니다.',
          error,
        )
      }
    }

    loadPlaylistDetails()
  }, [params.id])

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

  // Spotify ID 배열 추출
  const spotifyIds = songs.map((song) => song.spotify_id)

  // 전체 재생 핸들러
  const handlePlayAll = () => {
    setIsPlaying(true)
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Music Streaming App</h1>
      <section>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-500">{description}</p>
      </section>

      <section className="mt-4 flex justify-between text-sm text-gray-600">
        <p>곡 수: {song_count}곡</p>
        <p>재생시간: {total_play_time}</p>
        <p>업데이트 날짜: {new Date(last_updated).toLocaleDateString()}</p>
      </section>

      <section className="mt-6 flex justify-center">
        <button
          className="flex items-center justify-center rounded-full bg-black px-6 py-3 text-white hover:bg-gray-800"
          onClick={handlePlayAll}
        >
          <FaPlay className="h-6 w-6" />
          <span className="ml-2">전체 재생</span>
        </button>
      </section>

      {isPlaying && <MusicPlayer trackId={spotifyIds} />}

      <ul className="mt-6">
        {songs.map((song) => (
          <li
            key={song.spotify_id}
            className="flex items-center justify-between border-b py-3"
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
