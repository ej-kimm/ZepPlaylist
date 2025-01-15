'use client';

import PlaylistSection from '@/app/community/_components/PlaylistSection';
import KeywordCarousel from '@/components/keywords/keywordCarousel';
import { availableKeywords } from '@/constants/keywords';
import { getPlaylists } from '@/api/community/actions'; // getPlaylists 함수 경로
import { useEffect, useState } from 'react';

type Playlist = {
    likeCount: number;
    likedByUser: boolean;
    created_at: string;
    description: string | null;
    id: string;
    is_public: boolean;
    keyword: string;
    name: string;
    user_id: string;
  };
  
  type KeywordCarouselWrapperProps = {
    allPlaylists: Playlist[]; // 타입 정의
    userId: string;
  };

const KeywordCarouselWrapper = ({ userId }: KeywordCarouselWrapperProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [playlists, setPlaylists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);

  // 초기 데이터 로드
  useEffect(() => {
    const fetchPlaylists = async () => {
      const allPlaylists = await getPlaylists(userId); // 모든 플레이리스트 로드
      setPlaylists(allPlaylists);
      setFilteredPlaylists(allPlaylists); // 필터링되지 않은 상태로 설정
    };

    fetchPlaylists();
  }, [userId]);

  // 화면 크기 확인
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 모바일 기준: 768px 이하
    };

    handleResize(); // 초기 실행
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleToggleKeyword = async (keyword: string) => {
    setSelectedKeywords((prev) => {
      const isSelected = prev.includes(keyword);
      const updatedKeywords = isSelected
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword];

      // 서버에서 필터링된 데이터 요청
      const fetchFilteredPlaylists = async () => {
        const filtered =
          updatedKeywords.length > 0
            ? await getPlaylists(userId, updatedKeywords) // 키워드로 필터링된 데이터 요청
            : playlists; // 모든 데이터를 사용
        setFilteredPlaylists(filtered);
      };

      fetchFilteredPlaylists();

      return updatedKeywords;
    });
  };

  return (
    <div>
      {isMobile ? (
        <KeywordCarousel
          selectedKeywords={selectedKeywords}
          onToggleKeyword={handleToggleKeyword}
        />
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          {availableKeywords.map(({ emoji, label }) => (
            <button
              key={label}
              onClick={() => handleToggleKeyword(label)}
              className={`flex items-center justify-center rounded-full border px-3 py-2 ${
                selectedKeywords.includes(label)
                  ? 'border-[#9032E8] bg-[#9032E8] text-white'
                  : 'border-[#9032E8] bg-white text-[#9032E8]'
              }`}
              style={{
                boxShadow: selectedKeywords.includes(label)
                  ? '0px 4px 6px rgba(144, 50, 232, 0.4)'
                  : '0px 4px 6px rgba(0, 0, 0, 0.1)',
                fontSize: '12px',
                padding: '6px 12px',
                transition: 'all 0.3s ease',
              }}
            >
              <span className="mr-2 text-base">{emoji}</span>
              <span className="font-semibold">{label}</span>
            </button>
          ))}
        </div>
      )}

      <h1 className="mb-4 mt-8 text-2xl font-bold">전체 플레이리스트</h1>
      <PlaylistSection playlists={filteredPlaylists} userId={userId} />
    </div>
  );
};

export default KeywordCarouselWrapper;
