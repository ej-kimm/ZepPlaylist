import { fetchPlaylists } from '@/api/playlist/actions'
import PlaylistComponent from '@/app/playlist/_components/Playlist'

export default async function PlaylistPage() {
  const playlists = await fetchPlaylists()

  return (
    <div>
      <PlaylistComponent initialPlaylists={playlists} />
    </div>
  )
}
