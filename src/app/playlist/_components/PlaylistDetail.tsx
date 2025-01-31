'use client'

import {
  deleteSongFromPlaylist,
  fetchPlaylistDetails,
} from '@/api/playlist-detail/actions'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { PlaylistDetails } from '@/types/song'
import { useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import PlaylistDetailUI from './PlaylistDetailUI'

export default function PlaylistDetailsComponent({
  params,
}: {
  params: { id: string }
}) {
  const [playlistDetails, setPlaylistDetails] =
    useState<PlaylistDetails | null>(null)
  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()

  // 🔹 드롭다운 상태 추가
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)

  // 🔹 드롭다운 토글 함수 추가
  const toggleDropdown = (songId: string) => {
    setDropdownOpen((prev) => (prev === songId ? null : songId))
  }

  // 🔹 플레이리스트 데이터 가져오기
  const loadPlaylistDetails = useCallback(async () => {
    try {
      const data = await fetchPlaylistDetails(params.id)
      if (data) {
        const sortedSongs = [...data.songs].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        setPlaylistDetails({ ...data, songs: sortedSongs })
      }
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

  // 🔹 전체 재생 핸들러
  const handlePlayAll = () => {
    if (!isPlayerOpen) setPlayerOpen() // 첫 곡 재생 시 플레이어 열기
    setTrackIds(playlistDetails.songs.map((song) => song.spotify_id)) // 전체 곡 재생
    play()
  }

  // 🔹 랜덤 재생 핸들러
  const handleShufflePlay = () => {
    if (!isPlayerOpen) setPlayerOpen()
    const shuffledTracks = [
      ...playlistDetails.songs.map((song) => song.spotify_id),
    ].sort(() => Math.random() - 0.5)
    setTrackIds(shuffledTracks)
    play()
  }

  // 🔹 특정 곡 클릭 시 해당 곡부터 재생
  const handlePlayFromIndex = (index: number) => {
    if (!isPlayerOpen) setPlayerOpen()
    const trackIdsFromIndex = playlistDetails.songs
      .slice(index)
      .map((song) => song.spotify_id)
    setTrackIds(trackIdsFromIndex)
    play()
  }

  // 🔹 곡 삭제 핸들러
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
    <PlaylistDetailUI
      playlistDetails={playlistDetails}
      handlePlayAll={handlePlayAll}
      handleShufflePlay={handleShufflePlay}
      handlePlayFromIndex={handlePlayFromIndex}
      showDropdown={dropdownOpen}
      toggleDropdown={toggleDropdown}
      handleDeleteSong={handleDeleteSong}
    />
  )
}
