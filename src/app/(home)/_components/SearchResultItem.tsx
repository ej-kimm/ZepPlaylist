'use client'
import { MusicSaveSheet } from '@/components/common'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import Image from 'next/image'
import { useState } from 'react'
import { FiMoreHorizontal } from 'react-icons/fi'

type SearchResultProps = {
  item: SpotifyApi.TrackObjectFull
}

const SearchResultItem = ({ item }: SearchResultProps) => {
  const { isPlayerOpen, setTrackIds, setPlayerOpen, play } =
    useMusicPlayerStore()
  const { upsertMusic } = usePlaylistMusicUpsert(item.album.images[0].url)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

  const handlePlay = async () => {
    const newMusicData = {
      id: item.id,
      title: item.name,
      artist: item.artists[0].name,
      playTime: item.duration_ms,
    }

    await upsertMusic(newMusicData)
    if (!isPlayerOpen) setPlayerOpen() // 페이지 방문 후, 첫 곡 재생이면 플레이어바 보여줌
    setTrackIds(item.id)
    play()
  }
  const handleOpenBottomSheet = () => setIsBottomSheetOpen((prev) => !prev)

  return (
    <li className="flex items-center gap-4 rounded-lg py-2 transition-colors">
      <div className="flex-shrink-0 cursor-pointer" onClick={handlePlay}>
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
        onClick={handlePlay}
      >
        <h3 className="button-2 truncate">{item.name}</h3>
        <p className="caption-2 truncate opacity-60">{item.artists[0].name}</p>
      </div>

      <button type="button" onClick={handleOpenBottomSheet}>
        <FiMoreHorizontal fontSize={24} />
      </button>

      <MusicSaveSheet
        isOpen={isBottomSheetOpen}
        handleClose={handleOpenBottomSheet}
        musicName={item.name}
        artistName={item.artists[0].name}
        albumCover={item.album.images[0].url}
      />
    </li>
  )
}

export default SearchResultItem
