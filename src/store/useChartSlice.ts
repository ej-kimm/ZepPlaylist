import { create } from 'zustand'

type Chart = {
  isKoreaChart: boolean
  setIsKoreaChart: () => void
}

export const useChartStore = create<Chart>()((set) => ({
  isKoreaChart: true,
  //   setIsKoreaChart: () =>
  //     set((state) => ({ isKoreaChart: !state.isKoreaChart })),

  setIsKoreaChart: () => set(() => ({ isKoreaChart: false })),
}))
