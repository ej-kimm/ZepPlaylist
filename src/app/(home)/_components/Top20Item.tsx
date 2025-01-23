import playing from '@/assets/images/play.svg'
import { useSpotifySearch } from '@/hooks/useGetSpotifyMusicId'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
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

  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()

  const { upsertMusic } = usePlaylistMusicUpsert()

  const handlePlayBtn = async () => {
    // 데이터 일치화를 위해 ()와 안의 텍스트 제거
    const newMusicName = musicName.replace(/\s*\(.*?\)\s*/g, '')
    const newArtistiName = artistName.replace(/\s*\(.*?\)\s*/g, '')

    const musicData = await searchSpotifyId(newMusicName, newArtistiName)
    await upsertMusic(musicData!)
    const songId = musicData!.id
    if (!isPlayerOpen) setPlayerOpen() // 페이지 방문 후, 첫 곡 재생이면 플레이어바 보여줌
    setTrackIds(songId)
    play()
  }
  return (
    <li
      onClick={() => handlePlayBtn()}
      className="flex h-16 w-64 flex-shrink-0 items-center space-x-3 rounded-lg p-2 shadow-[inset_0_4px_4px_rgba(255,255,255,0.25),0_4px_10px_rgba(0,0,0,0.04)] transition-colors"
    >
      <div className="relative flex-shrink-0">
        <Image
          src={albumCover}
          alt={musicName}
          width={44}
          height={44}
          className="rounded-lg object-cover"
          priority
        />
      </div>

      <p className="truncate text-base">{index + 1}</p>
      <div className="min-w-0 flex-1 overflow-hidden">
        <h3 className="truncate text-base font-medium text-gray-900">
          {musicName}
        </h3>
        <p className="truncate text-xs text-gray-500">{artistName}</p>
      </div>
      <button type="button">
        <Image
          // src={isPlaying ? pause : playing}
          src={playing}
          width={25}
          height={25}
          alt={'play'}
        />
      </button>
    </li>
  )
}

export default Top20Item
