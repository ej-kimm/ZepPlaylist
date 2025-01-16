'use client';

import PlaylistSection from '@/app/community/_components/PlaylistSection';
import KeywordCarousel from '@/components/keywords/keywordCarousel';
import { getPlaylists } from '@/api/community/actions';
import { useEffect, useState } from 'react';

type KeywordCarouselWrapperProps = {
  userId: string;
};

const KeywordCarouselWrapper = ({ userId }: KeywordCarouselWrapperProps) => {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [playlists, setPlaylists] = useState<
    {
      id: string;
      description: string;
      likeCount: number;
      likedByUser?: boolean;
    }[]
  >([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const allPlaylists = await getPlaylists(userId);

      // description이 null인 경우 빈 문자열로 변환
      const transformedPlaylists = allPlaylists.map((playlist) => ({
        ...playlist,
        description: playlist.description || '', // null을 빈 문자열로 변환
      }));

      setPlaylists(transformedPlaylists);
    };

    fetchPlaylists();
  }, [userId]);

  const handleToggleKeyword = async (keyword: string) => {
    const updatedKeywords = selectedKeywords.includes(keyword)
      ? selectedKeywords.filter((k) => k !== keyword)
      : [...selectedKeywords, keyword];

    setSelectedKeywords(updatedKeywords);

    if (updatedKeywords.length === 0) {
      // 키워드가 없으면 전체 데이터를 다시 로드
      const allPlaylists = await getPlaylists(userId);
      const transformedPlaylists = allPlaylists.map((playlist) => ({
        ...playlist,
        description: playlist.description || '', // null을 빈 문자열로 변환
      }));
      setPlaylists(transformedPlaylists);
    } else {
      // 서버에서 필터링된 플레이리스트 가져오기
      const filteredPlaylists = await getPlaylists(userId, updatedKeywords);

      // description이 null인 경우 빈 문자열로 변환
      const transformedFilteredPlaylists = filteredPlaylists.map((playlist) => ({
        ...playlist,
        description: playlist.description || '', // null을 빈 문자열로 변환
      }));

      setPlaylists(transformedFilteredPlaylists);
    }
  };

  return (
    <div>
      <KeywordCarousel
        selectedKeywords={selectedKeywords}
        onToggleKeyword={handleToggleKeyword}
      />
      <h1 className="mb-4 mt-8 text-2xl font-bold">전체 플레이리스트</h1>
      <PlaylistSection playlists={playlists} userId={userId} />
    </div>
  );
};

export default KeywordCarouselWrapper;
