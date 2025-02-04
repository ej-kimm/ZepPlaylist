'use client'
import vector from '@/assets/images/Vector.svg'
import {
  Modal,
  PasswordEditBottomSheet,
  ProfileEditBottomSheet,
} from '@/components/common'
import useIsDesktop from '@/hooks/useIsDesktop'
import Image from 'next/image'
import { useState } from 'react'
import PasswordChange from './PasswordChange'
import ProfileChange from './ProfileChange'

const ProfileEdit = () => {
  const [isOpenProfileEdit, setIsOpenProfileEdit] = useState<boolean>(false) // 프로필 변경 바텀시트
  const [isOpenPassword, setIsOpenPassword] = useState<boolean>(false) // 비밀번호 변경 바텀시트
  const [modalChange, setModalChange] = useState<boolean>(false)
  const isDesktop = useIsDesktop(720)
  const handleProfileEditBottomSheet = () => {
    setIsOpenProfileEdit((prev) => !prev)
  }
  const handlePasswordBottomSheet = () => {
    setIsOpenPassword((prev) => !prev)
  }
  const handleModal = () => {
    setModalChange(true)
  }
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
      {isDesktop ? (
        <Modal
          isOpen={isOpenProfileEdit}
          title={modalChange ? '' : '프로필 수정'}
          type="none"
          onCancel={handleProfileEditBottomSheet}
          onConfirm={handlePasswordBottomSheet}
        >
          {modalChange ? (
            <PasswordChange setIsOpenPassword={handleProfileEditBottomSheet} />
          ) : (
            <ProfileChange
              handleClose={handlePasswordBottomSheet}
              handleOpenPasswordSheet={handleModal}
            />
          )}
        </Modal>
      ) : (
        // 모달안에 폼 넣고
        // 모달 프로필 / 패스워드 모달인지 state 관리로 모달 삼항연산자 써서 바꿔주기
        <ProfileEditBottomSheet
          isOpen={isOpenProfileEdit}
          handleClose={handleProfileEditBottomSheet}
          handleOpenPasswordSheet={handlePasswordBottomSheet}
        />
      )}
      <div className="desktop:hidden">
        <PasswordEditBottomSheet
          isOpen={isOpenPassword}
          handleClose={handlePasswordBottomSheet}
        />
      </div>
    </div>
  )
}

export default ProfileEdit
