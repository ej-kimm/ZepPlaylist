import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import Link from 'next/link'

const MyPage = async () => {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getSession()
  const user = data.session?.user.user_metadata
  console.log('user', user)
  const userId = data.session?.user.id
  console.log('userId======================', userId)
  console.log('user', user)
  const { data: playlists, error: listerror } = await supabase
    .from('playlists')
    .select(`*, playlist_music(* , music(*)) `)
    .eq('user_id', userId!)
  console.log('playlists', playlists)
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl">마이페이지</h1>
      <div className="mb-6 flex items-center">
        <Image
          src={user!.profile_image}
          width={100}
          height={100}
          alt="프로필 이미지"
          className="mr-4 rounded-full"
        />
      </div>
      <p className="text-lg">{user!.name}</p>
      <h2 className="mb-4 text-xl font-semibold">내가 커뮤니티에 쓴 글</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {playlists && playlists.length > 0 ? (
          playlists.map((p) => (
            <Link key={p.id} href={`/community/${p.id}`}>
              <p className="font-bold text-gray-800">{p.name}</p>
              <p className="mt-1 text-sm text-gray-600">{p.description}</p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">작성한 게시물이 없습니다.</p>
        )}
      </div>
    </div>
  )
}

export default MyPage
