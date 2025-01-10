import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'

const MyPage = async () => {
  const supabase = createClient()
  const { data: user, error } = await supabase.from('users').select('*')
  console.log('data', user)
  return (
    <div>
      <h1>마이페이지</h1>
      <Image
        src={user[0].profile_image}
        width={100} height={100} />
      <h2>내가 커뮤니티에 쓴 글</h2>
    </div>
  )
}

export default MyPage
