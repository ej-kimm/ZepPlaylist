import { fetchSearchArtist, fetchSearchTracks } from '@/api/home/actions'
import SearchResultItem from './SearchResultItem'

const SearchResult = async ({ searchParams }: { searchParams: string }) => {
  const searchResult = await fetchSearchTracks(searchParams)
  const searchResultList = searchResult!.tracks.items

  const searchResultArtists = async () => {
    const artists = searchResultList.map((artist) => artist.artists[0].name)
    const artistName = artists.reduce(
      (acc, value) => (acc.includes(value) ? acc : [...acc, value]),
      [] as string[],
    )

    const artistData = await fetchSearchArtist(artistName[0])

    return artistData.artists.items
  }
  return (
    <SearchResultItem
      searchParams={searchParams}
      searchResultList={searchResultList}
      searchResultArtists={await searchResultArtists()}
    />
  )
}

export default SearchResult
