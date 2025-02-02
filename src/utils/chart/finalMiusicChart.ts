import { getSpotifyToken } from '../spotifyToken/getToken'
import { fetchAndCleanMelonChart } from './fetchMelonChart'
import { getSpotifyTrackData } from './getSpotifyTrackId'

const finalMiusicChart = async () => {
  const token = await getSpotifyToken()
  //   console.log('token', token)

  const cleanedMelonChart = await fetchAndCleanMelonChart()
  //   console.log('cleanedMelonChart', cleanedMelonChart)

  const resolvedMusicData = await Promise.all(
    cleanedMelonChart!.map(
      async (item) =>
        await getSpotifyTrackData(token, item.songName, item.artistName),
    ),
  )
  //   console.log('resolvedMusicData', resolvedMusicData)

  const validMusicData = resolvedMusicData.filter((item) => item !== undefined)
  console.log('validMusicData', validMusicData)

  return validMusicData
}

export default finalMiusicChart
