'use client'
import { InputBox, Modal, PrimaryButton } from '@/components/common'
import BottomSheet from '@/components/common/BottomSheet'
import useIsDesktop from '@/hooks/useIsDesktop'
import { supabase } from '@/utils/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { z } from 'zod'
import Service from './Service'

const SignupForm = () => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const isDesktop = useIsDesktop(720)
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev)
    setIsModalOpen(false)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  const handleModal = () => {
    setModalOpen((prev) => !prev)
    router.replace('/login')
  }
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
    const defaultProfileImg =
      'https://hvpvszjjvqaoimyjinuo.supabase.co/storage/v1/object/sign/profile_image/Group%2017%20(1).png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlX2ltYWdlL0dyb3VwIDE3ICgxKS5wbmciLCJpYXQiOjE3Mzc0Mjg4OTcsImV4cCI6MTc0MDAyMDg5N30.rP1NO5Q17rqNwbwprtBw65kbhQT8DPIUxdmP4_KsRzo&t=2025-01-21T03%3A08%3A16.544Z'
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
    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) {
      console.error(signOutError.message)
    }
    setModalOpen(true)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        'mt-[25px] w-full bg-white',
        'desktop:mt-[36px] desktop:flex desktop:w-full desktop:flex-col desktop:gap-[52px]',
      )}
    >
      <InputBox
        name="email"
        type="email"
        placeholder="아이디"
        required={true}
        errorMessage={errors.email?.message}
        register={register}
        className={clsx(
          'caption-2 w-full rounded-lg border-white bg-[#f4f4f4] text-[16px]',
        )}
      />
      <InputBox
        name="password"
        type="password"
        placeholder="비밀번호"
        required={true}
        register={register}
        errorMessage={errors.password?.message}
        className={clsx(
          'caption-2 mt-6 w-full rounded-lg border-white bg-[#f4f4f4] text-[16px]',
        )}
      />
      <InputBox
        name="passwordCheck"
        type="password"
        placeholder="비밀번호 확인"
        required={true}
        register={register}
        errorMessage={errors.passwordCheck?.message}
        className={clsx(
          'caption-2 mt-6 w-full rounded-lg border-white bg-[#f4f4f4] text-[16px]',
        )}
      />
      <InputBox
        name="nickname"
        type="text"
        placeholder="닉네임"
        required={true}
        register={register}
        errorMessage={errors.nickname?.message}
        className={clsx(
          'caption-2 mt-6 w-full rounded-lg border-white bg-[#f4f4f4] text-[16px]',
        )}
      />
      <div className="mt-4 flex items-center justify-center">
        <input
          type="checkbox"
          className="mr-2 h-5 w-5 cursor-auto rounded border-gray-300 accent-primary"
          checked={isChecked}
          readOnly
          onClick={handleOpenModal}
        />
        <span onClick={handleOpenModal} className="caption-1 cursor-auto">
          서비스 정책 이용약관
        </span>
      </div>
      <PrimaryButton
        type="submit"
        disabled={!isChecked}
        className={clsx('mt-4 h-[39px]', !isChecked && 'opacity-60')}
      >
        회원가입
      </PrimaryButton>
      <>
        {isDesktop ? (
          <Modal
            isOpen={isModalOpen}
            title="서비스 이용 약관"
            content={
              <Service
                handleCheckboxChange={handleCheckboxChange}
                isChecked={isChecked}
              />
            }
            onCancel={handleCloseModal}
            type="none"
            className={clsx('desktop:h-[580px] desktop:w-[550px]')}
          />
        ) : (
          <BottomSheet
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            height="80%"
            maxWidth="100%"
          >
            <h1 className="text-[24px]">
              <b>서비스 이용 약관</b>
            </h1>
            <Service
              handleCheckboxChange={handleCheckboxChange}
              isChecked={isChecked}
            />
          </BottomSheet>
        )}
        <Modal
          isOpen={modalOpen}
          title="완료"
          content="회원가입 완료!"
          onCancel={handleModal}
          onConfirm={handleModal}
        />
      </>
    </form>
  )
}
export default SignupForm
