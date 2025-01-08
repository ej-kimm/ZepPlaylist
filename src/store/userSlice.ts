import type { User } from '@/types/auth'
import { create } from 'zustand'

// ex) 전역 상태 관리 (Redux, Zustand, etc.) 폴더

export const userStore = create<User>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
