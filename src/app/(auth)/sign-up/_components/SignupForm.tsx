'use client'

import InputBox from '@/components/common/InputBox'
import { supabase } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
// 나중에 도전기능으로 서버 액션으로 분리 * 동작하게끔 슈파베이스 사인인,사인업 따로 분리 *<<
// 보안쪽 생각해서 서버에서 처리하는게 통상적임
// 리액트 훅폼 hook-form
import { useAuth } from '@/hooks/useAuth'
import { useValidation } from '@/hooks/useValidation'
import Button from '../../../../components/common/Button'

const SignupForm = () => {
  const router = useRouter()
  const { formData, handleChange, error, handleError, resetError } = useAuth({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  })
  const {
    validateEmail,
    validateNickname,
    validatePassword,
    validatePasswordCheck,
  } = useValidation()
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    handleError('email', validateEmail(formData.email))
    handleError('password', validatePassword(formData.password)!)
    handleError(
      'passwordCheck',
      validatePasswordCheck(formData.password, formData.passwordCheck),
    )
    handleError('nickname', validateNickname(formData.nickname)!)
    //걍 이딴거 집어치고 리액트훅폼 쓰기 ㅡㅡㅡ
    const { error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.nickname,
          profile_image:
            'https://i.namu.wiki/i/6AijZLjqdKDGjVzMK1CHNGiEyvrEyUVnl1_6Es4s5k5kfbep022bOHvG-sEn4_8opqy0uzzu9M7WUtU_sxb5UYmhY-fw_19wiRVJxTZDLHdaBKLbL1vEJPqQotCe18kx4bWvXMg-mbKtt-d5YjuCdG86CYBRDBmnAxBrnk9drLQ.webp',
        },
      },
    })
    if (signUpError) {
      console.error(error.message)
      alert(error.message)
    }
    router.push('/login')
  }
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-center text-2xl font-bold">회원가입</h2>
      <InputBox
        label="아이디"
        name="email"
        type="email"
        value={formData.email}
        placeholder="아이디를 입력해주세요"
        required={true}
        onChange={handleChange}
        errorMessage={error.email}
      />
      <InputBox
        label="비밀번호"
        name="password"
        type="password"
        value={formData.password}
        placeholder="비밀번호를 입력해주세요"
        required={true}
        onChange={handleChange}
        errorMessage={error.password}
      />
      <InputBox
        label="비밀번호 확인"
        name="passwordCheck"
        type="password"
        value={formData.passwordCheck}
        placeholder="비밀번호를 입력해주세요"
        required={true}
        onChange={handleChange}
        errorMessage={error.passwordCheck}
      />
      <InputBox
        label="닉네임"
        name="nickname"
        type="text"
        value={formData.nickname}
        placeholder="비밀번호를 입력해주세요"
        required={true}
        onChange={handleChange}
        errorMessage={error.nickname}
      />
      <div className="mt-6 flex items-center">
        <input
          type="checkbox"
          className="mr-2 h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-600">서비스 정책 이용약관</span>
      </div>
      <Button type="submit">회원가입</Button>
    </form>
  )
}
export default SignupForm
