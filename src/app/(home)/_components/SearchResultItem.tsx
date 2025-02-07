'use client'

import communityWebCircle from '@/assets/images/communityWebCircle.svg'
import moreButton from '@/assets/images/moreButton.svg'
import { MusicSaveBottomSheet, MusicSaveModal } from '@/components/common'
import ScrollTopButton from '@/components/common/ScrollTopButton'
import TableList from '@/components/common/Tableilst'
import useIsDesktop from '@/hooks/useIsDesktop'
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

const SearchResultItem = ({
  searchParams,
  searchResultList,
  searchResultArtists,
}: SearchResultProps) => {
  const { saveSearchHistory } = useSearchHistory()
  const isDesktop = useIsDesktop(720)

  useEffect(() => {
    saveSearchHistory(searchParams)
  }, [searchParams])

  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()
  const { upsertMusic } = usePlaylistMusicUpsert()

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)
  const [selectedSong, setSelectedSong] = useState<SpotifyTrack>()

  const handlePlayBtn = async (newMusicData: SpotifyTrack) => {
    await upsertMusic(newMusicData)
    if (!isPlayerOpen) setPlayerOpen()
    setTrackIds(newMusicData.id)
    play()
  }

  const handleMoreButtonClick = (song: SpotifyTrack) => {
    setSelectedSong(song)
    setIsBottomSheetOpen(true)
  }

  return (
    <div className="mx-auto flex flex-col gap-5">
      <h1 className="title-1 mb-3 pt-5">
        &quot;{searchParams}&quot;으로 검색된 곡
      </h1>
      <div>
        <h2 className="title-2 flex pb-6 font-bold">가수</h2>
        <div className="inline-flex flex-col gap-2">
          <Image
            src={searchResultArtists[0].images[0].url}
            alt={searchResultArtists[0].name}
            width={80}
            height={80}
            className="rounded-full"
            priority
          />
          <span className="caption-1 text-center">
            {searchResultArtists[0].name}
          </span>
        </div>
      </div>

      <div>
        {!isDesktop && <h2 className="title-2 mt-3">곡</h2>}
        {isDesktop ? (
          <>
            <ScrollTopButton />
            <TableList
              items={searchResultList.map((item) => ({
                spotify_id: item.id,
                title: item.name,
                artist: item.artists[0].name,
                album_cover: item.album.images[0].url,
                album_name: item.album.name,
              }))}
              handleItemClick={(index) =>
                handlePlayBtn({
                  id: searchResultList[index].id,
                  title: searchResultList[index].name,
                  artist: searchResultList[index].artists[0].name,
                  playTime: searchResultList[index].duration_ms,
                  albumCover: searchResultList[index].album.images[0].url,
                  albumName: searchResultList[index].album.name,
                })
              }
              renderAction={(item) => (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleMoreButtonClick({
                      id: item.spotify_id,
                      title: item.title,
                      artist: item.artist,
                      playTime: 0,
                      albumCover: item.album_cover || '',
                      albumName: item.album_name || '',
                    })
                  }}
                >
                  <Image
                    src={communityWebCircle}
                    alt="More Options"
                    width={36}
                    height={36}
                  />
                </button>
              )}
            />
            {selectedSong && (
              <MusicSaveModal
                isOpen={isBottomSheetOpen}
                handleClose={() => setIsBottomSheetOpen(false)}
                musicName={selectedSong!.title}
                artistName={selectedSong!.artist}
                musicData={selectedSong}
              />
            )}
          </>
        ) : (
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
                      id: item.id,
                      title: item.name,
                      artist: item.artists[0].name,
                      playTime: item.duration_ms,
                      albumCover: item.album.images[0].url,
                      albumName: item.album.name,
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
                      id: item.id,
                      title: item.name,
                      artist: item.artists[0].name,
                      playTime: item.duration_ms,
                      albumCover: item.album.images[0].url,
                      albumName: item.album.name,
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
                      id: item.id,
                      title: item.name,
                      artist: item.artists[0].name,
                      playTime: item.duration_ms,
                      albumCover: item.album.images[0].url,
                      albumName: item.album.name,
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
            {selectedSong && (
              <MusicSaveBottomSheet
                isOpen={isBottomSheetOpen}
                handleClose={() => setIsBottomSheetOpen(false)}
                musicName={selectedSong!.title}
                artistName={selectedSong!.artist}
                musicData={selectedSong}
              />
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SearchResultItem
