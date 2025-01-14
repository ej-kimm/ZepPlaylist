import { userStore } from '@/store/userSlice'
import { supabase } from './client'

export const fetchUser = async () => {
  const { setUser, setIsLogin } = userStore.getState()
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session) {
      const user = session.user
      setUser({
        id: user.id,
        email: user.email!,
        nickname: user.user_metadata.nickname,
        profile_image: user.user_metadata.profile_image,
      })
      setIsLogin(true)
    } else {
      setUser(null)
      setIsLogin(false)
    }
  } catch (error) {
    console.error('fetchUser 에러====', error)
    setUser(null)
    setIsLogin(false)
  }
}
