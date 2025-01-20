import { fetchSearchTracks } from '@/api/home/actions'
import SearchResultItem from './SearchResultItem'

const SearchResult = async ({ searchParams }: { searchParams: string }) => {
  const searchResult = await fetchSearchTracks(searchParams)
  const searchResultList = searchResult!.tracks.items

  console.log('searchResultList', searchResultList)

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-3 pt-5 text-2xl font-bold">{searchParams} 검색 결과</h1>
      <ul>
        {searchResultList.map((item) => (
          <SearchResultItem item={item} key={item.id} />
        ))}
      </ul>
    </div>
  )
}

export default SearchResult
