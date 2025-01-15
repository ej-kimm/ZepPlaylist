import { create } from 'zustand'

type Chart = {
  isKoreaChart: boolean
  setIsKoreaChart: (value: boolean) => void
}

export const useChartStore = create<Chart>()((set) => ({
  isKoreaChart: true,
  //   setIsKoreaChart: () =>
  //     set((state) => ({ isKoreaChart: !state.isKoreaChart })),

  setIsKoreaChart: (value) => set(() => ({ isKoreaChart: value })),
  setKoreaTop100: '/koreaTop100',
}))
