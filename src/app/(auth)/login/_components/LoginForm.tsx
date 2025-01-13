'use client'
import InputBox from '@/components/common/InputBox'
import { useAuth } from '@/hooks/useAuth'
import { userStore } from '@/store/userSlice'
import type { User, Users } from '@/types/auth'
import { supabase } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from '../../../../components/common/Button'
// 텍스트 필드 라 어쩌고 제어 컴포넌트로 같이 처리 제어컴포넌트 / 비제어컴포넌트
// constants 정규식 뺴주기
// zod sschema 찾아보기
const LoginForm = () => {
  const { formData, handleChange } = useAuth({ email: '', password: '' })
  const [emailError, setEmailError] = useState<string>('')
  const router = useRouter()
  const { setUser } = userStore()
  // 중괄호 썻을때는 저장되는데
  // state 쓸때는 저장이안됨;;
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })
    if (error) {
      console.error(error.message)
      alert('아이디 혹은 비밀번호를 확인해주세요')
      return
    }
    const user: Users | null = data?.user
      ? {
          id: data.user.id,
          email: data.user.email!,
          nickname: data?.user.user_metadata?.name,
          profile_image:
            'https://i.namu.wiki/i/6AijZLjqdKDGjVzMK1CHNGiEyvrEyUVnl1_6Es4s5k5kfbep022bOHvG-sEn4_8opqy0uzzu9M7WUtU_sxb5UYmhY-fw_19wiRVJxTZDLHdaBKLbL1vEJPqQotCe18kx4bWvXMg-mbKtt-d5YjuCdG86CYBRDBmnAxBrnk9drLQ.webp',
        }
      : null
    setUser(user as User | null)
    router.push('/')
  }
  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      alert('로그아웃 실패')
      return
    }
    alert('로그아웃성공')
    userStore.getState().setUser(null)
    userStore.getState().setIsLogin(false)
    localStorage.removeItem('user')
    sessionStorage.removeItem('user')
  }
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-center text-2xl font-bold">로그인</h2>
      <InputBox
        label="이메일"
        name="email"
        type="email"
        value={formData.email}
        placeholder="이메일을 입력하세요"
        required={true}
        onChange={handleChange}
        errorMessage={emailError}
      />
      <InputBox
        label="비밀번호"
        name="password"
        type="password"
        value={formData.password}
        placeholder="비밀번호를 입력하세요"
        required={true}
        onChange={handleChange}
      />

      <Button type="submit">로그인</Button>
      <Button type="button" onClick={logout}>
        로그아웃
      </Button>
    </form>
  )
}

export default LoginForm
