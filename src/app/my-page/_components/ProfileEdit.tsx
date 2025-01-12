'use client'

import { userStore } from '@/store/userSlice'
import Image from 'next/image'
import { useState } from 'react'

const ProfileEdit = () => {
  const { user } = userStore((state) => state)
  const [modal, setModal] = useState(false)
  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)
  const editProfile = () => {}
  // const { data, error } = await supabase.auth.admin.deleteUser(
  //   'userid ',
  // ) 회원 탈퇴기능 << 쉬움 디자이너님한테 물어보고 해보기
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
                src={user?.user?.profile_image!}
                alt="프로필 이미지"
                className="h-24 w-24 rounded-full object-cover"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="nickname" className="mb-1 block font-medium">
                {user?.user?.nickname}
              </label>
              <input
                type="text"
                id="nickname"
                className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="rounded bg-[#B15EFF] px-4 py-2 text-white transition-all hover:bg-[#9F54E5] focus:outline-none focus:ring-2 focus:ring-[#B15EFF]"
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
