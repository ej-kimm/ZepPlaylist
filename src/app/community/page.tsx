import { cookies } from 'next/headers';
import { getPlaylists, getPopularPlaylists } from '@/api/community/playlists';
import PlaylistCard from '@/app/community/_components/PlaylistCard';
import type { Database } from '@/types/supabase';
import { createClient } from '@supabase/supabase-js';

const CommunityPage = async (): Promise<JSX.Element> => {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const cookieStore = cookies();
  const accessToken = cookieStore.get('sb-access-token')?.value;

  if (!accessToken) {
    console.error('Access token is missing');
    throw new Error('유효한 사용자 정보가 없습니다.');
  }

  // Access token을 인증에 설정
  supabase.auth.setAuth(accessToken);

  const { data: user, error } = await supabase.auth.getUser();
  if (error || !user) {
    console.error('Error fetching user:', error?.message);
    throw new Error('유효한 사용자 정보가 없습니다.');
  }

  // Supabase Server Actions 호출
  const playlists = await getPlaylists();
  const popularPlaylists = await getPopularPlaylists();

  return (
    <div className="p-4">
      {/* 인기 있는 플레이리스트 섹션 */}
      <h1 className="mb-4 text-2xl font-bold">인기 있는 플레이리스트</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {popularPlaylists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            userId={user.id} // user.id 사용
          />
        ))}
      </div>

      {/* 전체 플레이리스트 섹션 */}
      <h1 className="mb-4 mt-8 text-2xl font-bold">전체 플레이리스트</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            userId={user.id} // user.id 사용
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
