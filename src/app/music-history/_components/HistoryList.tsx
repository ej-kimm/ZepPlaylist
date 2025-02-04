'use client'
import PlaylistItem from '@/app/playlist/_components/PlaylistItem'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { userStore } from '@/store/userSlice'
import type { Tables } from '@/types/supabase'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

const HistoryList = () => {
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
    sessionStorage.setItem(
      `${user?.id}-history-playlist`,
      JSON.stringify(updatedTracks),
    )
    setHistoryTracks(updatedTracks)
  }

  useEffect(() => {
    const storedTracks = JSON.parse(
      sessionStorage.getItem(`${user?.id}-history-playlist`) || '[]',
    )
    setHistoryTracks(storedTracks)
  }, [])

  return (
    <section className={clsx('my-3')}>
      <div className={clsx('flex flex-col gap-3')}>
        <header className={clsx('flex gap-5')}>
          <p className="caption-2">곡 수: {historyTracks.length}개</p>
          <p className="caption-2">재생시간: {totalTime}분</p>
        </header>
        <ul className="space-y-2">
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
            <p>최근 재생한 곡이 없습니다.</p>
          )}
        </ul>
      </div>
    </section>
  )
}

export default HistoryList
