'use client'

import { supabase } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'

const KaKaoButton = () => {
  const signInWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: 'http://localhost:3000/api/login',
      },
    })
    if (data?.url) {
      redirect(data.url)
    } else if (error) console.error('====카카오 오류', error.message)
  }
  return (
    <button
      className="flex items-center space-x-2 rounded bg-yellow-500 px-4 py-2 text-white transition-all hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      type="button"
      onClick={signInWithKakao}
    >
      <span>카카오</span>
    </button>
  )
}

export default KaKaoButton
