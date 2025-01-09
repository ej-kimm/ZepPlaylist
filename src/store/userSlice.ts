import type { User } from '@/types/auth'
import { create } from 'zustand'

export const userStore = create<User>((set) => ({
  user: null,
  isLogin: false,
  setUser: (user) => set({ user }),
  setIsLogin: (isLogin) => set({ isLogin }),
}))
