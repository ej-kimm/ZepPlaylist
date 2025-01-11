'use client'

import { userStore } from '@/store/userSlice'

const ProfileEdit = () => {
  const { user } = userStore((state) => state)
  console.log('user=======', user)
  const editProfile = () => {}
  return (
    <div>
      <button type="button" onClick={editProfile}>
        프로필 변경
      </button>
    </div>
  )
}

export default ProfileEdit
