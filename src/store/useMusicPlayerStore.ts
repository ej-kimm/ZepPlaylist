import { Tables } from '@/types/supabase'
import { create } from 'zustand'

type PlayerState = {
  trackIds: string[]
  currentTrackIndex: number
  isPlayerOpen: boolean
  isPlaying: boolean
  setPlayerOpen: () => void
  setTrackIds: (trackIds: string[]) => void
  playNextTrack: () => void
  playPreviousTrack: () => void
  togglePlay: () => void
}

export const useMusicPlayerStore = create<PlayerState>()((set) => ({
  trackIds: [],
  currentTrackIndex: 0,
  isPlayerOpen: false,
  isPlaying: false,
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

// 첫 플레이어 시작일 때는 플레이어 안보임 => isPlayerOpne: false

// 플레이어바 감췄다가 노래 첫 재생할 때 플레이어 바 보이도록함
// 1. isPlayerOpen이 false이면 첫곡이기 때문에 setPlyerOpen실행!
// 2. setPlayerOpen, togglePlay모두 시작
