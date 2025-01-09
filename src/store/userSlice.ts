import type { User } from '@/types/auth'
import { create } from 'zustand'

export const userStore = create<User>((set) => ({
  user: null,
  isLogin: false,
  setUser: (user) => set({ user }),
  setIsLogin: (isLogin) => set({ isLogin }),

}))
// 1.  로그인 되어있는지 체크 (슈파베이스를 통해서)
// 2. setUser에 user정보를 넣주기
//  미들웨어 쓸거면 굳이 fetchuser 안해도되긴할것같긴한데 일단 슈파베이스어스 관리하는법 서칭
// supabase auth nextjs. middleware