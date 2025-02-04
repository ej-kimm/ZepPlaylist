import PlaylistItem from '@/components/common/PlaylistItem'
import { useState } from 'react'
import HistoryListNone from './HistoryListNone'

interface HistoryListUIProps {
  historyTracks: any[]
  handlePlayFromIndex: (index: number) => void
  handleDeleteSong: (songId: string) => void
}

const HistoryListUI = ({
  historyTracks,
  handlePlayFromIndex,
  handleDeleteSong,
}: HistoryListUIProps) => {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)

  const toggleDropdown = (songId: string) => {
    setDropdownOpen((prev) => (prev === songId ? null : songId))
  }

  return (
    <ul>
      {historyTracks.length > 0 ? (
        historyTracks.map((song, index) => (
          <PlaylistItem
            key={song.spotify_id}
            showDropdown={dropdownOpen}
            toggleDropdown={toggleDropdown}
            handlePlaylistClick={() => handlePlayFromIndex(index)}
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
        <HistoryListNone />
      )}
    </ul>
  )
}

export default HistoryListUI
