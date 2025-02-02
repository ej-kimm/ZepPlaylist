export const getKrSpotifyTrackId = async (
  token: string,
  musicName: string,
  artistName: string,
) => {
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${musicName}&type=track&limit=10`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`)
    }
    const data: SpotifyApi.TrackSearchResponse = await res.json()
    const spotifyTrackItem = data.tracks.items[0]

    const spotifyMusicData = {
      id: spotifyTrackItem.id,
      artist: spotifyTrackItem.artists[0].name,
      title: spotifyTrackItem.name,
      playTime: spotifyTrackItem.duration_ms,
      albumCover: spotifyTrackItem.album.images[0].url,
    }

    return spotifyMusicData
  } catch (error) {
    throw error
  }
}
