import Charts from './_components/Charts'
import LatestAlbums from './_components/LatestAlbums'
import { SearchBar } from './_components/SearchBar'

export default function Home() {
  return (
    <>
      <SearchBar />
      <LatestAlbums />
      <Charts />
    </>
  )
}
