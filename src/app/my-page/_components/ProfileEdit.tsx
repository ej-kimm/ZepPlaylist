'use client'

import { updateProfile } from '@/api/my-page/actions'
import type { User } from '@/types/auth'
import Image from 'next/image'
import { useRef, useState } from 'react'
// 유저에 데이터가 널이 아니면 체크
const ProfileEdit = ({ user, setUser }: User) => {
  const [modal, setModal] = useState(false)
  const [editNickname, setEitNickname] = useState(user?.nickname || '')
  const [profileImage, setProfileImage] = useState(user?.profile_image)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)
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
      setModal(false)
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
        onClick={openModal}
        className="rounded bg-[#B15EFF] px-4 py-2 text-white hover:bg-[#9F54E5] focus:outline-none focus:ring-2 focus:ring-[#B15EFF]"
      >
        프로필 변경
      </button>

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h1 className="mb-4 text-2xl font-semibold">프로필 수정</h1>
            <div className="mb-4 flex justify-center">
              <Image
                width={100}
                height={100}
                src={profileImage!}
                alt="프로필 이미지"
                className="h-24 w-24 rounded-full object-cover"
                onClick={handleImgClick}
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleProfileImgChange}
              />
            </div>
            <button
              onClick={handleImgClick}
              className="rounded bg-[#B15EFF] px-4 py-2 text-white transition-all hover:bg-[#9F54E5] focus:outline-none focus:ring-2 focus:ring-[#B15EFF]"
            >
              프로필 사진 변경
            </button>
            <div className="mb-4">
              <label htmlFor="nickname" className="mb-1 block font-medium">
                {user?.nickname}
              </label>
              <input
                type="text"
                id="nickname"
                className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editNickname}
                onChange={handleNickname}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="rounded bg-[#B15EFF] px-4 py-2 text-white transition-all hover:bg-[#9F54E5] focus:outline-none focus:ring-2 focus:ring-[#B15EFF]"
                onClick={updatedNickname}
              >
                확인
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="rounded bg-[#B15EFF] px-4 py-2 text-white transition-all hover:bg-[#9F54E5] focus:outline-none focus:ring-2 focus:ring-[#B15EFF]"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileEdit
