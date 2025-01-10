'use client'

import { supabase } from '@/utils/supabase/client'
import { useEffect } from 'react'

const ProfileEdit = () => {
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession()
      const user = data
      console.log('user', user)
      if (error) {
        console.error(error.message)
      }
    }
    fetchUser()
  }, [])
  const editProfile = () => {}
  return (
    <div>
      <button type="button" onClick={editProfile}>
        프로필 변경
      </button>
    </div>
  )
}

//mui animation-de
//text 필드 회원가입 폼 액션눌렀을때 체크하든지 아니면 실시간할지 디자이너 분이랑 협의봐야함 .
// 텍스트필드 컴포넌트만든다하면 프롭스로 

export default ProfileEdit
