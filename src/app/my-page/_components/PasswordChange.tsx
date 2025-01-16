import InputBox from '@/components/common/InputBox'
import { supabase } from '@/utils/supabase/client'
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
  } = useForm<PasswordChangeForm>()
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputBox
        name="newPassword"
        type="password"
        placeholder="새로운 비밀번호"
        register={register}
        errorMessage={errors.newPassword?.message}
        required={true}
      />
      <InputBox
        name="passwordCheck"
        type="password"
        placeholder="비밀번호 확인인"
        register={register}
        errorMessage={errors.passwordCheck?.message}
        required={true}
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-[#B15EFF] py-3 text-white transition-all hover:bg-[#9F54E5] focus:outline-none focus:ring-2 focus:ring-[#B15EFF]"
        onClick={() => {
          setIsOpenPassword(false)
        }}
      >
        확인
      </button>
    </form>
  )
}

export default PasswordChange
