// 최신발매곡 10곡을 슬라이드 형식으로 보여준다 - 1초 랑 넘어가기 버튼 (ISR)

import { fetchNewReleases } from '@/api/home/actions'
import clsx from 'clsx'
import LatestAlbumItmes from './LatestAlbumItmes'

// 1시간 간격의 ISR
export const revalidate = 3600

const LatestAlbums = async () => {
  const data = await fetchNewReleases()

  const latestAlbumList = data.albums.items

  return (
    <div className="w-full">
      <h2 className={clsx('title-2 mb-4')}>최신 음반</h2>
      <LatestAlbumItmes latestAlbumList={latestAlbumList} />
    </div>
  )
}

export default LatestAlbums
