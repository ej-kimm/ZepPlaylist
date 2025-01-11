'use client'

import InputBox from '@/components/common/InputBox'
import { userStore } from '@/store/userSlice'
import type { Users } from '@/types/auth'
import { supabase } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from '../../sign-up/_components/Button'

// 주스탠드 빨리넘거야 팀원들편함 슈파베이스 로그인/회원가입 처리부터
// 바이더 감싸서 사람들한테 유저 뽑아오는거 한번 설명
// 서버에서 zod로 한번 리팩토링할 생각해야함

// 텍스트 필드 라 어쩌고 제어 컴포넌트로 같이 처리 제어컴포넌트 / 비제어컴포넌트
// constants 정규식 뺴주기
// zod sschema 찾아보기
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [emailError, setEmailError] = useState<string>('')
  const router = useRouter()
  const setUser = userStore((state) => state.setUser)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (value === '') {
        setEmailError('')
      } else if (!emailRegex.test(value)) {
        setEmailError('올바른 이메일 주소를 입력해주세요.')
      } else {
        setEmailError('')
      }
    }
  }
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
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
    setUser(user)
    router.push('/')
  }
  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      alert('로그아웃 실패')
      return
    }
    alert('로그아웃성공')
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
