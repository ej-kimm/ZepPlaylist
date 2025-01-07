'use client'

import { useState } from 'react'

// 실시간 검사때매 client usestate 써야함
// 주스탠드 빨리넘거야 팀원들편함 슈파베이스 로그인/회원가입 처리부터
// 바이더 감싸서 사람들한테 유저 뽑아오는거 한번 설명
// 서버에서 zod로 한번 리팩토링할 생각해야함

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // 가능하고 조건문 이메일일때만 적절히 잘써야함
  }
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }
  return (
    <form onSubmit={onSubmit}>
      <p>이메일</p>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="이메일칸"
      />
      <p>비밀번호</p>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        placeholder="비밀번호칸"
      />
      <button type="submit">로그인</button>
    </form>
  )
}

export default LoginForm
