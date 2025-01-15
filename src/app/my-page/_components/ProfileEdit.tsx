'use client'

import { updateProfile } from '@/api/my-page/actions'
import BottomSheet from '@/components/common/BottomSheet'
import type { User } from '@/types/auth'
import Image from 'next/image'
import { useRef, useState } from 'react'
import PasswordChange from './PasswordChange'
const ProfileEdit = ({ user, setUser }: User) => {
  const [isOpen, setIsOpen] = useState(false) // 그냥 바텀시트
  const [isOpenPassword, setIsOpenPassword] = useState(false) // 비밀번호 변경 바텀시트
  const [editNickname, setEitNickname] = useState(user?.nickname || '')
  const [profileImage, setProfileImage] = useState(user?.profile_image)
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
    } catch (error) {
      console.error('프로필 업데이트 오류:', error)
      alert('프로필 업데이트 중 오류가 발생했습니다.')
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
      setIsOpen(false)
    } catch (error) {
      console.error('닉네임 업데이트 오류:', error)
      alert('닉네임 업데이트 중 오류가 발생했습니다.')
    }
  }

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEitNickname(e.target.value)
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded bg-[#B15EFF] px-4 py-2 text-white hover:bg-[#9F54E5] focus:outline-none focus:ring-2 focus:ring-[#B15EFF]"
      >
        프로필 변경
      </button>

      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        height="50%"
        maxWidth="500px"
      >
        <div className="flex flex-col items-center space-y-6 p-4">
          <h1 className="flex items-center space-x-4 text-xl text-[#333]">
            프로필 수정
          </h1>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                width={100}
                height={100}
                src={profileImage!}
                alt="프로필 이미지"
                className="h-24 w-24 rounded-full border border-gray-300 object-cover"
                onClick={handleImgClick}
              />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleProfileImgChange}
            />
            <button
              onClick={handleImgClick}
              className="text-sm text-[#B15EFF] underline"
            >
              프로필 사진 변경
            </button>
          </div>
          <div className="w-full">
            <label className="mb-2 block text-gray-700">닉네임</label>
            <input
              type="text"
              value={editNickname} // 최신 닉네임 상태를 표시
              onChange={handleNickname} // 닉네임 변경 핸들러 연결
              placeholder="닉네임을 입력하세요"
              required
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between">
              <button
                className="text-sm text-gray-500"
                onClick={() => {
                  setIsOpen(false)
                  setIsOpenPassword(true)
                }}
              >
                비밀번호 변경
              </button>
              <button className="text-sm text-[#B15EFF] underline"></button>
            </div>
          </div>
          <div className="w-full">
            <button
              type="button"
              className="w-full rounded-lg bg-[#B15EFF] py-3 text-white transition-all hover:bg-[#9F54E5] focus:outline-none focus:ring-2 focus:ring-[#B15EFF]"
              onClick={updatedNickname}
            >
              확인
            </button>
          </div>
        </div>
      </BottomSheet>
      <BottomSheet
        isOpen={isOpenPassword}
        onClose={() => setIsOpenPassword(false)}
        height="50%"
        maxWidth="500px"
      >
        <PasswordChange setIsOpenPassword={setIsOpenPassword} />
      </BottomSheet>
    </div>
  )
}

export default ProfileEdit
