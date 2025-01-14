'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'

type FormValues = {
  search: string
}

export function SearchBar() {
  const searchParams = useSearchParams() // 현재 URL의 쿼리 파라미터
  const { replace } = useRouter()
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = useDebouncedCallback((data) => {
    const params = new URLSearchParams(searchParams.toString())
    console.log(data.search)

    if (data.search) {
      params.set('q', data.search)
    } else {
      params.delete('q')
    }

    replace(`/search?${params.toString()}`)
  }, 300)

  // const handleChange = useDebouncedCallback((value: string) => {
  //   const params = new URLSearchParams(searchParams.toString())
  //   if (value) {
  //     params.set('q', value)
  //   } else {
  //     params.delete('q')
  //   }
  //   replace(`${pathname}?${params.toString()}`)
  // }, 300)

  return (
    <div className="max-auto relative m-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          id="search-input"
          {...register('search')}
          type="text"
          placeholder="검색어를 입력하세요"
          // onChange={(e) => handleChange(e.target.value)}
          defaultValue={searchParams.get('q')?.toString()} // 이전 검색어 기억
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
  )
}
