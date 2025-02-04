'use client'

import PlaylistSection from '@/app/community/_components/PlaylistSection'
import { KeywordCarousel } from '@/components/common'
import type { CommunityPlaylist } from '@/types/communityPlaylists'
import clsx from 'clsx'
import { useState } from 'react'

type KeywordCarouselWrapperProps = {
  allPlaylists: CommunityPlaylist[]
  userId: string
}

const KeywordCarouselWrapper = ({
  allPlaylists,
  userId,
}: KeywordCarouselWrapperProps) => {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
  const [filteredPlaylists, setFilteredPlaylists] =
    useState<CommunityPlaylist[]>(allPlaylists)

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
      <h1
        className={clsx(
          'title-1 mt-4',
          'desktop:headline-1 desktop:mb-10 desktop:mt-20',
        )}
      >
        플레이리스트
      </h1>
      <KeywordCarousel
        selectedKeywords={selectedKeywords}
        onToggleKeyword={handleToggleKeyword}
      />
      <PlaylistSection userId={userId} playlists={filteredPlaylists} />
    </div>
  )
}

export default KeywordCarouselWrapper
