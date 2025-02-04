'use client'

import { useSearchHistory } from '@/hooks/useSearchHistoryItem'

const SearchHistoryPlaylist = () => {
  const { searchHistory } = useSearchHistory()
  console.log(searchHistory)
  return <div>SearchHistoryPlaylist</div>
}

export default SearchHistoryPlaylist
