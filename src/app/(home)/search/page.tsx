import { SearchBar } from '../_components/SearchBar'
import SearchResult from '../_components/SearchResult'

type SearchParamProps = {
  searchParams: {
    q: string
  }
}

export default async function Search({ searchParams }: SearchParamProps) {
  const { q } = searchParams
  return (
    <div>
      <SearchBar />
      <SearchResult searchParams={q} />
    </div>
  )
}
