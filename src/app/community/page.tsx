import { getPlaylists, getPopularPlaylists } from '@/api/community/actions';
import PlaylistSection from '@/app/community/_components/PlaylistSection';
import ClientSwiper from '@/components/common/ClientSwiper';
import KeywordCarouselWrapper from './_components/KeywordCarouselWrapper';
import type { Database } from '@/types/supabase';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const CommunityPage = async (): Promise<JSX.Element> => {
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookies().getAll(),
      },
    }
  );

  const { data: session } = await supabase.auth.getSession();

  if (!session || !session.session?.user) {
    console.error('유저 정보를 가져오는 데 실패했습니다.');
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-500">
          로그인된 사용자가 없습니다. 다시 로그인해주세요.
        </h1>
      </div>
    );
  }

  const userId = session.session.user.id;

  const allPlaylists = await getPlaylists(userId);

  const popularPlaylists = await getPopularPlaylists(userId);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">인기 있는 플레이리스트</h1>
      <ClientSwiper
        items={popularPlaylists.map((playlist) => ({
          id: playlist.id,
          content: (
            <PlaylistSection playlists={[playlist]} userId={userId} />
          ),
        }))}
      />
      <KeywordCarouselWrapper allPlaylists={allPlaylists} userId={userId} />
    </div>
  );
};

export default CommunityPage;
