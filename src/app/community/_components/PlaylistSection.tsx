'use client';

import PlaylistCard from '@/app/community/_components/PlaylistCard';

type PlaylistSectionProps = {
  userId: string;
  playlists: {
    id: string;
    name: string;
    likeCount: number;
    likedByUser?: boolean;
  }[];
};

const PlaylistSection = ({ userId, playlists }: PlaylistSectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist.id} playlist={playlist} userId={userId} />
      ))}
    </div>
  );
};

export default PlaylistSection;
