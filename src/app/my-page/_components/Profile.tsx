'use client'

import { userStore } from '@/store/userSlice'
import Image from 'next/image'
import ProfileEdit from './ProfileEdit'

const Profile = () => {
  const { user, setUser } = userStore()
  console.log('user', user)

  const defaultImg = '/image/defalut-profile.png' //임시 기본이미지지
  if (!user) {
    return
  }
  return (
    <div>
      <div className="mb-6 flex items-center">
        <Image
          src={user.profile_image || defaultImg}
          width={100}
          height={100}
          alt="프로필 이미지"
          className="mr-4 rounded-full"
        />
        <ProfileEdit user={user} setUser={setUser} />
      </div>
      <p className="text-lg">{user.nickname}</p>
      <h2 className="mb-4 text-xl">내가 커뮤니티에 쓴 글</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"></div>
    </div>
  )
}

export default Profile
