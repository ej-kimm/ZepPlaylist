'use client'
import { fetchSpotifyToken } from '@/api/spotifyToken'
import play from '@/assets/images/imPlay.svg'
import { usePlaylistMusicUpsert } from '@/hooks/usePlaylistMusicUpsert'
import { useMusicPlayerStore } from '@/store/useMusicPlayerStore'
import Image from 'next/image'

type Props = {
  album: SpotifyApi.AlbumObjectSimplified
}

const LatestAlbumItme = ({ album }: Props) => {
  const { isPlayerOpen, setTrackIds, togglePlay, setPlayerOpen } =
    useMusicPlayerStore()

  const fetchAlbums = async (albumId: string) => {
    const token = await fetchSpotifyToken()

    try {
      const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      if (!res.ok) {
        console.error(`API error: ${res.status} ${res.statusText}`)
        throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`)
      }
      const data: SpotifyApi.SingleAlbumResponse = await res.json()

      return data
    } catch (error) {
      console.error('Fetch error:', error)
      throw new Error('An unexpected error occurred')
    }
  }
  const { upsertMusic } = usePlaylistMusicUpsert(album.images[0].url)

  const albumTrackItems = async (albumId: string, artist: string) => {
    const albumData = await fetchAlbums(albumId)
    const albumTrackList = albumData.tracks.items

    const MusicData = albumTrackList.map((item) => {
      return {
        id: item.id,
        title: item.name,
        artist,
      }
    })

    MusicData.map(async (item) => await upsertMusic(item))

    const albumTrackItem = albumTrackList.map((item) => item.id)

    handlePlayBtn(albumTrackItem)
  }

  const handlePlayBtn = async (palyTrackId: string[]) => {
    if (!isPlayerOpen) setPlayerOpen() // 페이지 방문 후, 첫 곡 재생이면 플레이어바 보여줌
    // setTrackIds(palyTrackId.map((item) => item)) // 재생할 곡 아이디 넘겨주기
    setTrackIds(palyTrackId)
    togglePlay()
  }
  return (
    <li
      key={album.id}
      className="flex-none"
      onClick={() => albumTrackItems(album.id, album.artists[0].name)}
    >
      <div className="w-28 text-left">
        <div className="relative">
          <Image
            src={album.images[0].url}
            width={100}
            height={100}
            alt={album.name}
            priority
            className="h-auto w-full rounded-xl shadow-md"
          />
          <button className="absolute bottom-1 right-1 transform" type="button">
            <Image src={play} width={25} height={25} alt={'play'} />
          </button>
        </div>
        <h3 className="mt-2 truncate text-sm font-semibold">{album.name}</h3>
        <p className="truncate text-xs text-gray-500">
          {album.artists[0].name}
        </p>
      </div>
    </li>
  )
}

export default LatestAlbumItme
