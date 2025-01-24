import { updateProfile } from '@/api/my-page/actions'
import { userStore } from '@/store/userSlice'
import Image from 'next/image'
import { useRef, useState } from 'react'
import Swal from 'sweetalert2'
import BottomSheet from './BottomSheet'
import { PrimaryButton } from './Button'

type ProfileEditBottomSheetProps = {
  isOpen: boolean
  handleClose: () => void
  handleOpenPasswordSheet: () => void
}

const ProfileEditBottomSheet = ({
  isOpen,
  handleClose,
  handleOpenPasswordSheet,
}: ProfileEditBottomSheetProps) => {
  const { user, setUser } = userStore()
  const [editNickname, setEitNickname] = useState(user!.nickname || '')
  const [profileImage, setProfileImage] = useState(user!.profile_image)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImgClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const updateProfileImg = async (img: string) => {
    if (!user) {
      return
    }
    try {
      const updatedData = await updateProfile({ profile_image: img }, user.id)
      setUser({ ...user, profile_image: updatedData[0].profile_image })
      setProfileImage(updatedData[0].profile_image)
      Swal.fire('완료', '프로필 사진이 업로드 됐습니다', 'success')
      handleClose()
    } catch (error) {
      console.error('프로필 업데이트 오류:', error)
      Swal.fire({
        icon: 'error',
        text: '프로필 업데이트중 오류가 발생했습니다 다시시도해주세요!',
      })
    }
  }
  const handleProfileImgChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          const img = reader.result.toString()
          updateProfileImg(img)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  const updatedNickname = async () => {
    if (!user) {
      return
    }
    try {
      const updatedData = await updateProfile(
        { nickname: editNickname },
        user.id,
      )
      setUser({ ...user, nickname: updatedData[0].nickname })
      handleClose()
      Swal.fire('완료', '닉네임이 업로드 됐습니다', 'success')
    } catch (error) {
      console.error('닉네임 업데이트 오류:', error)
      Swal.fire({
        icon: 'error',
        text: '닉네임 변경중 오류가 발생했습니다 다시시도해주세요!',
      })
    }
  }
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEitNickname(e.target.value)
  }
  const handlePassword = () => {
    handleClose()
    handleOpenPasswordSheet()
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={handleClose}
      height="auto"
      maxWidth="100%"
    >
      <h1 className="title-1 mt-10 text-left">프로필 수정</h1>
      <div className="mt-7 flex flex-col items-center space-y-6">
        <div className="flex w-full items-center justify-between">
          <div className="mb-[30px] flex items-center space-x-4">
            <Image
              width={64}
              height={64}
              src={profileImage!}
              alt="프로필 이미지"
              className="h-16 w-16 rounded-full"
              onClick={handleImgClick}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleProfileImgChange}
            className="hidden"
          />
          <button onClick={handleImgClick} className="caption-1 mb-6">
            프로필 사진 변경
          </button>
        </div>
        <input
          type="text"
          value={editNickname}
          onChange={handleNickname}
          className="caption-2 h-9 w-full rounded-lg border border-white bg-[#f4f4f4] pl-2"
        />
        <button
          className="caption-1 mt-5 w-full text-left"
          onClick={handlePassword}
        >
          비밀번호 변경
        </button>
        <PrimaryButton
          type="button"
          className="mt-9 h-[39px]"
          onClick={updatedNickname}
        >
          확인
        </PrimaryButton>
      </div>
    </BottomSheet>
  )
}

export default ProfileEditBottomSheet
