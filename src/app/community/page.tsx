import { getPlaylists, getPopularPlaylists } from '@/api/community/actions'

import defaultProfileImg from '@/assets/images/defaultProfileImg.png'
import { createServerClient } from '@supabase/ssr'
import clsx from 'clsx'
import { cookies } from 'next/headers'
import ClientPopularPlaylistUI from './_components/ClientPopularPlaylistUI'
import CustomSwiper from './_components/CustomSwiper'
import FloatingPlusButton from './_components/FloatingPlusButton'
import KeywordCarouselWrapper from './_components/KeywordCarouselWrapper'

const CommunityPage = async (): Promise<JSX.Element> => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookies().getAll() } },
  )

  const { data: session } = await supabase.auth.getSession()
  const userId = session?.session?.user?.id ?? null

  const allPlaylists = await getPlaylists(userId ?? '')
  const popularPlaylists = await getPopularPlaylists(userId ?? '')

  return (
    <div>
      <h1
        className={clsx(
          'title-1 mb-4 mt-5',
          'desktop: headline-1 desktop:mb-10 desktop:mt-20',
        )}
      >
        인기 있는 플레이리스트
      </h1>
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
                nickName: playlist.nickname?.trim() || 'Anonymous',
              }}
              userId={userId ?? ''}
            />
          ),
        }))}
      />
      <KeywordCarouselWrapper
        allPlaylists={allPlaylists}
        userId={userId ?? ''}
      />
      <FloatingPlusButton />
    </div>
  )
}

export default CommunityPage
