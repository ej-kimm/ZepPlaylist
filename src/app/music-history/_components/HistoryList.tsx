'use client'
import PlaylistItem from '@/app/playlist/_components/PlaylistItem'
import { BorderButton } from '@/components/common'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { userStore } from '@/store/userSlice'
import type { Tables } from '@/types/supabase'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const HistoryList = () => {
  const router = useRouter()
  const { user } = userStore()
  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()

  const [historyTracks, setHistoryTracks] = useState<Tables<'music'>[]>([])
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)

  const totalPlayTime = historyTracks.reduce(
    (acc, track) => acc + track.play_time,
    0,
  )
  const totalTime = Math.floor(totalPlayTime / 60000)

  const toggleDropdown = (songId: string) => {
    setDropdownOpen((prev) => (prev === songId ? null : songId))
  }
  const handlePlayFromIndex = (id: string) => {
    if (!isPlayerOpen) setPlayerOpen()
    setTrackIds(id)
    play()
  }
  const handleDeleteSong = (songId: string) => {
    const updatedTracks = historyTracks.filter(
      (track) => track.spotify_id !== songId,
    )
    localStorage.setItem(
      `${user?.id}-history-playlist`,
      JSON.stringify(updatedTracks),
    )
    setHistoryTracks(updatedTracks)
  }

  useEffect(() => {
    const storedTracks = JSON.parse(
      localStorage.getItem(`${user?.id}-history-playlist`) || '[]',
    )
    setHistoryTracks(storedTracks)
  }, [user?.id])

  return (
    <section className={clsx('my-3')}>
      <div className={clsx('flex flex-col gap-3')}>
        <header className={clsx('flex gap-5')}>
          <p className="caption-2">곡 수: {historyTracks.length}개</p>
          <p className="caption-2">재생시간: {totalTime}분</p>
        </header>
        <ul>
          {historyTracks.length > 0 ? (
            historyTracks.map((song) => (
              <PlaylistItem
                key={song.spotify_id}
                showDropdown={dropdownOpen}
                toggleDropdown={toggleDropdown}
                handlePlaylistClick={() => handlePlayFromIndex(song.spotify_id)}
                handleDeleteSong={() => handleDeleteSong(song.spotify_id)}
                playlist={{
                  id: song.spotify_id,
                  name: song.title,
                  description: song.artist,
                  latest_song_cover: song.album_cover,
                }}
                isDetailPage={true}
              />
            ))
          ) : (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className={clsx(
                  'flex w-[226px] flex-col items-center justify-center gap-3',
                )}
              >
                <h1 className="title-2">아직 재생목록이 없습니다.</h1>
                <p className="caption-2 text-center text-opacity-40">
                  지금 Zepplaylist에서 인기있는 곡을 듣고
                  <br />
                  재생목록을 만들어보세요
                </p>
                <BorderButton
                  onClick={() => router.push('/koreaTopChart')}
                  className="px-[18px] py-[11px]"
                >
                  TOP100 바로가기
                </BorderButton>
              </div>
            </div>
          )}
        </ul>
      </div>
    </section>
  )
}

export default HistoryList
