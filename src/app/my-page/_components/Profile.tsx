'use client'

import defaultProfileImg from '@/assets/images/defaultProfileImg.png'
import { userStore } from '@/store/userSlice'
import Image from 'next/image'
import ProfileEdit from './ProfileEdit'

const Profile = () => {
  const { user } = userStore()
  if (!user) {
    return
  }
  return (
    <div className="mb-6 flex w-full items-center">
      <div className="h-11 w-11 overflow-hidden rounded-full">
        <Image
          src={user.profile_image || defaultProfileImg}
          width={44}
          height={44}
          alt="프로필 이미지"
          className="mb-[46px] h-11 w-11"
        />
      </div>
      <p className="body-2 ml-4">{user.nickname}</p>
      <ProfileEdit />
    </div>
  )
}

export default Profile
