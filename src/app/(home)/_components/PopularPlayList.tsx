import { getPopularPlaylists } from '@/api/community/actions'
import ClientPopularPlaylistUI from '@/app/community/_components/ClientPopularPlaylistUI'
import CustomSwiper from '@/app/community/_components/CustomSwiper'
import defaultProfileImg from '@/assets/images/defaultProfileImg.png'
import rightArrow from '@/assets/images/rightArrow.svg'
import { createServerClient } from '@supabase/ssr'
import clsx from 'clsx'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

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
    <div className="flex flex-wrap gap-4">
      <div className="flex w-full justify-between">
        <h1
          className={clsx(
            'title-2 flex justify-start',
            'desktop:title-3 desktop:mb-10',
          )}
        >
          인기 플레이리스트
        </h1>
        <Link
          href={'/community'}
          className={clsx('desktop: caption-4 flex h-5 justify-end gap-1')}
        >
          더보기
          <Image src={rightArrow} height={16} width={16} alt=">" />
        </Link>
      </div>
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
        maxSlides={6}
      />
    </div>
  )
}

export default PopularPlayList
