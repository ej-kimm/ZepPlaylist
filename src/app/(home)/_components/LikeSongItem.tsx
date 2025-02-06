import playing from '@/assets/images/imPlay.svg'
import useIsDesktop from '@/hooks/useIsDesktop'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import type { UserLikedSongDetails } from '@/types/LikedSongs'
import clsx from 'clsx'
import Image from 'next/image'

interface SongItemProps {
  item: UserLikedSongDetails
  key?: string
}

const LikeSongItem = ({ item }: SongItemProps) => {
  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()
  const isDesktop = useIsDesktop()

  const handlePlayBtn = (palyTrackId: string) => {
    if (!isPlayerOpen) setPlayerOpen() // 페이지 방문 후, 첫 곡 재생이면 플레이어바 보여줌
    setTrackIds(palyTrackId)
    play()
  }

  return (
    <li
      className="flex-none cursor-pointer"
      onClick={() => handlePlayBtn(item.spotify_id!)}
      key={item.spotify_id}
    >
      <div
        className={clsx(
          'h-[120px] w-[120px] text-left',
          'desktop:h-[200px] desktop:w-[200px]',
        )}
      >
        <div className="relative">
          <div
            className={clsx(
              'relative h-[120px] w-[120px] overflow-hidden rounded-2xl shadow-md',
              'desktop:h-[200px] desktop:w-[200px]',
            )}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_58.33%,rgba(0,0,0,0.45)_79.17%,rgba(0,0,0,0.50)_100%)]" />

            {/* 앨범 커버 이미지 */}
            <Image
              src={item.album_cover!}
              width={isDesktop ? 200 : 120}
              height={isDesktop ? 200 : 120}
              alt={item.title!}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          {/* 곡 제목, 아티스트 */}
          <div className="absolute bottom-1 left-3 mb-1 w-[calc(100%-40px)] transform">
            <h3
              className={clsx(
                'caption-1 truncate text-white',
                'desktop:title-1 desktop:font-normal desktop:text-white',
              )}
            >
              {item.title}
            </h3>
            <p
              className={clsx(
                'caption-2 truncate text-white text-opacity-80',
                'desktop:body-1 desktop:font-normal desktop:text-white desktop:text-opacity-80',
              )}
            >
              {item.artist}
            </p>
          </div>

          {/* 플레이 버튼 */}
          <button
            className="absolute bottom-[11px] right-[11px] transform"
            type="button"
          >
            <Image
              src={playing}
              width={isDesktop ? 18 : 16}
              height={isDesktop ? 18 : 16}
              alt={'play'}
            />
          </button>
        </div>
      </div>
    </li>

    // <li className="flex-none" onClick={() => handlePlayBtn(item.spotify_id!)}>
    //   <div className="h-[120px] w-[120px] text-left">
    //     <div className="relative">
    //       <Image
    //         src={item.album_cover!}
    //         width={120}
    //         height={120}
    //         alt={item.title!}
    //         priority
    //         className="h-auto w-full rounded-2xl shadow-md"
    //       />
    //       <div className="w-full bg-gradient-to-b from-white via-black">
    //         <div className="absolute bottom-1 left-3 mb-1 w-[calc(100%-40px)] transform">
    //           <h3 className="caption-1 truncate text-white">{item.title}</h3>
    //           <p className="caption-2 truncate text-white text-opacity-80">
    //             {item.artist}
    //           </p>
    //         </div>

    //         <button
    //           className="absolute bottom-[11px] right-[11px] transform"
    //           type="button"
    //         >
    //           <Image src={playing} width={16} height={16} alt={'play'} />
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </li>
  )
}

export default LikeSongItem
