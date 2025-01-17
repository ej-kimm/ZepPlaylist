'use client'
import MoreOptionsButton from '@/components/common/MoreOptionsButton'
import usePlaylistOperations from '@/hooks/usePlaylistOperations'
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

  const { playlists, handleMoreOptionBtn } = usePlaylistOperations()

  const handlePlayBtn = async (songId: string) => {
    console.log(songId)
    if (!isPlayerOpen) setPlayerOpen() // 페이지 방문 후, 첫 곡 재생이면 플레이어바 보여줌
    setTrackIds(songId)
    togglePlay()
  }

  return (
    <li
      onClick={() => handlePlayBtn(item.id)}
      className="flex items-center space-x-4 rounded-lg p-3 transition-colors"
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
        onFetchMusicData={() =>
          handleMoreOptionBtn(item.id, item.name, item.artists[0].name)
        }
        playlists={playlists}
      />
    </li>
  )
}

export default SearchResultItem
