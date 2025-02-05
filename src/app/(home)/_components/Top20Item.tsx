import playing from '@/assets/images/play.svg'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import type { Charts, SpotifyTrack } from '@/types/billboradCharts'
import Image from 'next/image'

type Top20ItemProps = {
  chartList: Charts[]
}

const Top20Item: React.FC<Top20ItemProps> = ({ chartList }) => {
  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()
  const { upsertMusic } = usePlaylistMusicUpsert()

  const handlePlayBtn = async (musicData: SpotifyTrack) => {
    await upsertMusic(musicData!)
    if (!isPlayerOpen) setPlayerOpen() // 페이지 방문 후, 첫 곡 재생이면 플레이어바 보여줌
    setTrackIds(musicData.id)
    play()
  }

  return (
    <ul className="scroll-invisible grid auto-cols-auto grid-flow-col grid-rows-4 gap-2 overflow-x-auto">
      {chartList.map((chart, index) => (
        <li
          key={chart.spotify_id}
          onClick={() =>
            handlePlayBtn({
              id: chart.spotify_id,
              title: chart.title,
              artist: chart.artist,
              playTime: chart.play_time,
              albumCover: chart.album_cover,
              albumName: chart.album_name,
            })
          }
          className="flex h-[60px] w-[315px] flex-shrink-0 items-center space-x-3 rounded-lg p-2 shadow-[inset_0_4px_4px_rgba(255,255,255,0.25),0_4px_10px_rgba(0,0,0,0.04)] transition-colors"
        >
          <div className="relative flex-shrink-0">
            <Image
              src={chart.album_cover}
              alt={chart.title}
              width={44}
              height={44}
              className="rounded-lg object-cover"
              priority
            />
          </div>

          <p className="body-1 truncate">{index + 1}</p>
          <div className="min-w-0 flex-1 overflow-hidden">
            <h3 className="body-2 mb-[2px] truncate">{chart.title}</h3>
            <p className="caption-2 truncate text-opacity-60">{chart.artist}</p>
          </div>
          <button type="button">
            <Image
              // src={isPlaying ? pause : playing}
              src={playing}
              width={24}
              height={24}
              alt={'play'}
            />
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Top20Item
