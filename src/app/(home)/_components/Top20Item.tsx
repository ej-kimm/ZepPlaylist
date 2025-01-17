import play from '@/assets/images/play.svg'
import { useSpotifySearch } from '@/hooks/useGetSpotifyMusicId'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import type { BillboradSong } from '@/types/billboradCharts'
import type { MelonChartSong } from '@/types/melonCharts'
import Image from 'next/image'

type Top20ItemProps = {
  chart: MelonChartSong | BillboradSong
  index: number
  musicName: string
  artistName: string
  albumCover: string
}

const Top20Item: React.FC<Top20ItemProps> = ({
  index,
  musicName,
  artistName,
  albumCover,
}) => {
  const { searchSpotifyId } = useSpotifySearch()
  const { isPlayerOpen, setTrackIds, togglePlay, setPlayerOpen } =
    useMusicPlayerStore()

  const handlePlayBtn = async () => {
    const data = await searchSpotifyId(musicName, artistName)
    const songId = data!.id
    if (!isPlayerOpen) setPlayerOpen() // 페이지 방문 후, 첫 곡 재생이면 플레이어바 보여줌
    setTrackIds(songId)
    togglePlay()
  }
  return (
    <li
      onClick={() => handlePlayBtn()}
      className="flex h-16 w-64 flex-shrink-0 items-center space-x-3 rounded-lg p-2 shadow-xl transition-colors"
    >
      <div className="relative flex-shrink-0">
        <Image
          src={albumCover}
          alt={musicName}
          width={40}
          height={40}
          className="rounded-md object-cover"
          priority
        />
      </div>

      <p className="truncate text-lg">{index + 1}</p>
      <div className="min-w-0 flex-1 overflow-hidden">
        <h3 className="truncate text-sm font-medium text-gray-900">
          {musicName}
        </h3>
        <p className="truncate text-xs text-gray-500">{artistName}</p>
      </div>
      <button type="button">
        <Image src={play} width={25} height={25} alt={'play'} />
      </button>
    </li>
  )
}

export default Top20Item
