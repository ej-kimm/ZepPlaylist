'use client'

import {
  deleteSongFromPlaylist,
  fetchPlaylistDetails,
} from '@/api/playlist-detail/actions'
import imPlay from '@/assets/images/imPlay.svg'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { PlaylistDetails } from '@/types/song'
import { differenceInDays } from 'date-fns'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { FaEllipsisV } from 'react-icons/fa'
import Swal from 'sweetalert2'

export default function PlaylistDetailsComponent({
  params,
}: {
  params: { id: string }
}) {
  const [playlistDetails, setPlaylistDetails] =
    useState<PlaylistDetails | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const { isPlayerOpen, setTrackIds, setPlayerOpen } = useMusicPlayerStore()

  // 플레이리스트 데이터 가져오기 (useEffect 활용)
  const loadPlaylistDetails = useCallback(async () => {
    try {
      const data = await fetchPlaylistDetails(params.id)
      setPlaylistDetails(data)
    } catch (error) {
      console.error(
        '플레이리스트 데이터를 가져오는 중 오류가 발생했습니다.',
        error,
      )
    }
  }, [params.id])

  useEffect(() => {
    loadPlaylistDetails()
  }, [loadPlaylistDetails])

  if (!playlistDetails) {
    return <div>로딩 중...</div>
  }

  const {
    name,
    description,
    song_count,
    // total_play_time,
    last_updated,
    songs,
  } = playlistDetails

  // Spotify ID 배열 추출
  const trackId = songs.map((song) => song.spotify_id)

  // 전체 재생 핸들러
  const handlePlayAll = () => {
    if (!isPlayerOpen) setPlayerOpen() // 페이지 방문 후, 첫 곡 재생이면 플레이어바 보여줌
    setTrackIds(trackId) // 재생할 곡 아이디 넘겨주기
  }

  const toggleDropdown = (songId: string) => {
    setDropdownOpen(dropdownOpen === songId ? null : songId)
  }

  // 삭제 핸들러
  const handleDeleteSong = async (songId: string) => {
    try {
      const confirmResult = await Swal.fire({
        title: '정말 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
      })

      if (confirmResult.isConfirmed) {
        const success = await deleteSongFromPlaylist(params.id, songId)
        if (success) {
          await loadPlaylistDetails()
          setDropdownOpen(null)
          await Swal.fire({
            title: '삭제 완료!',
            text: '곡이 성공적으로 삭제되었습니다.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: '확인',
          })
        } else {
          await Swal.fire({
            title: '삭제 실패!',
            text: '곡 삭제에 실패했습니다. 다시 시도해주세요.',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: '확인',
          })
        }
      }
    } catch (error) {
      console.error('곡 삭제 중 오류가 발생했습니다.', error)
      await Swal.fire({
        title: '오류 발생!',
        text: '곡 삭제 중 문제가 발생했습니다.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: '확인',
      })
    }
  }

  return (
    <div className="mx-auto h-[858px] max-w-[375px] bg-white">
      <h1 className="title-1">플레이리스트</h1>
      <section className="mt-6 flex flex-col items-center">
        <div
          className="bg-lightgray h-[248px] w-[248px] rounded-lg bg-cover bg-center"
          style={{
            backgroundImage: `url(${songs[0]?.album_cover || '/default-cover.jpg'})`,
          }}
        ></div>
        <h2 className="mt-4 font-pretendard text-xl">{name}</h2>
        <p className="mt-1 text-gray-500">{description}</p>
      </section>

      <section className="mt-4 flex items-center justify-between">
        <div className="font-pretendard text-sm text-gray-600">
          <div className="flex space-x-2">
            <p>곡 수: {song_count}곡</p>
            {/* <p>재생시간: {total_play_time}분</p> */}
          </div>
          <p className="mt-1">
            업데이트: {differenceInDays(new Date(), new Date(last_updated))}일
            전
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-secondary"
            onClick={handlePlayAll}
          >
            <Image src={imPlay} alt="전체 재생" width={24} height={24} />
          </button>
        </div>
      </section>

      <ul className="mt-6 space-y-2">
        {songs.map((song) => (
          <li
            key={song.spotify_id}
            className="relative flex items-center justify-between rounded-lg border bg-white p-4"
          >
            <div className="flex items-center">
              <div
                className="bg-lightgray h-[44px] w-[44px] rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage: `url(${song.album_cover || '/default-album-cover.jpg'})`,
                }}
              ></div>
              <div className="ml-4">
                <p className="font-pretendard">{song.title}</p>
                <p className="text-sm text-gray-500">{song.artist}</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                className="relative p-2 text-gray-500 hover:text-gray-800"
                onClick={() => toggleDropdown(song.spotify_id)}
              >
                <FaEllipsisV />
              </button>
              {dropdownOpen === song.spotify_id && (
                <div className="absolute right-0 mt-2 w-24 rounded-lg border bg-white shadow-lg">
                  <button
                    className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                    onClick={() => handleDeleteSong(song.spotify_id)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
