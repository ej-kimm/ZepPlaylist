'use client'

import defaultProfileImg from '@/assets/images/defaultProfileImg.png'
import { userStore } from '@/store/userSlice'
import clsx from 'clsx'
import Image from 'next/image'
import ProfileEdit from './ProfileEdit'

const Profile = () => {
  const { user } = userStore()

  if (!user) {
    return
  }
  return (
    <div
      className={clsx(
        'mb-6 flex w-full flex-wrap items-center justify-between',
        'desktop:px-6',
      )}
    >
      <h1
        className={clsx(
          '-ml-[24px] mb-4 hidden desktop:block desktop:w-full desktop:text-[22px]',
        )}
      >
        프로필
      </h1>
      <div className="flex items-center">
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
      </div>
      <ProfileEdit />
    </div>
  )
}

export default Profile
