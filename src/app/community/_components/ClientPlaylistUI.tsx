'use client';

import PlaylistUI from './PlaylistUI';

type ClientPlaylistUIProps = {
  playlist: {
    albumCover: string;
    isLiked: boolean;
    likeCount: number;
    id: string;
  };
};

const ClientPlaylistUI: React.FC<ClientPlaylistUIProps> = ({ playlist }) => {
  const handleLikeToggle = () => {
    console.log('Like toggled for', playlist.id);
  };

  const handlePlay = () => {
    console.log('Play clicked for', playlist.id);
  };

  return (
    <PlaylistUI
      albumCover={playlist.albumCover}
      isLiked={playlist.isLiked}
      onLikeToggle={handleLikeToggle}
      onPlay={handlePlay}
    />
  );
};

export default ClientPlaylistUI;
