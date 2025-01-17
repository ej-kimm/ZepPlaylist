import { getPlaylists, getPopularPlaylists } from '@/api/community/actions'
import ClientSwiper from '@/components/common/ClientSwiper'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import ClientPopularPlaylistUI from './_components/ClientPopularPlaylistUI'
import KeywordCarouselWrapper from './_components/KeywordCarouselWrapper'

const CommunityPage = async (): Promise<JSX.Element> => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookies().getAll(),
      },
    },
  )

  const { data: session } = await supabase.auth.getSession()

  if (!session || !session.session?.user) {
    console.error('유저 정보를 가져오는 데 실패했습니다.')
    return (
      <div>
        <h1 className="text-2xl font-bold text-red-500">
          로그인된 사용자가 없습니다. 다시 로그인해주세요.
        </h1>
      </div>
    )
  }

  const userId = session.session.user.id

  // 수정된 actions.ts에 맞게 함수 호출
  const allPlaylists = await getPlaylists(userId)
  const popularPlaylists = await getPopularPlaylists(userId)

  return (
    <div>
      <h1 className="title-1">인기 있는 플레이리스트</h1>
      <ClientSwiper
        items={popularPlaylists.map((playlist) => ({
          id: playlist.id,
          content: (
            <ClientPopularPlaylistUI
              playlist={{
                albumCover: playlist.album_cover ?? '',
                isLiked: playlist.likedByUser ?? false,
                id: playlist.id,
              }}
            />
          ),
        }))}
      />
      <KeywordCarouselWrapper allPlaylists={allPlaylists} userId={userId} />
    </div>
  )
}

export default CommunityPage
