import { ClientSwiper } from '@/components/common';
import type { Tables } from '@/types/supabase';

const getPlaylists = async (): Promise<Tables<'playlists'>[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Failed to fetch playlists');
    return [];
  }

  const { playlist } = await res.json();
  return playlist.filter((playlist: Tables<'playlists'>) => playlist.is_public);
};

const CommunityPage = async (): Promise<JSX.Element> => {
  const playlists = await getPlaylists();

  if (playlists.length === 0) {
    return (
      <div className="p-4">
        <h1 className="mb-2 text-2xl font-bold">커뮤니티 페이지</h1>
        <p>플레이 리스트가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">커뮤니티 페이지</h1>
      <ClientSwiper // 서버 컴포넌트에서 사용할때는 ClientSwiper에 props로 전달해서 사용해야함, ClientSwiper는 UI를 그려주는 역할만 하게 됨
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
  );
};

export default CommunityPage;
