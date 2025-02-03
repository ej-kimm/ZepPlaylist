import { useEffect, useState } from 'react'

interface SearchHistoryItem {
  query: string
  expirationDate: number
}

const MAX_HISTORY_LENGTH = 10
const EXPIRATION_DAYS = 7

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const saveSearchHistory = (searchParams: string) => {
    const history: SearchHistoryItem[] = JSON.parse(
      localStorage.getItem('searchHistory') || '[]',
    )

    const expirationDate =
      new Date().getTime() + EXPIRATION_DAYS * 24 * 60 * 60 * 1000

    const newItem: SearchHistoryItem = {
      query: searchParams,
      expirationDate: expirationDate,
    }

    const updatedHistory = [
      newItem,
      ...history.filter((item) => item.query !== searchParams),
    ].slice(0, MAX_HISTORY_LENGTH)

    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory))
    setSearchHistory(updatedHistory.map((item) => item.query))
  }

  const getSearchHistory = (): string[] => {
    const history: SearchHistoryItem[] = JSON.parse(
      localStorage.getItem('searchHistory') || '[]',
    )
    const currentTime = new Date().getTime()

    const validHistory = history
      .filter((item) => item.expirationDate > currentTime)
      .map((item) => item.query)

    if (validHistory.length < history.length) {
      localStorage.setItem(
        'searchHistory',
        JSON.stringify(
          validHistory.map((query) => ({
            query,
            expirationDate: history.find((item) => item.query === query)!
              .expirationDate,
          })),
        ),
      )
    }

    setSearchHistory(validHistory)
    return validHistory
  }

  useEffect(() => {
    getSearchHistory()
  }, [])

  return { searchHistory, saveSearchHistory, getSearchHistory }
}
