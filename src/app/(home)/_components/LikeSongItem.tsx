import playing from '@/assets/images/imPlay.svg'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import type { UserLikedSongDetails } from '@/types/LikedSongs'
import Image from 'next/image'

interface SongItemProps {
  item: UserLikedSongDetails
  key?: string
}

const LikeSongItem: React.FC<SongItemProps> = ({ item }) => {
  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()

  const handlePlayBtn = (palyTrackId: string) => {
    if (!isPlayerOpen) setPlayerOpen() // 페이지 방문 후, 첫 곡 재생이면 플레이어바 보여줌
    setTrackIds(palyTrackId)
    play()
  }

  return (
    <li className="flex-none" onClick={() => handlePlayBtn(item.spotify_id!)}>
      <div className="h-[120px] w-[120px] text-left">
        <div className="relative">
          <div className="relative h-[120px] w-[120px] overflow-hidden rounded-2xl shadow-md">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_58.33%,rgba(0,0,0,0.45)_79.17%,rgba(0,0,0,0.50)_100%)]" />

            {/* 앨범 커버 이미지 */}
            <Image
              src={item.album_cover!}
              width={120}
              height={120}
              alt={item.title!}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          {/* 곡 제목, 아티스트 */}
          <div className="absolute bottom-1 left-3 mb-1 w-[calc(100%-40px)] transform">
            <h3 className="caption-1 truncate text-white">{item.title}</h3>
            <p className="caption-2 truncate text-white text-opacity-80">
              {item.artist}
            </p>
          </div>

          {/* 플레이 버튼 */}
          <button
            className="absolute bottom-[11px] right-[11px] transform"
            type="button"
          >
            <Image src={playing} width={16} height={16} alt={'play'} />
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
