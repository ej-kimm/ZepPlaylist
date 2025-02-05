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
  const [modalOpen, setModalOpen] = useState(false)
  const [modalValue, setModalValue] = useState('')
  const isDesktop = useIsDesktop(720)
  const handleProfileEditBottomSheet = () => {
    setIsOpenProfileEdit((prev) => !prev)
  }
  const handlePasswordBottomSheet = () => {
    setIsOpenPassword((prev) => !prev)
  }
  const handleModal = () => {
    setModalOpen((prev) => !prev)
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
        <>
          <Modal
            isOpen={isOpenProfileEdit}
            title="프로필 수정"
            type="none"
            className="desktop:w-[532px]"
            onCancel={() => {
              handleProfileEditBottomSheet()
            }}
            onConfirm={handlePasswordBottomSheet}
          >
            <ProfileChange
              handleClose={() => {
                handleProfileEditBottomSheet()
              }}
              onSubmit={() => {
                setModalValue('프로필 수정이 완료되었습니다!')
                setModalOpen(true)
              }}
              handleOpenPasswordSheet={handlePasswordBottomSheet}
            />
          </Modal>
          <Modal
            isOpen={isOpenPassword}
            title="비밀번호 변경"
            type="none"
            className="desktop:w-[532px]"
            onCancel={() => {
              handlePasswordBottomSheet()
            }}
          >
            <PasswordChange
              handleClosePasswordSheet={() => {
                handlePasswordBottomSheet()
              }}
              onClick={() => {
                setModalOpen(true)
                setModalValue('비밀번호 변경이 완료됐습니다!')
              }}
            />
          </Modal>
        </>
      ) : (
        <>
          <ProfileEditBottomSheet
            isOpen={isOpenProfileEdit}
            handleClose={() => {
              handleProfileEditBottomSheet()
            }}
            onSubmit={() => {
              setModalOpen(true)
              setModalValue('프로필 수정이 완료되었습니다!')
            }}
            handleOpenPasswordSheet={handlePasswordBottomSheet}
          />
          <PasswordEditBottomSheet
            isOpen={isOpenPassword}
            handleClose={() => {
              handlePasswordBottomSheet()
            }}
            onClick={() => {
              setModalValue('비밀번호 변경이 완료되었습니다!')
              setModalOpen(true)
            }}
          />
        </>
      )}
      <Modal
        isOpen={modalOpen}
        title="확인"
        content={modalValue}
        type="single"
        onCancel={handleModal}
        onConfirm={handleModal}
      ></Modal>
    </div>
  )
}

export default ProfileEdit
