'use client'

import KeywordCarousel from '@/components/keywords/keywordCarousel'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'

type FormValues = {
  search: string
}

export function SearchBar() {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const { register, handleSubmit, setValue } = useForm<FormValues>()

  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])

  const performSearch = useDebouncedCallback((searchTerm: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (searchTerm) {
      params.set('q', searchTerm)
    } else {
      params.delete('q')
    }
    replace(`/search?${params.toString()}`)
  }, 300)

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) => {
      const newKeywords = prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]

      // 키워드 토글 후 즉시 검색 실행
      const searchTerm = newKeywords.join(' ')
      setValue('search', searchTerm)
      performSearch(searchTerm)

      return newKeywords
    })
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    performSearch(data.search)
  }

  useEffect(() => {
    // URL의 검색어를 입력 필드에 설정
    const searchQuery = searchParams.get('q')
    if (searchQuery) {
      setValue('search', searchQuery)
      setSelectedKeywords(searchQuery.split(' '))
    }
  }, [searchParams, setValue])

  return (
    <>
      <div className="max-auto relative m-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            id="search-input"
            {...register('search')}
            type="text"
            placeholder="검색어를 입력하세요"
            className="h-10 w-full rounded-lg bg-gray-100 pl-4 pr-10 text-sm focus:outline-none"
          />
          <button
            type="submit"
            aria-label="검색"
            className="absolute inset-y-0 right-2 flex items-center pl-3"
          >
            <svg
              className="h-5 w-5 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
      </div>
      <div>
        <KeywordCarousel
          selectedKeywords={selectedKeywords}
          onToggleKeyword={toggleKeyword}
        />
      </div>
    </>
  )
}
