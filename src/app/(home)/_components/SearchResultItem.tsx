'use client'
import MoreOptionsButton from '@/components/common/MoreOptionsButton'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import { userStore } from '@/store/userSlice'
import Image from 'next/image'

type SearchResultProps = {
  item: SpotifyApi.TrackObjectFull
}

const SearchResultItem = ({ item }: SearchResultProps) => {
  const { user } = userStore((state) => state)
  const { isPlayerOpen, setTrackIds, togglePlay, setPlayerOpen } =
    useMusicPlayerStore()

  const { upsertMusic } = usePlaylistMusicUpsert(item.album.images[0].url)

  const handlePlayBtn = async (
    songId: string,
    musicName: string,
    artist: string,
  ) => {
    const newMusicData = {
      id: songId,
      title: musicName,
      artist: artist,
    }
    await upsertMusic(newMusicData)
    if (!isPlayerOpen) setPlayerOpen() // 페이지 방문 후, 첫 곡 재생이면 플레이어바 보여줌
    setTrackIds(songId)
    togglePlay()
  }

  return (
    <li
      onClick={() => handlePlayBtn(item.id, item.name, item.artists[0].name)}
      className="flex items-center space-x-4 rounded-lg py-2 transition-colors"
    >
      <div className="relative flex-shrink-0">
        <Image
          src={item.album.images[0].url}
          alt={item.album.name}
          width={50}
          height={50}
          className="rounded-md"
          priority
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-medium text-gray-900">
          {item.name}
        </h3>
        <p className="truncate text-sm text-gray-500">{item.artists[0].name}</p>
      </div>
      <MoreOptionsButton
        musicName={item.name}
        artistName={item.artists[0].name}
        albumCover={item.album.images[0].url}
        user={user}
      />
    </li>
  )
}

export default SearchResultItem
