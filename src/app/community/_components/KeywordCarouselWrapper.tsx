'use client'

import PlaylistSection from '@/app/community/_components/PlaylistSection'
import { KeywordCarousel } from '@/components/common'
import { useState } from 'react'

type Playlist = {
  id: string
  name: string
  likedByUser?: boolean
  profile_image: string | null
  nickname: string | null
  keyword: string
  likeCount: number
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
      const keywordFilteredPlaylists = allPlaylists.filter((playlist) => {
        const playlistKeywords = playlist.keyword
          .split(',')
          .map((k) => k.trim())
        return updatedKeywords.some((key) => playlistKeywords.includes(key))
      })
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
      <PlaylistSection userId={userId} playlists={filteredPlaylists} />
    </div>
  )
}

export default KeywordCarouselWrapper
