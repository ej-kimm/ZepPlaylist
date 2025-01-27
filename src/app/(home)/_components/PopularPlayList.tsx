import { getPopularPlaylists } from '@/api/community/actions'
import ClientPopularPlaylistUI from '@/app/community/_components/ClientPopularPlaylistUI'
import CustomSwiper from '@/app/community/_components/CustomSwiper'
import defaultProfileImg from '@/assets/images/defaultProfileImg.png'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const PopularPlayList = async () => {
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

  const userId = session?.session?.user?.id ?? null

  const popularPlaylists = await getPopularPlaylists(userId ?? '')
  return (
    <div>
      <h1 className="title-1 mb-4 mt-5">인기 있는 플레이리스트</h1>
      <CustomSwiper
        items={popularPlaylists.map((playlist) => ({
          id: playlist.id,
          content: (
            <ClientPopularPlaylistUI
              playlist={{
                albumCover: playlist.album_cover ?? '',
                isLiked: playlist.likedByUser ?? false,
                id: playlist.id,
                playlistName: playlist.name,
                profileImg: playlist.profile_image ?? defaultProfileImg,
                nickName:
                  playlist.nickname && playlist.nickname.trim() !== ''
                    ? playlist.nickname
                    : 'Anonymous',
              }}
              userId={userId ?? ''}
            />
          ),
        }))}
      />
    </div>
  )
}

export default PopularPlayList
