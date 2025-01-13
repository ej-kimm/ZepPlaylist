import { getPlaylists, getPopularPlaylists } from '@/api/community/playlists';
import PlaylistSection from '@/app/community/_components/PlaylistSection';

const CommunityPage = async (): Promise<JSX.Element> => {
  // 하드코딩된 유저 ID (임시 처리)
  const userId = '7db22ced-2ee8-45db-8127-f190ff3725ef';

  // SSR에서 초기 데이터 로드
  const playlists = await getPlaylists(userId);
  const popularPlaylists = await getPopularPlaylists(userId);

  return (
    <div className="p-4">
      {/* 인기 있는 플레이리스트 섹션 */}
      <h1 className="mb-4 text-2xl font-bold">인기 있는 플레이리스트</h1>
      <PlaylistSection playlists={popularPlaylists} isSwiper userId={userId} />

      {/* 전체 플레이리스트 섹션 */}
      <h1 className="mb-4 mt-8 text-2xl font-bold">전체 플레이리스트</h1>
      <PlaylistSection playlists={playlists} userId={userId} />
    </div>
  );
};

export default CommunityPage;
