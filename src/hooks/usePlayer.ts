import { useEffect, useState } from 'react'

// TODO : 임시 토큰. 1시간 마다 갱신 함수 작성 필요
const token =
  'BQCKS2spa5OhwLKwDUImpRAO-BP3Km2pm-BYE-Q3BAu_L9ZBH5RpgqXzATjr7nKv0IdsmRq80_uhN5H1YKZv_9sqz_RMpX4sguHUTPtaIgJqk_adecwU5xkN4mpjC40EykftU_CpSK1ahKIrhcIYpWuqyVl1Vwu4iTYHKg7i2gJGBZvYFLnHrUESX9Y_KBYxWuQkQcKKuQ-_oZPnS7-wRh-0o3iFitt7OzQAY3xD'

const usePlayer = () => {
  const [player, setPlayer] = useState<Spotify.Player | null>(null)
  const [is_paused, setPaused] = useState(false)
  const [current_track, setTrack] = useState({
    name: '',
    album: {
      images: [{ url: '' }],
    },
    artists: [{ name: '' }],
  })

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true
    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const playerInstance = new Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => {
          cb(token)
        },
        volume: 0.5,
      })

      setPlayer(playerInstance)

      playerInstance.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
      })

      playerInstance.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })

      playerInstance.addListener('player_state_changed', (state) => {
        if (!state) {
          return
        }
        setTrack(state.track_window.current_track)
        setPaused(state.paused)
        // state.timestamp를 반환해주네?..
      })

      playerInstance.connect()
    }
  }, [])

  const togglePlayback = () => {
    if (player) {
      player
        .togglePlay()
        .then(() => {
          setPaused((prev) => !prev)
        })
        .catch((err) => {
          console.error('Error toggling play state', err)
        })
    }
  }

  const handlePreviousTrack = () => {
    if (player) {
      player.previousTrack()
    }
  }

  const handleNextTrack = () => {
    if (player) {
      player.nextTrack()
    }
  }

  return {
    is_paused,
    current_track,
    togglePlayback,
    handlePreviousTrack,
    handleNextTrack,
  }
}

export default usePlayer
