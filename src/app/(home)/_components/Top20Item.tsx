import playing from '@/assets/images/play.svg'
import useIsDesktop from '@/hooks/useIsDesktop'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import type { Charts, SpotifyTrack } from '@/types/billboradCharts'
import clsx from 'clsx'
import Image from 'next/image'

type Top20ItemProps = {
  chartList: Charts[]
}

const Top20Item: React.FC<Top20ItemProps> = ({ chartList }) => {
  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()
  const { upsertMusic } = usePlaylistMusicUpsert()
  const isDesktop = useIsDesktop()

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
          className={clsx(
            'flex h-[60px] w-[315px] flex-shrink-0 cursor-pointer items-center space-x-3 rounded-lg p-2 shadow-[inset_0_4px_4px_rgba(255,255,255,0.25),0_4px_10px_rgba(0,0,0,0.04)] transition-colors',
            'desktop:h-[69px] desktop:w-[357px] desktop:px-3 desktop:py-2',
          )}
        >
          <div className={clsx('relative flex-shrink-0', 'desktop:mr-4')}>
            <Image
              src={chart.album_cover}
              alt={chart.title}
              width={isDesktop ? 53 : 44}
              height={isDesktop ? 53 : 44}
              className="rounded-lg object-cover"
              priority
            />
          </div>

          <p
            className={clsx(
              'body-1 truncate',
              'desktop:body-1 desktop:text-[19px]',
            )}
          >
            {index + 1}
          </p>
          <div
            className={clsx('min-w-0 flex-1 overflow-hidden', 'desktop:pl-3')}
          >
            <h3
              className={clsx('body-2 mb-[2px] truncate', 'desktop:caption-3')}
            >
              {chart.title}
            </h3>
            <p
              className={clsx(
                'caption-2 truncate text-opacity-60',
                'desktop:caption-1 desktop:text-opacity-60',
              )}
            >
              {chart.artist}
            </p>
          </div>
          <button type="button">
            <Image
              src={playing}
              width={isDesktop ? 29 : 24}
              height={isDesktop ? 29 : 24}
              alt={'play'}
            />
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Top20Item
