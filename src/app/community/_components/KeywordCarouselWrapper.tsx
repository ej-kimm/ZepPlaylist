'use client'

import KeywordCarousel from '@/components/keywords/keywordCarousel'
import { useState } from 'react'

type Playlist = {
  id: string
  name: string
  likeCount: number
  likedByUser?: boolean
  profile_image: string | null
  nickname: string | null
}

type KeywordCarouselWrapperProps = {
  allPlaylists: Playlist[]
  userId: string
}

const KeywordCarouselWrapper = ({
  allPlaylists,
}: KeywordCarouselWrapperProps) => {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
  const [filteredPlaylists, setFilteredPlaylists] =
    useState<Playlist[]>(allPlaylists)

  const handleToggleKeyword = (keyword: string) => {
    const updatedKeywords = selectedKeywords.includes(keyword)
      ? selectedKeywords.filter((k) => k !== keyword)
      : [...selectedKeywords, keyword]

    setSelectedKeywords(updatedKeywords)

    if (updatedKeywords.length === 0) {
      setFilteredPlaylists(allPlaylists)
    } else {
      const keywordFilteredPlaylists = allPlaylists.filter((playlist) =>
        updatedKeywords.some((key) => playlist.name.includes(key)),
      )
      setFilteredPlaylists(keywordFilteredPlaylists)
    }
  }

  return (
    <div>
      <h1 className="title-1 mt-4">플레이리스트</h1>
      <KeywordCarousel
        selectedKeywords={selectedKeywords}
        onToggleKeyword={handleToggleKeyword}
      />
    </div>
  )
}

export default KeywordCarouselWrapper
