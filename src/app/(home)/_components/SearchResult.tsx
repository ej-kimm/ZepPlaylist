import { fetchSearchTracks } from '@/api/home/actions'
import Image from 'next/image'

const SearchResult = async ({ searchParams }: { searchParams: string }) => {
  const searchResult = await fetchSearchTracks(searchParams)

  const searchResultList = searchResult!.tracks.items

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-3 text-2xl font-bold">{searchParams} 검색 결과</h1>
      <ul>
        {searchResultList.map((item) => (
          <li
            className="flex items-center space-x-4 rounded-lg p-3 transition-colors"
            key={item.id}
          >
            <div className="relative flex-shrink-0">
              <Image
                src={item.album.images[0].url}
                alt={item.album.name}
                width={50}
                height={50}
                className="rounded-md"
                priority
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-medium text-gray-900">
                {item.name}
              </h3>
              <p className="truncate text-sm text-gray-500">
                {item.artists[0].name}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchResult
