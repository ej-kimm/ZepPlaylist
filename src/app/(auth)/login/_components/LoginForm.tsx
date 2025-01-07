'use client'

import { useState } from 'react'

// 실시간 검사때매 client usestate 써야함
// 주스탠드 빨리넘거야 팀원들편함 슈파베이스 로그인/회원가입 처리부터
// 바이더 감싸서 사람들한테 유저 뽑아오는거 한번 설명
// 비밀번호 애매;; 실시간검사 필요?

const LoginForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }
  const click = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(data)
  }
  return (
    <form onSubmit={click}>
      <p>이메일</p>
      <input
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        required
        placeholder="이메일칸"
      />
      <p>비밀번호</p>
      <input
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        required
        placeholder="비밀번호칸"
      />
      <button type="submit">로그인</button>
    </form>
  )
}

export default LoginForm
