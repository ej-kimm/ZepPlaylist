// 최신발매곡 10곡을 슬라이드 형식으로 보여준다 - 1초 랑 넘어가기 버튼 (ISR)

import { fetchNewReleases } from '@/api/home/actions'
import LatestAlbumItme from './LatestAlbumItem'

// 1시간 간격의 ISR
export const revalidate = 3600

const LatestAlbums = async () => {
  const data = await fetchNewReleases()

  const latestAlbumList = data.albums.items

  return (
    <div className="w-full">
      <h2 className="title-2 mb-4 mt-8">최신 음반</h2>
      <ul className="scroll-invisible flex space-x-4 overflow-x-auto">
        {latestAlbumList.map((album) => (
          <LatestAlbumItme album={album} key={album.id} />
        ))}
      </ul>
    </div>
  )
}

export default LatestAlbums
