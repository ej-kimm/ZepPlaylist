'use client';

import { useEffect, useState } from 'react';
import { getTrackData } from './server';

export default function CommunityPage() {
  const [trackData, setTrackData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const trackId = '7qiZfU4dY1lWllzX7mPBI3';

    getTrackData(trackId)
      .then(data => setTrackData(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!trackData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Track Details</h1>
      <p>Name: {trackData.name}</p>
      <p>Artist: {trackData.artists.map((artist: any) => artist.name).join(', ')}</p>
      <p>Album: {trackData.album.name}</p>
      <img
        src={trackData.album.images[0]?.url}
        alt={trackData.name}
        className="w-64 h-64 mt-4"
      />
    </div>
  );
}
