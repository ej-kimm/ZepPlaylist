import { fetchPlaylists } from '@/api/playlist/actions'
import PlaylistComponent from '@/components/playlist/playlistForm'

export default async function PlaylistPage() {
  const playlists = await fetchPlaylists()

  return (
    <div>
      <PlaylistComponent initialPlaylists={playlists} />
    </div>
  )
}
