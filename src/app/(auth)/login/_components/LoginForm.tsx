'use client'
import { PrimaryButton } from '@/components/common'
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
    .min(1, '이메일을 입력해주세요.')
    .email('잘못된 이메일 형식입니다.'),

  password: z.string(),
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
    mode: 'onChange',
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
    const { data: img } = await supabase.auth.getUser()
    console.log('first', img)
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
    console.log('first', loginUser)

    const user: Users | null = loginUser
      ? {
          id: loginUser[0].id,
          email: loginUser[0].email,
          nickname: loginUser[0].nickname,
          profile_image: img.user?.user_metadata.profile_image,
        }
      : null
    setUser(user)
    router.push('/')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-sm border-b border-black border-opacity-40 pb-[36px] sm:p-6"
    >
      <h2 className="title-1 mt-[72px] text-left">로그인</h2>
      <InputBox
        name="email"
        type="email"
        placeholder="아이디"
        required
        errorMessage={errors.email?.message}
        register={register}
        className="caption-2 mt-10 w-full rounded-lg border-white bg-[#f4f4f4]"
      />
      <InputBox
        name="password"
        type="password"
        placeholder="비밀번호"
        required
        register={register}
        className="caption-2 mt-10 w-full rounded-lg border-white bg-[#f4f4f4]"
      />
      <PrimaryButton
        type="submit"
        className="button-2 mt-[52px] h-[39px] w-full rounded-full border-primary text-white"
      >
        로그인
      </PrimaryButton>
    </form>
  )
}

export default LoginForm
