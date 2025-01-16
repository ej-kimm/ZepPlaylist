'use client'

import { fetchPlaylistsWithCovers } from '@/api/playlist/actions'
import type { PlaylistRow } from '@/types/playlist'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import BottomSheet from './BottomSheet'

type ArtistProps = {
  musicName: string
  artistName: string
  songImage: string
  user: UserState | null
  onClick: () => stirng
}

type UserState = {
  email: string
  id: string
  nickname: string
  profile_image: string | null
}

const MoreOptionsButton = ({
  musicName,
  artistName,
  songImage,
  user,
  onClick,
}: ArtistProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [playlists, setPlaylists] = useState<PlaylistRow[]>([])
  const [selectSong, setSelectSong] = useState({})

  useEffect(() => {
    if (!user) return

    const loadPlaylists = async () => {
      setIsLoading(true)
      try {
        const data = await fetchPlaylistsWithCovers()
        setPlaylists(data)
      } catch (error) {
        console.error('플레이리스트 가져오기 오류:', error)
        Swal.fire(
          '오류',
          '플레이리스트를 가져오는 중 문제가 발생했습니다.',
          'error',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadPlaylists()
  }, [user])

  console.log('playlists', playlists)
  console.log('user', user)
  console.log('isLoading', isLoading)

  const handleSelectSong = (playlistId, artistName, songImage) => {
    // setSelectSong({ playlistId, artistName, songImage })
    //   // API 호출로 선택된 노래를 플레이리스트에 추가
    //   // addSongToPlaylist(playlistId, { musicName, artistName, songImage })
    //   .then(() => {
    //     Swal.fire('성공', '노래가 플레이리스트에 추가되었습니다.', 'success')
    //     setIsOpen(false) // 바텀 시트 닫기
    //   })
    //   .catch((error) => {
    //     console.error('노래 추가 오류:', error)
    //     Swal.fire('오류', '노래를 추가하는 중 문제가 발생했습니다.', 'error')
    //   })
  }

  return (
    <>
      <button
        type="button"
        className="mt-0 w-fit bg-white"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex gap-[2px]">
          <div className="h-1 w-1 rounded-full bg-gray-800" />
          <div className="h-1 w-1 rounded-full bg-gray-800" />
          <div className="h-1 w-1 rounded-full bg-gray-800" />
        </div>
      </button>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
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
                    src={songImage}
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
                    onClick={handleSelectSong(
                      playlist.id,
                      artistName,
                      songImage,
                    )}
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
    </>
  )
}

export default MoreOptionsButton
