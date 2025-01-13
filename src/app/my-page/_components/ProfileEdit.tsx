'use client'

import { userStore } from '@/store/userSlice'
import { supabase } from '@/utils/supabase/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRef, useState } from 'react'

const ProfileEdit = () => {
  const { user } = userStore()
  const [modal, setModal] = useState(false)
  const [editNickname, setEitNickname] = useState(user?.nickname)
  const [profileImage, setProfileImage] = useState(user?.profile_image)

  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)
  console.log('user.======주스탠드', user)
  const { mutate: mutateNickname } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .update({ nickname: editNickname })
        .eq('id', user?.id!)
        .select()
      if (error) throw new Error(error.message)
      return data
    },
    onSuccess: (data) => {
      console.log('data', data)
      queryClient.invalidateQueries({ queryKey: ['user'] })
      setModal(false)
    },
    onError: (error) => {
      console.error(error.message)
      alert('프로필 업데이트 중 에러 발생')
    },
  })
  const { mutate: mutateImg } = useMutation({
    mutationFn: async (img: string) => {
      const { error } = await supabase
        .from('users')
        .update({ profile_image: img })
        .eq('id', user?.id!)
      if (error) throw new Error(error.message)
      return img
    },
    onSuccess: (newProfileImg: string) => {
      setProfileImage(newProfileImg)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      console.error(error.message)
    },
  })
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
          mutateImg(img)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  const editProfile = () => {
    mutateNickname()
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
                src={user?.profile_image!}
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
                onClick={editProfile}
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
