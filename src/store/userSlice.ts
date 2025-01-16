import type { Users } from '@/types/auth'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type UserState = {
  user: Users | null
  isLogin: boolean
  isModal: boolean
  setUser: (user: Users | null) => void
  setIsLogin: (isLogin: boolean) => void
}

export const userStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLogin: false,
      isModal: false,
      setUser: (user: Users | null) => set({ user, isLogin: !!user }),
      setIsLogin: (isLogin: boolean) => set({ isLogin }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
