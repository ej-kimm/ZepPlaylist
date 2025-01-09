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
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: { data: { name: formData.nickname } },
    })
    if (error) {
      console.error(error.message)
      alert('실패')
    }
    router.push('/login')
  }
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-center text-2xl font-bold">회원가입</h2>

      <label className="mb-2 block font-medium text-gray-700">아이디</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        placeholder="아이디를 입력해주세요"
        required
        onChange={handleChange}
        className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="mb-2 mt-4 block font-medium text-gray-700">
        비밀번호
      </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        placeholder="비번을 입력해주세요"
        required
        onChange={handleChange}
        className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="mb-2 mt-4 block font-medium text-gray-700">
        비밀번호 확인
      </label>
      <input
        type="password"
        name="passwordCheck"
        value={formData.passwordCheck}
        placeholder="비번을 확인하세요"
        required
        onChange={handleChange}
        className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="mb-2 mt-4 block font-medium text-gray-700">
        닉네임
      </label>
      <input
        type="text"
        name="nickname"
        value={formData.nickname}
        placeholder="닉네임을 입력해주세요"
        required
        onChange={handleChange}
        className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mt-6 flex items-center">
        <input
          type="checkbox"
          className="mr-2 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-600">서비스 정책 이용약관</span>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-lg bg-[#B15EFF] py-3 text-white transition-all hover:bg-[#9F54E5] focus:outline-none focus:ring-2 focus:ring-[#B15EFF]"
      >
        회원가입
      </button>
    </form>
  )
}
export default SignupForm
