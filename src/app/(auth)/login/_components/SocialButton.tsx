'use client'

import { supabase } from '@/utils/supabase/client'
import { useMutation } from '@tanstack/react-query'
import SocialButtonItem from './SocialButtonItem'

const SocialButton = () => {
  const signInMutation = useMutation({
    mutationFn: async ({
      provider,
      redirectTo,
    }: {
      provider: 'kakao' | 'spotify' | 'google'
      redirectTo: string
    }) => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo },
      })

      if (error) throw new Error(error.message)
      return data ? { ...data } : data
    },
    onSuccess: (data: any) => {
      if (data?.url) {
        window.location.href = data.url
      }
    },
    onError: (error: any) => {
      console.error(error.message)
      alert('에러가 발생하였습니다. 잠시후 다시 시도해주세요')
    },
  })

  const handleSignIn = (provider: 'kakao' | 'spotify' | 'google') => {
    const redirect = {
      kakao: 'http://localhost:3000/api/auth',
      spotify: 'http://localhost:3000/api/auth',
      google: 'http://localhost:3000/api/auth',
    }

    signInMutation.mutate({
      provider,
      redirectTo: redirect[provider],
    })
  }

  return (
    <form className="flex space-x-4">
      <SocialButtonItem
        label="카카오"
        bgColor="bg-yellow-500"
        hoverColor="hover:bg-yellow-600 focus:ring-yellow-500"
        onClick={() => handleSignIn('kakao')}
      />
      <SocialButtonItem
        label="스포티파이"
        bgColor="bg-blue-500"
        hoverColor="hover:bg-blue-600 focus:ring-blue-500"
        onClick={() => handleSignIn('spotify')}
      />
      <SocialButtonItem
        label="구글"
        bgColor="bg-red-500"
        hoverColor="hover:bg-red-600 focus:ring-red-500"
        onClick={() => handleSignIn('google')}
      />
    </form>
  )
}

export default SocialButton
