import { PlaylistRow } from '@/types/playlist'
import { create } from 'zustand'

type PlaylistState = {
  playlists: PlaylistRow[]
  setPlaylists: (playlists: PlaylistRow[]) => void
  addPlaylist: (playlist: PlaylistRow) => void
  updatePlaylist: (updatedPlaylist: PlaylistRow) => void
}

export const playlistStore = create<PlaylistState>((set) => ({
  playlists: [],
  setPlaylists: (playlists) => set({ playlists }),
  addPlaylist: (playlist) =>
    set((state) => ({ playlists: [playlist, ...state.playlists] })),
  updatePlaylist: (updatedPlaylist) =>
    set((state) => ({
      playlists: state.playlists.map((playlist) =>
        playlist.id === updatedPlaylist.id ? updatedPlaylist : playlist,
      ),
    })),
}))
