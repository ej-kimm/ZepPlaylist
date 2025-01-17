import { Suspense } from 'react'
import Charts from './_components/Charts'
import LatestAlbums from './_components/LatestAlbums'
import { SearchBar } from './_components/SearchBar'

export default function Home() {
  return (
    <>
      {/* TODO : Suspense 바꾸기.... */}
      <Suspense fallback={<p>Loading...</p>}>
        <SearchBar />
      </Suspense>
      <LatestAlbums />
      <Charts />
    </>
  )
}
