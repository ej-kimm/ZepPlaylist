import imPlay from '@/assets/images/imPlay.svg'
import moreButton from '@/assets/images/moreButton.svg'
import type { SpotifyTrack } from '@/types/billboradCharts'
import Image from 'next/image'

type LatestAlbumProps = {
  albumData: SpotifyApi.SingleAlbumResponse
  albumTrackData: SpotifyApi.TrackObjectSimplified[]
  handlePlayAll: () => void
  formatTime: (milliseconds: number) => string
  totalPlayTimeMilliseconds: number
  handlePlayBtn: (newMusicData: SpotifyTrack) => Promise<void>
  handleMoreButtonClick: (song: SpotifyTrack) => void
}

const LatestAlbumDetailUI = ({
  albumData,
  albumTrackData,
  handlePlayAll,
  formatTime,
  totalPlayTimeMilliseconds,
  handlePlayBtn,
  handleMoreButtonClick,
}: LatestAlbumProps) => {
  return (
    <div>
      <div className="absolute left-0 top-[56px] w-full">
        <Image
          src={albumData.images[0].url}
          alt={albumData.name}
          width={375}
          height={160}
          className="rounded bg-[#E4E4E4] bg-cover bg-center bg-no-repeat object-cover blur-[5px]"
          style={{ width: '375%', height: '160px' }}
        />

        <Image
          src={albumData.images[0].url}
          width={248}
          height={248}
          alt={albumData.name}
          priority
          className="absolute left-1/2 top-[15%] -translate-x-1/2 transform rounded-xl shadow-lg"
        />
      </div>
      <div className="mb-4 mt-[280px] flex flex-col items-start">
        <div className="items-between flex w-[100%] flex-row justify-between">
          <div className="mb-4">
            <p className="text-#1B1B1B text-lg font-semibold">
              {albumData.name}
            </p>
            <p className="text-#1B1B1B text-xs font-normal">
              {albumData.artists[0].name}
            </p>
          </div>
          <button
            onClick={handlePlayAll}
            className="flex items-center justify-center rounded-full"
            style={{
              width: '48px',
              height: '48px',
              padding: '11px',
              borderRadius: '24px',
              background: '#9032E8',
            }}
          >
            <Image
              src={imPlay}
              alt="전체 재생"
              width={24}
              height={24}
              style={{ flexShrink: 0 }}
            />
          </button>
        </div>
        <div className="text-#4A4A4A flex items-center justify-center space-x-1 text-[12px] font-normal">
          <p>곡 수:{albumData.total_tracks}</p>
          <p>재생 시간: {formatTime(totalPlayTimeMilliseconds)}</p>
          <p>발매일자: {albumData.release_date}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {albumTrackData.map((item) => (
          <li key={item.id} className="flex flex-row items-center">
            <div
              className="w-[100%] cursor-pointer rounded-lg py-2 transition-colors"
              onClick={() =>
                handlePlayBtn({
                  id: item.id,
                  title: item.name,
                  artist: item.artists[0].name,
                  playTime: item.duration_ms,
                  albumName: albumData.name,
                  albumCover: albumData.images[0].url,
                })
              }
            >
              <p className="text-#000 text-sm font-semibold">{item.name}</p>
              <p className="text-sm font-normal text-[rgba(0,0,0,0.60)]">
                {item.artists[0].name}
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleMoreButtonClick({
                  id: item.id,
                  title: item.name,
                  artist: item.artists[0].name,
                  playTime: item.duration_ms,
                  albumName: albumData.name,
                  albumCover: albumData.images[0].url,
                })
              }}
            >
              <Image
                src={moreButton}
                alt="More Options"
                width={24}
                height={24}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LatestAlbumDetailUI
