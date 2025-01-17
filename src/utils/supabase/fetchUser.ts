import { userStore } from '@/store/userSlice'
import { supabase } from './client'

export const fetchUser = async () => {
  const { setUser, setIsLogin } = userStore.getState()
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    console.log('first', session)
    if (session) {
      const userId = session.user.id
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('fetchuser 에러', error.message)
        setUser(null)
        setIsLogin(false)
        return
      }
      if (!userData) {
        return
      }
      setUser({
        id: userData.id,
        email: userData.email,
        nickname: userData.nickname,
        profile_image: userData.profile_image,
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
