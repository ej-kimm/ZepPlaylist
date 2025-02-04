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
      <div className="h-64 w-36 text-left">
        <div className="relative">
          <Image
            src={item.album_cover!}
            width={120}
            height={120}
            alt={item.title!}
            priority
            className="h-auto w-full rounded-2xl shadow-md"
          />
          <div className="w-full bg-gradient-to-b from-white via-black">
            <div className="absolute bottom-1 left-3 mb-1 w-[calc(100%-40px)] transform">
              <h3 className="mt-2 truncate text-xs text-white">{item.title}</h3>
              <p className="truncate text-xs text-white">{item.artist}</p>
            </div>

            <button
              className="absolute bottom-1 right-1 transform"
              type="button"
            >
              <Image src={playing} width={25} height={25} alt={'play'} />
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default LikeSongItem
