'use client'

import PlaylistSection from '@/app/community/_components/PlaylistSection'
import KeywordCarousel from '@/components/keywords/keywordCarousel'
import { useState } from 'react'

type Playlist = {
  id: string
  name: string
  likeCount: number
  likedByUser?: boolean
}

type KeywordCarouselWrapperProps = {
  allPlaylists: Playlist[]
  userId: string
}

const KeywordCarouselWrapper = ({
  allPlaylists,
  userId,
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
      <KeywordCarousel
        selectedKeywords={selectedKeywords}
        onToggleKeyword={handleToggleKeyword}
      />
      <h1 className="mb-4 mt-8 text-2xl font-bold">전체 플레이리스트</h1>
      <PlaylistSection playlists={filteredPlaylists} userId={userId} />
    </div>
  )
}

export default KeywordCarouselWrapper
