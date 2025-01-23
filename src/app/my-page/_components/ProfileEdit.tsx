'use client'
import {
  PasswordEditBottomSheet,
  ProfileEditBottomSheet,
} from '@/components/common'
import { useState } from 'react'

const ProfileEdit = () => {
  const [isOpenProfileEdit, setIsOpenProfileEdit] = useState<boolean>(false) // 프로필 변경 바텀시트
  const [isOpenPassword, setIsOpenPassword] = useState<boolean>(false) // 비밀번호 변경 바텀시트

  const handleProfileEditBottomSheet = () =>
    setIsOpenProfileEdit((prev) => !prev)
  const handlePasswordBottomSheet = () => setIsOpenPassword((prev) => !prev)

  return (
    <div className="ml-auto">
      <button
        type="button"
        onClick={handleProfileEditBottomSheet}
        className="caption-2"
      >
        프로필 변경
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
