import { create } from 'zustand'

type PlayerState = {
  trackIds: string[]
  currentTrackIndex: number
  isPlaying: boolean
  playNextTrack: () => void
  playPreviousTrack: () => void
  togglePlay: () => void
}

export const useMusicPlayerStore = create<PlayerState>()((set) => ({
  trackIds: [],
  currentTrackIndex: 0,
  isPlaying: false,
  playNextTrack: () =>
    set((state) => {
      const nextIndex = (state.currentTrackIndex + 1) % state.trackIds.length
      return {
        currentTrackIndex: nextIndex,
      }
    }),
  playPreviousTrack: () =>
    set((state) => {
      const prevIndex =
        (state.currentTrackIndex - 1 + state.trackIds.length) %
        state.trackIds.length
      return {
        currentTrackIndex: prevIndex,
      }
    }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}))
