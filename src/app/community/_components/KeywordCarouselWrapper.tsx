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
        updatedKeywords.some(
          (key) =>
            playlist.name.toLowerCase().includes(key.toLowerCase()) // 대소문자 무시
        ),
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
        {filteredPlaylists.length > 0 ? (
          <ul>
            {filteredPlaylists.map((playlist) => (
              <li key={playlist.id}>
                <div className="flex items-center gap-4">
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>해당 키워드에 해당하는 플레이리스트가 없습니다.</p>
        )}
      </div>
  )
}

export default KeywordCarouselWrapper
