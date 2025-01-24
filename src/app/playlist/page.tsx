import { fetchPlaylists } from '@/api/playlist/actions'
import Playlist from './_components/Playlist'

export default async function PlaylistPage() {
  const playlists = await fetchPlaylists()

  return (
    <div>
      <Playlist initialPlaylists={playlists!} />
    </div>
  )
}
