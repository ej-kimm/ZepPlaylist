import { fetchPlaylists } from '@/api/playlist/actions'
import PlaylistComponent from '@/components/playlist/playlistForm'

export const metadata = {
  title: '플레이리스트 - Music Streaming App',
}

// Supabase에서 SSR로 초기 데이터 로드
export default async function PlaylistPage() {
  const playlists = await fetchPlaylists()

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Music Streaming App</h1>
      <h2 className="mb-2 text-lg font-semibold">플레이리스트</h2>
      <PlaylistComponent initialPlaylists={playlists} />
    </div>
  )
}
