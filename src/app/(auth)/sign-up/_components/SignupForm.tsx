'use client'

import { supabase } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
// 나중에 도전기능으로 서버 액션으로 분리 * 동작하게끔 슈파베이스 사인인,사인업 따로 분리 *<<
// 보안쪽 생각해서 서버에서 처리하는게 통상적임
import { useState } from 'react'

const SignupForm = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: { data: { name: formData.nickname } },
    })
    if (error) {
      console.error(error.message)
    }
    alert('성공')
    router.push('/login')
  }
  return (
    <form onSubmit={onSubmit}>
      <p>아이디</p>
      <input
        type="email"
        name="email"
        value={formData.email}
        placeholder="아이디를 입력해주세요"
        required
        onChange={handleChange}
      />
      <p>비밀번호</p>
      <input
        type="password"
        name="password"
        value={formData.password}
        placeholder="비번을 입력해주세요"
        required
        onChange={handleChange}
      />
      <p>비밀번호 확인</p>
      <input
        type="password"
        name="passwordCheck"
        value={formData.passwordCheck}
        placeholder="비번을 확인하세요"
        required
        onChange={handleChange}
      />
      <p>닉네임</p>
      <input
        type="text"
        name="nickname"
        value={formData.nickname}
        placeholder="닉네임을 입력해주세요"
        required
        onChange={handleChange}
      />
      <p>
        <input type="checkbox" />
        서비스 정책 이용약관
      </p>
      <button type="submit">회원가입</button>
    </form>
  )
}

export default SignupForm
