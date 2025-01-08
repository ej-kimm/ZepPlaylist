'use client'
import { generateSpotifyAuthURL } from '@/api/spotifyToken'
import usePlayer from '@/hooks/usePlayer'
import { useEffect } from 'react'

const MusicPlayer = () => {
  const {
    is_paused,
    current_track,
    togglePlayback,
    handlePreviousTrack,
    handleNextTrack,
  } = usePlayer()

  useEffect(() => {
    const redirectToSpotifyAuth = async () => {
      const authURL = await generateSpotifyAuthURL()
      window.location.href = authURL
    }

    redirectToSpotifyAuth()
  }, [])

  return (
    <>
      <button onClick={handlePreviousTrack}>&lt;&lt;</button>
      <button onClick={togglePlayback}>{is_paused ? 'PLAY' : 'PAUSE'}</button>
      <button onClick={handleNextTrack}>&gt;&gt;</button>

      <div>
        <h3>Now Playing: {current_track.name}</h3>
        <img src={current_track.album.images[0].url} alt={current_track.name} />
      </div>
    </>
  )
}

export default MusicPlayer
