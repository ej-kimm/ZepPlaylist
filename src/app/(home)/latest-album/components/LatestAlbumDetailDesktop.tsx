import whitePlay from '@/assets/images/whitePlay.svg'
import TableList from '@/components/common/Tableilst'
import Image from 'next/image'

type LatestAlbumProps = {
  albumData: SpotifyApi.SingleAlbumResponse
  albumTrackData: SpotifyApi.TrackObjectSimplified[]
  handlePlayAll: () => void
  formatTime: (milliseconds: number) => string
  totalPlayTimeMilliseconds: number
}

function LatestAlbumDetailDesktop({
  albumData,
  albumTrackData,
  handlePlayAll,
  formatTime,
  totalPlayTimeMilliseconds,
}: LatestAlbumProps) {
  console.log(albumTrackData)

  return (
    <>
      <div className="flex items-center gap-10">
        <div className="mt-[60px">
          <div className="relative w-[375px] py-3">
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
        </div>
        <div className="items-between flex flex-col justify-between gap-[18px]">
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
      <div className="mt-40">
        <button
          onClick={handlePlayAll}
          className="flex w-[65px] items-center gap-1"
        >
          <Image src={whitePlay} alt="전체 재생" width={16} height={16} />
          <p className="text-xs font-normal">전체 재생</p>
        </button>
      </div>
      <TableList items={albumTrackData} />
    </>
  )
}

export default LatestAlbumDetailDesktop
