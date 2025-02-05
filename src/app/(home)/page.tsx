import clsx from 'clsx'
import { Suspense } from 'react'
import Charts from './_components/Charts'
import LatestAlbums from './_components/LatestAlbums'
import PopularPlayList from './_components/PopularPlayList'
import { SearchBar } from './_components/SearchBar'
import UserLikedSong from './_components/UserLikedSong'
export default async function Home() {
  return (
    <>
      {/* TODO : Suspense 바꾸기.... */}
      <Suspense fallback={<p>Loading...</p>}>
        <SearchBar />
      </Suspense>
      <div
        className={
          clsx('mb-[34px] mt-5 flex flex-col gap-5')
          // 'desktop:gap-[120px] desktop:mt-[80px] desktop:mb-[85px] desktop:max-w-[1200px] flex',
        }
      >
        <LatestAlbums />
        <Charts />
        <UserLikedSong />
        <PopularPlayList />
      </div>
    </>
  )
}
