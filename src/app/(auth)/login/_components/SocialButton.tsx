'use client'
import googleLogo from '@/assets/images/googleLogo.svg'
import kakaoLogo from '@/assets/images/kakaoLogo.svg'
import spotifyLogo from '@/assets/images/spotifyLogo.svg'
import { supabase } from '@/utils/supabase/client'
import type { AuthError } from '@supabase/supabase-js'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import SocialButtonItem from './SocialButtonItem'

type Data = {
  provider?: string
  url?: string
}

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
    onSuccess: async (data: Data) => {
      if (data?.url) {
        window.location.href = data.url
      }
    },
    onError: (error: AuthError) => {
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
    //잊지말고 배포했을때 리다이렉트 주소 바꿔주기.
    signInMutation.mutate({
      provider,
      redirectTo: redirect[provider],
    })
  }
  return (
    <>
      <form className="flex justify-center gap-[14px]">
        <SocialButtonItem
          onClick={() => handleSignIn('google')}
          icon={
            <Image src={googleLogo} alt="구글 아이콘" width={44} height={44} />
          }
        />
        <SocialButtonItem
          onClick={() => handleSignIn('kakao')}
          icon={
            <Image src={kakaoLogo} alt="카카오 아이콘" width={44} height={44} />
          }
        />
        <SocialButtonItem
          onClick={() => handleSignIn('spotify')}
          icon={
            <Image
              src={spotifyLogo}
              alt="스포티파이 아이콘"
              width={44}
              height={44}
            />
          }
        />
      </form>
      <Link
        className="caption-1 flex justify-center opacity-60"
        href={'/sign-up'}
      >
        회원가입
      </Link>
    </>
  )
}

export default SocialButton
