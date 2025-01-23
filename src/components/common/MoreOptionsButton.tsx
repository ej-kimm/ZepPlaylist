'use client'

import { useSpotifySearch } from '@/hooks/useGetSpotifyMusicId'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import usePlaylistOperations from '@/hooks/usePlaylistOperations'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FiMoreHorizontal } from 'react-icons/fi'
import BottomSheet from './BottomSheet'

type MoreOptionsButtonProps = {
  musicName: string
  artistName: string
  albumCover: string
  user: User | null
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
}: MoreOptionsButtonProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const { playlists, getPlayList } = usePlaylistOperations()
  const { searchSpotifyId } = useSpotifySearch()
  const { upsertMusic, addMusicToPlaylistTable } = usePlaylistMusicUpsert()

  const handleOpenBottomSheet = async () => {
    setIsBottomSheetOpen(true)
    try {
      await getPlayList()
    } catch (error) {
      console.error('Error in handleOpenBottomSheet:', error)
    }
  }

  // 특정 플레이리스트 목록을 동작하는 함수
  const addMusiscInPlayList = async (playlistId: string) => {
    try {
      const newMusicName = musicName.replace(/\s*\(.*?\)\s*/g, '').trim()
      const newArtistiName = artistName.replace(/\s*\(.*?\)\s*/g, '').trim()

      const musicData = await searchSpotifyId(newMusicName, newArtistiName)

      // spubase music 테이블에 곡 담아주는 함수 호출
      const musicId = await upsertMusic(musicData!)

      // spubase playlist_music 테이블에 곡 담아주는 함수 호출
      await addMusicToPlaylistTable(musicId as string, playlistId)
    } catch (error) {
      console.error('Error in addMusiscInPlayList:', error)
      throw error
    }
  }

  return (
    <>
      <button type="button" onClick={handleOpenBottomSheet}>
        <FiMoreHorizontal fontSize={24} />
      </button>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        height="50%"
        maxWidth="100%"
      >
        <div className="">
          <div className="mx-4 my-5">
            <h3 className="truncate text-lg font-medium">{musicName}</h3>
            <p className="truncate text-base text-gray-500">{artistName}</p>
          </div>
          <div className="border-t-2 border-gray-300">
            <h1 className="my-3 text-base">플레이리스트 담기</h1>

            <Link href={'/playlist'}>
              <div className="relative mx-4 flex items-center space-x-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                  <Image
                    src={albumCover}
                    alt="앨범 커버"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <p className="text-sm">새 플레이리스트 만들기</p>
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
                    <div className="relative mx-4 flex items-center space-x-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg">
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
                        <p className="text-sm">{playlist.name} 플레이리스트</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </BottomSheet>
    </>
  )
}

export default MoreOptionsButton
