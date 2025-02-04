'use client'

import moreButton from '@/assets/images/moreButton.svg'
import { MusicSaveBottomSheet } from '@/components/common'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import { useSearchHistory } from '@/hooks/useSearchHistoryItem'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import type { SpotifyTrack } from '@/types/billboradCharts'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type SearchResultProps = {
  searchParams: string
  searchResultList: SpotifyApi.TrackObjectFull[]
  searchResultArtists: SpotifyApi.ArtistObjectFull[]
}

// type SearchHistoryItem = {
//   query: string
//   expirationDate: number
// }

const SearchResultItem = ({
  searchParams,
  searchResultList,
  searchResultArtists,
}: SearchResultProps) => {
  const { saveSearchHistory } = useSearchHistory()

  useEffect(() => {
    saveSearchHistory(searchParams)
  }, [searchParams])

  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()
  const { upsertMusic } = usePlaylistMusicUpsert()

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)
  const [selectedSong, setSelectedSong] = useState<SpotifyTrack>()
  console.log(selectedSong)

  const handlePlayBtn = async (newMusicData: SpotifyTrack) => {
    await upsertMusic(newMusicData)
    if (!isPlayerOpen) setPlayerOpen() // 페이지 방문 후, 첫 곡 재생이면 플레이어바 보여줌
    setTrackIds(newMusicData!.spotify_id)
    play()
  }

  const handleMoreButtonClick = (song: SpotifyTrack) => {
    setSelectedSong(song)
    setIsBottomSheetOpen(true)
  }

  return (
    <>
      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <h1 className="title-1 mb-3 pt-5">{searchParams} 검색 결과</h1>

        <div>
          <h2 className="title-2 flex pb-6 font-bold">가수</h2>
          <div className="flex flex-col gap-2">
            <Image
              src={searchResultArtists[0].images[0].url}
              alt={searchResultArtists[0].name}
              width={80}
              height={80}
              className="rounded-full"
              priority
            />
            <p className="caption-1">{searchResultArtists[0].name}</p>
          </div>
        </div>
        <div>
          <h2 className="title-2 mt-3">곡</h2>
          <ul>
            {searchResultList.map((item) => (
              <li
                className="flex items-center gap-4 rounded-lg py-2 transition-colors"
                key={item.id}
              >
                <div
                  className="flex-shrink-0 cursor-pointer"
                  onClick={() =>
                    handlePlayBtn({
                      spotify_id: item.id,
                      title: item.name,
                      artist: item.artists[0].name,
                      play_time: item.duration_ms,
                      album_cover: item.album.images[0].url,
                      album_name: item.album.name,
                    })
                  }
                >
                  <Image
                    src={item.album.images[0].url}
                    alt={item.album.name}
                    width={44}
                    height={44}
                    className="rounded-md"
                    priority
                  />
                </div>
                <div
                  className="flex min-w-0 flex-1 cursor-pointer flex-col gap-1"
                  onClick={() =>
                    handlePlayBtn({
                      spotify_id: item.id,
                      title: item.name,
                      artist: item.artists[0].name,
                      play_time: item.duration_ms,
                      album_cover: item.album.images[0].url,
                      album_name: item.album.name,
                    })
                  }
                >
                  <h3 className="button-2 truncate">{item.name}</h3>
                  <p className="caption-2 truncate opacity-60">
                    {item.artists[0].name}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleMoreButtonClick({
                      spotify_id: item.id,
                      title: item.name,
                      artist: item.artists[0].name,
                      play_time: item.duration_ms,
                      album_cover: item.album.images[0].url,
                      album_name: item.album.name,
                    })
                  }}
                >
                  <Image
                    src={moreButton}
                    alt="More Options"
                    width={24}
                    height={24}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
        {selectedSong && (
          <MusicSaveBottomSheet
            isOpen={isBottomSheetOpen}
            handleClose={() => setIsBottomSheetOpen(false)}
            musicData={selectedSong!}
          />
        )}
      </div>
    </>
  )
}

export default SearchResultItem
