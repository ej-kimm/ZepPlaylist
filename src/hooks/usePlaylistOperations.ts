import { fetchPlaylistsWithCovers } from '@/api/playlist/actions'
import type { PlaylistRow } from '@/types/playlist'
import { useState } from 'react'

const usePlaylistOperations = () => {
  const [playlists, setPlaylists] = useState<PlaylistRow[]>([])

  const getPlayList = async () => {
    try {
      const data = await fetchPlaylistsWithCovers()
      setPlaylists(data)
    } catch (error) {
      console.error('Error fetching playlists:', error)
    }
  }

  return {
    playlists,
    getPlayList,
  }
}
export default usePlaylistOperations
