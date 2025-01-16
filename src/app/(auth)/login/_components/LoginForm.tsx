'use client'
import { Button } from '@/components/common'
import InputBox from '@/components/common/InputBox'
import { userStore } from '@/store/userSlice'
import type { Users } from '@/types/auth'
import { supabase } from '@/utils/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { z } from 'zod'

const validator = z.object({
  email: z
    .string()
    .email('유효한 이메일 형식이어야 합니다.')
    .min(1, '이메일을 입력해주세요.'),
  password: z
    .string()
    .min(4, '비밀번호는 최소 4글자 이상이어야 합니다.')
    .max(12, '비밀번호는 12글자를 초과할 수 없습니다.')
    .nonempty('비밀번호를 입력해주세요.'),
})
type LoginFormData = z.infer<typeof validator>

const LoginForm = () => {
  const router = useRouter()
  const { setUser } = userStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(validator),
  })

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const { email, password } = data

    const { data: userData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        text: '아이디 혹은 비밀번호를 확인해주세요!',
      })
      return
    }
    let loginUser = null
    if (userData.user) {
      const { data: fetchuser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userData.user.id)
      if (fetchError) {
        console.error(fetchError)
        return
      }
      loginUser = fetchuser
    }

    const user: Users | null = loginUser
      ? {
          id: loginUser[0].id,
          email: loginUser[0].email,
          nickname: loginUser[0].nickname,
          profile_image: loginUser[0].profile_image,
        }
      : null
    setUser(user)
    router.push('/')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-sm rounded-lg bg-white p-4 shadow-lg sm:p-6"
    >
      <h2 className="mb-6 text-center text-xl sm:text-2xl">로그인</h2>
      <InputBox
        label="이메일"
        name="email"
        type="email"
        placeholder="이메일을 입력하세요"
        required
        errorMessage={errors.email?.message}
        register={register}
        className="border-gray-300 focus:ring-purple-500"
      />
      <InputBox
        label="비밀번호"
        name="password"
        type="password"
        placeholder="비밀번호를 입력하세요"
        required
        errorMessage={errors.password?.message}
        register={register}
      />
      <Button type="submit">로그인</Button>
    </form>
  )
}

export default LoginForm
