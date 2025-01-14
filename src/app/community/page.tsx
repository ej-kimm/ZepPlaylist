import { getPlaylists, getPopularPlaylists } from '@/api/community/playlists'
import PlaylistSection from '@/app/community/_components/PlaylistSection'
import type { Database } from '@/types/supabase'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const CommunityPage = async (): Promise<JSX.Element> => {
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookies().getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookies().set(name, value, options)
          })
        },
      },
    },
  )

  const { data: session } = await supabase.auth.getSession()

  if (!session || !session.session?.user) {
    console.error('유저 정보를 가져오는 데 실패했습니다.')
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-500">
          로그인된 사용자가 없습니다. 다시 로그인해주세요.
        </h1>
      </div>
    )
  }

  const userId = session.session.user.id

  const playlists = (await getPlaylists(userId)).map((playlist) => ({
    ...playlist,
    description: playlist.description || '',
  }))
  const popularPlaylists = (await getPopularPlaylists(userId)).map(
    (playlist) => ({
      ...playlist,
      description: playlist.description || '',
    }),
  )

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">인기 있는 플레이리스트</h1>
      <PlaylistSection playlists={popularPlaylists} isSwiper userId={userId} />

      <h1 className="mb-4 mt-8 text-2xl font-bold">전체 플레이리스트</h1>
      <PlaylistSection playlists={playlists} userId={userId} />
    </div>
  )
}

export default CommunityPage
