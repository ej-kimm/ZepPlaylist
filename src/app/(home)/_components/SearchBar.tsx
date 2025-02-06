'use client'

import Modal from '@/components/common/Modal'
import clsx from 'clsx'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import SearchKeywordCarousel from './SearchKeywordCarousel'

type FormValues = {
  search: string
}

export function SearchBar() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const { register, handleSubmit, setValue } = useForm<FormValues>()
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    message: string
  }>({
    isOpen: false,
    message: '',
  })

  const performSearch = useDebouncedCallback((searchTerm: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (searchTerm.trim() === '') {
      setModalState({ isOpen: true, message: '검색어를 입력해주세요!' })
    } else if (searchTerm.trim().length < 2) {
      setModalState({
        isOpen: true,
        message: '검색어는 2글자 이상이어야 합니다.',
      })
    } else {
      params.set('q', searchTerm.trim())
      router.push(`/search?${params.toString()}`)
    }
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
    <div
      className={clsx(
        isHomePage &&
          'desktop:flex desktop:h-[calc(406px-66px)] desktop:items-center desktop:justify-center desktop:bg-transparent',
      )}
    >
      <div
        className={clsx(isHomePage && 'desktop:h-[111px] desktop:w-[701px]')}
      >
        <div
          className={clsx(
            'relative',
            'desktop:mr-0',
            isHomePage && 'desktop:mb-6',
          )}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              id="search-input"
              {...register('search')}
              type="text"
              placeholder="검색어를 입력하세요"
              className="h-10 w-full rounded-lg bg-gray-100 px-2 text-sm focus:outline-none"
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
          <SearchKeywordCarousel
            selectedKeywords={selectedKeywords}
            onToggleKeyword={toggleKeyword}
          />
        </div>
      </div>
      <Modal
        isOpen={modalState.isOpen}
        title="검색"
        className="desktop:w-[434px]"
        content={modalState.message}
        type="single"
        onConfirm={() => setModalState({ isOpen: false, message: '' })}
        onCancel={() => setModalState({ isOpen: false, message: '' })}
      />
    </div>
  )
}
