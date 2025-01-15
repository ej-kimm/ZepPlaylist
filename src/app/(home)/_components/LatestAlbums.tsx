// 최신발매곡 10곡을 슬라이드 형식으로 보여준다 - 1초 랑 넘어가기 버튼 (ISR)

import { fetchNewReleases } from '@/api/home/actions'
import Image from 'next/image'

// 1시간 간격의 ISR
export const revalidate = 3600

const LatestAlbums = async () => {
  const data = await fetchNewReleases()

  const latestAlbumList = data.albums.items

  return (
    <div className="w-full">
      <h2 className="my-4">최신 음반</h2>
      <ul className="flex space-x-4 overflow-x-auto">
        {latestAlbumList.map((album) => (
          <li key={album.id} className="flex-none">
            <div className="w-32 text-left">
              <Image
                src={album.images[0].url}
                width={100}
                height={100}
                alt={album.name}
                priority
                className="h-auto w-full rounded-lg shadow-md"
              />
              <h3 className="mt-2 truncate text-sm font-semibold">
                {album.name}
              </h3>
              <p className="truncate text-xs text-gray-500">
                {album.artists[0].name}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {/* <LatestAlbumItmes latestAlbumList={latestAlbumList} /> */}
    </div>
  )
}

export default LatestAlbums
