'use client'

import defaultProfileImg from '@/assets/images/defaultProfileImg.png'
import { PrimaryButton } from '@/components/common'
import InputBox from '@/components/common/InputBox'
import { supabase } from '@/utils/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { z } from 'zod'

const SignupForm = () => {
  const router = useRouter()

  const validator = z
    .object({
      email: z
        .string()
        .min(1, '이메일을 입력해주세요.')
        .email('잘못된 이메일 형식입니다.'),
      password: z
        .string()
        .min(4, '비밀번호는 최소 4글자 이상이어야 합니다.')
        .max(12, '비밀번호는 12글자를 초과할 수 없습니다.'),
      passwordCheck: z.string(),
      nickname: z.string().min(3, '닉네임은 최소 3글자 이상이어야 합니다.'),
    })
    .refine((data) => data.password === data.passwordCheck, {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['passwordCheck'],
    })

  type Validator = z.infer<typeof validator>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Validator>({
    resolver: zodResolver(validator),
    mode: 'onChange',
  })

  const onSubmit = async (formData: Validator) => {
    const { error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.nickname,
          profile_image: defaultProfileImg,
        },
      },
    })
    if (signUpError) {
      console.error(signUpError.message)
      Swal.fire({
        icon: 'error',
        text: '회원가입중 오류가 발생했습니다 다시시도해주세요!',
      })
      return
    }
    Swal.fire('완료', '회원가입 완료!', 'success')
    router.push('/login')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-[50px] w-full bg-white"
    >
      <InputBox
        name="email"
        type="email"
        placeholder="아이디"
        required={true}
        errorMessage={errors.email?.message}
        register={register}
        className="caption-2 w-full rounded-lg border-white bg-[#f4f4f4]"
      />
      <InputBox
        name="password"
        type="password"
        placeholder="비밀번호"
        required={true}
        register={register}
        errorMessage={errors.password?.message}
        className="caption-2 mt-6 w-full rounded-lg border-white bg-[#f4f4f4]"
      />
      <InputBox
        name="passwordCheck"
        type="password"
        placeholder="비밀번호 확인인"
        required={true}
        register={register}
        errorMessage={errors.passwordCheck?.message}
        className="caption-2 mt-6 w-full rounded-lg border-white bg-[#f4f4f4]"
      />
      <InputBox
        name="nickname"
        type="text"
        placeholder="닉네임"
        required={true}
        register={register}
        errorMessage={errors.nickname?.message}
        className="caption-2 mt-6 w-full rounded-lg border-white bg-[#f4f4f4]"
      />
      <div className="mt-8 flex items-center">
        <input
          type="checkbox"
          className="mr-2 h-5 w-5 rounded border-gray-300 accent-primary"
        />
        <span className="caption-1">서비스 정책 이용약관</span>
      </div>
      <PrimaryButton
        type="submit"
        className="button-2 mt-12 h-[39px] w-full rounded-full border-primary text-white"
      >
        회원가입
      </PrimaryButton>
    </form>
  )
}

export default SignupForm
