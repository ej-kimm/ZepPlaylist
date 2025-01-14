'use client';

import { getCommunityDetail } from '@/api/community/communityDetail';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type CommunityDetailProps = {
  playlistId: string;
};

type Song = {
  spotify_id: string;
  title: string;
  artist: string;
  album_cover: string | null;
  play_time: number;
};

export default function CommunityDetailClient({ playlistId }: CommunityDetailProps) {
  const [data, setData] = useState<{ songs: Song[]; songCount: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCommunityDetail(playlistId);
        setData(response);
      } catch (err) {
        if (err instanceof Error) {
          setError('Failed to load community detail.');
          console.error(err.message);
        } else {
          setError('An unexpected error occurred.');
          console.error(err);
        }
      }
    }
    fetchData();
  }, [playlistId]);

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-red-500">오류 발생</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <h1 className="text-2xl font-bold">로딩 중...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-8">
      <div className="flex-1">
        <h1 className="text-xl font-bold">플레이리스트 정보</h1>
        <h2 className="mt-4 text-lg font-semibold">총 곡 수: {data.songCount}</h2>

        <ul className="mt-6">
          {data.songs.map((song) => (
            <li
              key={song.spotify_id}
              className="flex items-center justify-between border-b py-2"
            >
              <div className="flex items-center">
                <div className="relative h-12 w-12">
                  <Image
                    src={song.album_cover || '/default-album-cover.jpg'}
                    alt={`${song.title} 앨범 커버`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
                <div className="ml-4">
                  <p className="font-semibold">{song.title}</p>
                  <p className="text-sm text-gray-500">{song.artist}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{formatPlayTime(song.play_time)}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1">
        <h1 className="text-xl font-bold">댓글</h1>
        <p className="text-gray-500">댓글 기능은 곧 추가됩니다.</p>
      </div>
    </div>
  );
}

function formatPlayTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
