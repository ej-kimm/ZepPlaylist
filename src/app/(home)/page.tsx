import { Suspense } from 'react'
import Charts from './_components/Charts'
import LatestAlbums from './_components/LatestAlbums'
import PopularPlayList from './_components/PopularPlayList'
import { SearchBar } from './_components/SearchBar'
import UserLikedSong from './_components/UserLikedSong'
export default function Home() {
  return (
    <>
      {/* TODO : Suspense 바꾸기.... */}
      <Suspense fallback={<p>Loading...</p>}>
        <SearchBar />
      </Suspense>
      <LatestAlbums />
      <Charts />
      <UserLikedSong />
      <PopularPlayList />
    </>
  )
}
