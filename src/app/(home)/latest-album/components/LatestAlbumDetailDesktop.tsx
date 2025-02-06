import communityWebCircle from '@/assets/images/plusLightButton.svg'
import whitePlay from '@/assets/images/whitePlay.svg'
import TableList from '@/components/common/Tableilst'
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

function LatestAlbumDetailDesktop({
  albumData,
  albumTrackData,
  handlePlayAll,
  formatTime,
  totalPlayTimeMilliseconds,
  handlePlayBtn,
  handleMoreButtonClick,
}: LatestAlbumProps) {
  const items = albumTrackData.map((item) => ({
    spotify_id: item.id,
    title: item.name,
    artist: item.artists[0].name,
    album_cover: albumData.images[0].url,
    album_name: albumData.name,
  }))

  return (
    <>
      <div className="mt-[60px] flex gap-10">
        <div className="relative h-[272px] w-[375px]">
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
            className="absolute bottom-0 left-1/2 h-[248px] w-[248px] -translate-x-1/2 transform rounded-xl shadow-lg"
          />
        </div>
        <div className="items-between flex flex-col justify-center gap-[18px]">
          <p className="text-#1B1B1B text-2xl font-semibold">
            {albumData.name}
          </p>
          <p className="text-#1B1B1B text-base font-normal">
            {albumData.artists[0].name}
          </p>

          <p className="text-base">곡 수:{albumData.total_tracks}</p>
          <p>재생 시간: {formatTime(totalPlayTimeMilliseconds)}</p>
          <p className="text-base">발매일자: {albumData.release_date}</p>
        </div>
      </div>
      <div className="mt-10">
        <button
          onClick={handlePlayAll}
          className="flex w-[65px] items-center gap-1"
        >
          <Image src={whitePlay} alt="전체 재생" width={16} height={16} />
          <p className="text-xs font-normal">전체 재생</p>
        </button>
      </div>
      <TableList
        items={items}
        handleItemClick={(index) =>
          handlePlayBtn({
            id: albumTrackData[index].id,
            title: albumTrackData[index].name,
            artist: albumTrackData[index].artists[0].name,
            playTime: albumTrackData[index].duration_ms,
            albumCover: albumData.images[0].url,
            albumName: albumData.name,
          })
        }
        renderAction={(item) => (
          <button
            type="button"
            className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full border-secondary-opacity bg-secondary-opacity"
            onClick={(e) => {
              e.stopPropagation()
              handleMoreButtonClick({
                id: item.spotify_id,
                title: item.title,
                artist: item.artist,
                playTime: 0,
                albumCover: item.album_cover || '',
                albumName: item.album_name || '',
              })
            }}
          >
            <Image
              src={communityWebCircle}
              alt="More Options"
              width={36}
              height={36}
            />
          </button>
        )}
      />
    </>
  )
}

export default LatestAlbumDetailDesktop
