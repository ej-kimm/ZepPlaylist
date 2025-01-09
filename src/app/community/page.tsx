import { getPlaylists } from '@/api/community/playlists'
import { ClientSwiper } from '@/components/common'

const CommunityPage = async (): Promise<JSX.Element> => {
  const playlists = await getPlaylists()

  if (!playlists || playlists.length === 0) {
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
      <ClientSwiper
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
