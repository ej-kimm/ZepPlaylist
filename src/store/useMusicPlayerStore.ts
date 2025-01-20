import { Tables } from '@/types/supabase'
import { create } from 'zustand'

type PlayerState = {
  trackIds: string[]
  currentTrackIndex: number
  isPlayerOpen: boolean
  isPlaying: boolean
  isPlayerModalOpen: boolean
  setPlayerOpen: () => void
  setTrackIds: (
    trackIds: Tables<'music'>['spotify_id'] | Tables<'music'>['spotify_id'][],
  ) => void
  playNextTrack: () => void
  playPreviousTrack: () => void
  play: () => void
  stop: () => void
  togglePlay: () => void
  togglePlayerModal: () => void
  closePlayerModal: () => void
}

export const useMusicPlayerStore = create<PlayerState>()((set) => ({
  trackIds: [], // 재생할 플레이 리스트들
  currentTrackIndex: 0, // 현재 재생중인 음악 index
  isPlayerOpen: false, // 첫 페이지 방문시 노래 재생중인지 판단 여부
  isPlaying: false, // 현재 재생중인지 여부
  isPlayerModalOpen: false,
  setPlayerOpen: () => set(() => ({ isPlayerOpen: true })),
  setTrackIds: (
    trackId: Tables<'music'>['spotify_id'] | Tables<'music'>['spotify_id'][],
  ) =>
    set(() => {
      // 플레이 리스트 전체 재생(배열) 또는 한 곡만 재생
      const updatedTrackIds = Array.isArray(trackId) ? trackId : [trackId]
      return { trackIds: updatedTrackIds }
    }),
  playNextTrack: () =>
    set((state) => {
      if (state.trackIds.length <= 1) return state
      const nextIndex = (state.currentTrackIndex + 1) % state.trackIds.length
      return {
        currentTrackIndex: nextIndex,
        isPlaying: true,
      }
    }),
  playPreviousTrack: () =>
    set((state) => {
      if (state.trackIds.length <= 1) return state
      const prevIndex =
        (state.currentTrackIndex - 1 + state.trackIds.length) %
        state.trackIds.length
      return {
        currentTrackIndex: prevIndex,
        isPlaying: true,
      }
    }),
  play: () => set(() => ({ isPlaying: true })),
  stop: () => set(() => ({ isPlaying: false })),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  togglePlayerModal: () =>
    set((state) => ({ isPlayerModalOpen: !state.isPlayerModalOpen })),
  closePlayerModal: () => set(() => ({ isPlayerModalOpen: false })),
}))
