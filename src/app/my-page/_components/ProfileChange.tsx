import { updateProfile } from '@/api/my-page/actions'
import defaultProfileImg from '@/assets/images/defaultProfileImg.png'
import { PrimaryButton } from '@/components/common'
import { userStore } from '@/store/userSlice'
import Image from 'next/image'
import { useRef, useState } from 'react'
import Swal from 'sweetalert2'

type Props = {
  handleOpenPasswordSheet: () => void
  handleClose: () => void
}
const ProfileChange = ({ handleOpenPasswordSheet, handleClose }: Props) => {
  const { user, setUser } = userStore()
  const [editNickname, setEitNickname] = useState(user!.nickname || '')
  const [profileImage, setProfileImage] = useState(user!.profile_image)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImgClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
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
          setProfileImage(img)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEitNickname(e.target.value)
  }
  const handlePassword = () => {
    handleClose()
    handleOpenPasswordSheet()
  }
  const handleSubmit = async () => {
    if (!user) return
    try {
      const updateData = await updateProfile(
        { nickname: editNickname, profile_image: profileImage },
        user.id,
      )
      Swal.fire('완료', '프로필 수정이 완료됐습니다!', 'success')
      handleClose()
      setUser({
        ...user,
        nickname: updateData[0].nickname,
        profile_image: updateData[0].profile_image,
      })
    } catch (error) {
      console.error('프로필 업데이트 오류:', error)
      Swal.fire({
        icon: 'error',
        text: '프로필 수정 중 오류가 발생했습니다.',
      })
    }
  }
  return (
    <div className="mt-7 flex flex-col items-center space-y-6">
      <div className="flex w-full items-center justify-between">
        <div className="mb-[30px] flex items-center space-x-4">
          <Image
            width={64}
            height={64}
            src={profileImage! || defaultProfileImg}
            alt="프로필 이미지"
            className="h-16 w-16 rounded-full"
            onClick={handleImgClick}
          />
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleProfileImgChange}
        />
        <button onClick={handleImgClick} className="caption-1 mb-6">
          프로필 사진 변경
        </button>
      </div>
      <input
        type="text"
        value={editNickname}
        onChange={handleNickname}
        className="caption-2 h-9 w-full cursor-text rounded-lg border border-white bg-[#f4f4f4] pl-2 text-[16px]"
      />
      <button
        className="caption-1 mt-5 w-full text-left"
        onClick={handlePassword}
      >
        비밀번호 변경
      </button>
      <PrimaryButton
        type="button"
        onClick={handleSubmit}
        className="mt-9 h-[39px]"
      >
        확인
      </PrimaryButton>
    </div>
  )
}

export default ProfileChange
