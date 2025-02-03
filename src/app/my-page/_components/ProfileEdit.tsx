'use client'
import vector from '@/assets/images/Vector.svg'
import {
  PasswordEditBottomSheet,
  ProfileEditBottomSheet,
} from '@/components/common'
import Image from 'next/image'
import { useState } from 'react'

const ProfileEdit = () => {
  const [isOpenProfileEdit, setIsOpenProfileEdit] = useState<boolean>(false) // 프로필 변경 바텀시트
  const [isOpenPassword, setIsOpenPassword] = useState<boolean>(false) // 비밀번호 변경 바텀시트

  const handleProfileEditBottomSheet = () =>
    setIsOpenProfileEdit((prev) => !prev)
  const handlePasswordBottomSheet = () => setIsOpenPassword((prev) => !prev)

  return (
    <div>
      <button
        type="button"
        onClick={handleProfileEditBottomSheet}
        className="caption-2 flex items-center gap-2"
      >
        프로필 변경
        <Image
          src={vector}
          width={6}
          height={10}
          alt="화살표"
          className="h-[10px] w-[6px]"
        />
      </button>
      <ProfileEditBottomSheet
        isOpen={isOpenProfileEdit}
        handleClose={handleProfileEditBottomSheet}
        handleOpenPasswordSheet={handlePasswordBottomSheet}
      />
      <PasswordEditBottomSheet
        isOpen={isOpenPassword}
        handleClose={handlePasswordBottomSheet}
      />
    </div>
  )
}

export default ProfileEdit
