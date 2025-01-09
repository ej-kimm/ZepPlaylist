import ClientSwiper from '@/components/common/ClientSwiper'
import type { Database } from '@/types/supabase'

type Playlist = Database['public']['Tables']['playlists']['Row']

const getPlaylists = async (): Promise<Playlist[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    console.error('Failed to fetch playlists')
    return []
  }

  const { playlists } = await res.json()
  return playlists.filter((playlist: Playlist) => playlist.is_public)
}

const CommunityPage = async (): Promise<JSX.Element> => {
  const playlists = await getPlaylists()

  if (playlists.length === 0) {
    return (
      <div className="p-4">
        <h1 className="mb-2 text-2xl font-bold">커뮤니티 페이지</h1>
        <p>플레이 리스트가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">커뮤니티 페이지</h1>
      <ClientSwiper // ClientSwiper에 items를 props로 전달, ClientSwiper컴포넌트는 슬라이드 렌더링 하는 역할만 담당하게 됨(UI적 부분)
        items={playlists.map((playlist) => ({
          id: playlist.id,
          content: (
            <>
              <h2 className="text-xl font-semibold">{playlist.name}</h2>
              <p>{playlist.description}</p>
              <p className="text-sm text-gray-500">
                Public: {playlist.is_public ? 'Yes' : 'No'}
              </p>
            </>
          ),
        }))}
      />
    </div>
  )
}

export default CommunityPage
