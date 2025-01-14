import { create } from 'zustand'

type PlayerState = {
  trackIds: string[]
  currentTrackIndex: number
  playNextTrack: () => void
  playPreviousTrack: () => void
}

export const useMusicPlayerStore = create<PlayerState>()((set) => ({
  trackIds: [],
  currentTrackIndex: 0,
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
}))
