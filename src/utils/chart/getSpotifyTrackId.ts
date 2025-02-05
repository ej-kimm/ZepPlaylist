export const getSpotifyTrackData = async (
  token: string,
  musicName: string,
  artistName: string,
) => {
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${musicName}&type=track&limit=50`,
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
    const spotifyTrackItem = data.tracks.items

    const spotifyMusicData = spotifyTrackItem
      .map((item) => ({
        id: item.id,
        artist: item.artists[0].name,
        title: item.name,
        playTime: item.duration_ms,
        albumCover: item.album.images[0].url,
        albumName: item.album.name,
      }))
      .find((item) => item.artist === artistName || item.title === musicName)

    return spotifyMusicData
  } catch (error) {
    throw error
  }
}
