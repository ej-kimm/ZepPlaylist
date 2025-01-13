'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
// import { useDebouncedCallback } from 'use-debounce'

export function SearchBar() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  //   const handleSearch = useDebouncedCallback((term: string) => {
  //     const params = new URLSearchParams(searchParams)
  //     if (term) {
  //       params.set('query', term)
  //     } else {
  //       params.delete('query')
  //     }
  //     replace(`${pathname}?${params.toString()}`)
  //   }, 300)

  return (
    <input
      type="text"
      placeholder="검색어를 입력하세요"
      //   onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get('query')?.toString()}
    />
  )
}
