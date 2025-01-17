import { PrimaryButton } from '@/components/common'
import InputBox from '@/components/common/InputBox'
import { supabase } from '@/utils/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { z } from 'zod'
const passwordChangeSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: '비밀번호는 최소 6자리 이상이어야 합니다.' }),
    passwordCheck: z
      .string()
      .min(6, { message: '비밀번호 확인을 입력해주세요.' }),
  })
  .refine(({ newPassword, passwordCheck }) => newPassword === passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck'],
  })

type PasswordChangeForm = z.infer<typeof passwordChangeSchema>
type PasswordChangeProps = {
  setIsOpenPassword: React.Dispatch<React.SetStateAction<boolean>>
}

export const PasswordChange = ({ setIsOpenPassword }: PasswordChangeProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordChangeForm>({
    resolver: zodResolver(passwordChangeSchema),
  })
  const onSubmit = async (data: PasswordChangeForm) => {
    const { newPassword } = data
    const { error: passwordChangeError } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (passwordChangeError) {
      console.error(passwordChangeError.message)
      Swal.fire({
        icon: 'error',
        text: '비밀번호 변경중 오류가 발생했습니다 다시시도해주세요!',
      })
    } else {
      Swal.fire('완료', '비밀번호가 변경되었습니다.', 'success')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <h1 className="title-1 mb-7">비밀번호 변경</h1>
      <InputBox
        name="newPassword"
        type="password"
        placeholder="새로운 비밀번호"
        register={register}
        errorMessage={errors.newPassword?.message}
        required={true}
        className="caption-2 mb-3 w-full rounded-lg border-white bg-[#f4f4f4]"
      />
      <InputBox
        name="passwordCheck"
        type="password"
        placeholder="비밀번호 확인"
        register={register}
        errorMessage={errors.passwordCheck?.message}
        required={true}
        className="caption-2 mb-9 w-full rounded-lg border-white bg-[#f4f4f4]"
      />
      <PrimaryButton
        type="submit"
        className="button-2 h-[39px] w-full rounded-full"
        onClick={() => {
          setIsOpenPassword(false)
        }}
      >
        확인
      </PrimaryButton>
    </form>
  )
}

export default PasswordChange
