// ex) types 정의 폴더

import type { Tables } from './supabase'
export type Users = Pick<Tables<'users'>, 'email' | 'nickname' | 'id'>
export type User = {
  user: Users | null
  isLogin: boolean
  setUser: (user: Users | null) => void
  setIsLogin: (isLogin: boolean) => void
}
