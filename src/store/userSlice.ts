import type { User } from '@/types/auth'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type UserState = {
  user: User | null
  isLogin: boolean
  isModal: boolean
  setUser: (user: User | null) => void
  setIsLogin: (isLogin: boolean) => void
}

export const userStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null as User | null,
      isLogin: false,
      isModal: false,
      setUser: (user: User | null) => set({ user, isLogin: !!user }),
      setIsLogin: (isLogin: boolean) => set({ isLogin }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
// 1.  로그인 되어있는지 체크 (슈파베이스를 통해서)
// 2. setUser에 user정보를 넣주기
//  미들웨어 쓸거면 굳이 fetchuser 안해도되긴할것같긴한데 일단 슈파베이스어스 관리하는법 서칭
// supabase auth nextjs. middleware
