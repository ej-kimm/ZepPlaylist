import { fetchPlaylistsWithCovers } from '@/api/playlist/actions'
import type { MusicData, PlaylistRow } from '@/types/playlist'
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

  const handleMoreOptionBtn = async (
    id: string,
    musicName: string,
    artistName: string,
  ): Promise<MusicData> => {
    getPlayList()
    const data = {
      id: id,
      title: musicName,
      artist: artistName,
    }

    return data
  }
  return {
    playlists,
    handleMoreOptionBtn,
  }
}
export default usePlaylistOperations
