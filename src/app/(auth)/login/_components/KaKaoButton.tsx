'use client'

import { supabase } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'

const KaKaoButton = () => {
  const signInWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: 'http://localhost:3000/api/kakao',
      },
    })
    if (data?.url) {
      redirect(data.url)
    } else if (error) console.error('====카카오 오류', error.message)
  }
  const signInWithSpotify = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'spotify',
      options: {
        redirectTo: 'http://localhost:3000/api/spotify',
      },
    })

    if (data.url) {
      redirect(data.url) // use the redirect API for your server framework
    } else if (error) console.error('====스포티파이이 오류', error.message)
  }
  return (
    <form>
      <button
        className="flex items-center space-x-2 rounded bg-yellow-500 px-4 py-2 text-white transition-all hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        type="button"
        onClick={signInWithKakao}
      >
        <span>카카오</span>
      </button>
      <button
        className="flex items-center space-x-2 rounded bg-blue-500 px-4 py-2 text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="button"
        onClick={signInWithSpotify}
      >
        <span>스포티파이</span>
      </button>
    </form>
  )
}

export default KaKaoButton
