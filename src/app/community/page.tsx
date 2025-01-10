import { getPlaylists, getPopularPlaylists } from '@/api/community/playlists';
import { ClientSwiper } from '@/components/common';

const CommunityPage = async (): Promise<JSX.Element> => {
  const playlists = await getPlaylists();
  const popularPlaylists = await getPopularPlaylists();

  return (
    <div className="p-4">
      {/* 인기 있는 플레이리스트 섹션 */}
      <h1 className="mb-4 text-2xl font-bold">인기 있는 플레이리스트</h1>
      <ClientSwiper
        items={popularPlaylists.map((playlist) => ({
          id: playlist.id,
          content: (
            <div>
              <h2 className="text-xl font-semibold">{playlist.name}</h2>
              <p>{playlist.description}</p>
              <p className="text-sm text-gray-500">Likes: {playlist.playlist_like.count}</p>
            </div>
          ),
        }))}
      />

      {/* 전체 플레이리스트 섹션 */}
      <h1 className="mt-8 mb-4 text-2xl font-bold">전체 플레이리스트</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{playlist.name}</h2>
            <p>{playlist.description}</p>
            <p className="text-sm text-gray-500">Public: {playlist.is_public ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
