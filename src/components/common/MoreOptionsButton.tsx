'use client'

import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import type { MusicData, PlaylistRow } from '@/types/playlist'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import BottomSheet from './BottomSheet'

type MoreOptionsButtonProps = {
  musicName: string
  artistName: string
  albumCover: string
  user: User | null
  onFetchMusicData: () => Promise<MusicData>
  playlists: PlaylistRow[]
}

type User = {
  email: string
  id: string
  nickname: string
  profile_image: string | null
}

const MoreOptionsButton = ({
  musicName,
  artistName,
  albumCover,
  user,
  onFetchMusicData,
  playlists,
}: MoreOptionsButtonProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

  const { upsertMusic, addMusicToPlaylistTable } =
    usePlaylistMusicUpsert(albumCover)

  const handleOpenBottomSheet = async () => {
    setIsBottomSheetOpen(true)
    try {
      await onFetchMusicData()
    } catch (error) {
      console.error('Error in handleOpenBottomSheet:', error)
    }
  }

  // 특정 플레이리스트 목록을 동작하는 함수
  const addMusiscInPlayList = async (playlistId: string) => {
    try {
      // ... 버튼 클릭 시 해당 곡의 data 정보를 가저온다
      const musicData = await onFetchMusicData()

      // spubase music 테이블에 곡 담아주는 함수 호출
      const musicId = await upsertMusic(musicData)

      // spubase playlist_music 테이블에 곡 담아주는 함수 호출
      await addMusicToPlaylistTable(musicId as string, playlistId)
    } catch (error) {
      console.error('Error in addMusiscInPlayList:', error)
      throw error
    }
  }

  return (
    <div className="flex items-center">
      <button
        type="button"
        className="mt-0 w-fit bg-white"
        onClick={handleOpenBottomSheet}
      >
        <div className="flex gap-[2px]">
          <div className="h-1 w-1 rounded-full bg-gray-800" />
          <div className="h-1 w-1 rounded-full bg-gray-800" />
          <div className="h-1 w-1 rounded-full bg-gray-800" />
        </div>
      </button>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        height="50%"
        maxWidth="100%"
      >
        <div>
          <div className="m-2">
            <h3 className="truncate text-base font-medium text-gray-900">
              {musicName}
            </h3>
            <p className="truncate text-sm text-gray-500">{artistName}</p>
          </div>
          <div className="border-t-2 border-gray-300">
            <h1 className="m-2">플레이리스트 담기</h1>

            <Link href={'/playlist'}>
              <div className="relative flex items-center space-x-4">
                <div className="relative h-16 w-16 overflow-hidden rounded">
                  <Image
                    src={albumCover}
                    alt="앨범 커버"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <p>새 플레이리스트 만들기</p>
              </div>
            </Link>
            {!user && playlists.length > 0 ? (
              <p className="text-center text-gray-500">로딩 중...</p>
            ) : (
              <ul className="mt-4 space-y-2">
                {playlists.map((playlist) => (
                  <li
                    key={playlist.id}
                    onClick={() => addMusiscInPlayList(playlist.id)}
                  >
                    <div className="relative flex items-center space-x-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded">
                        {playlist.latest_song_cover ? (
                          <Image
                            src={playlist.latest_song_cover}
                            alt="앨범 커버"
                            layout="fill"
                            objectFit="cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                            No Cover
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-lg font-semibold">{playlist.name}</p>
                        <p className="text-sm text-gray-500">
                          {playlist.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}

export default MoreOptionsButton
