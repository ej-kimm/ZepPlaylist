'use client'
import googleLogo from '@/assets/images/googleLogo.svg'
import kakaoLogo from '@/assets/images/kakaoLogo.svg'
import spotifyLogo from '@/assets/images/spotifyLogo.svg'
import { supabase } from '@/utils/supabase/client'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
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
    onSuccess: async (data: any) => {
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
        hoverColor="hover:bg-red-600 focus:ring-red-500"
        onClick={() => handleSignIn('google')}
        icon={
          <Image src={googleLogo} alt="구글 아이콘" width={30} height={30} />
        }
      />
      <SocialButtonItem
        hoverColor="hover:bg-yellow-600 focus:ring-yellow-500"
        onClick={() => handleSignIn('kakao')}
        icon={
          <Image src={kakaoLogo} alt="카카오 아이콘" width={30} height={30} />
        }
      />
      <SocialButtonItem
        hoverColor="hover:bg-blue-600 focus:ring-blue-500"
        onClick={() => handleSignIn('spotify')}
        icon={
          <Image
            src={spotifyLogo}
            alt="스포티파이 아이콘"
            width={30}
            height={30}
          />
        }
      />
    </form>
  )
}

export default SocialButton
