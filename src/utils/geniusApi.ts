import { Tables } from '@/types/supabase'

const getAccessToken = async (): Promise<string> => {
  try {
    const response = await fetch('/api/lyrics/token')
    if (!response.ok) {
      throw new Error(
        `HTTP Error ${response.status}: Unable to fetch access token.`,
      )
    }
    const data = await response.json()
    return data.accessToken
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        'Unexpected error while fetching access token:',
        error.message,
      )
      throw new Error(
        `An unexpected error occurred: ${error.message}. Please check the logs.`,
      )
    }
    throw new Error(`An unexpected error occurred: Please check the logs.`)
  }
}

const getSongId = async ({
  artist,
  title,
  authToken,
}: {
  artist: Tables<'music'>['artist']
  title: Tables<'music'>['title']
  authToken: string
}): Promise<string | null> => {
  try {
    const response = await fetch(
      `/api/lyrics/song-id?artist=${artist}&title=${title}&authToken=${authToken}`,
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch song ID: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.error) {
      console.error(data.error)
      return null
    }

    return data.songId
  } catch (error) {
    console.error('Error calling getSongId API:', error)
    return null
  }
}

const getLyricsUrl = async (
  songId: string,
  authToken: string,
): Promise<string | null> => {
  try {
    const response = await fetch(
      `/api/lyrics/url?songId=${songId}&authToken=${authToken}`,
    )

    if (!response.ok) {
      console.error(`Failed to fetch song details.`)
      throw new Error(
        `HTTP Error ${response.status}: Unable to fetch song details.`,
      )
    }

    const data = await response.json()

    if (data.error) {
      console.error(data.error)
      return null
    }

    const lyricsUrl = data.lyricsUrl
    return lyricsUrl
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        'An unknown error occurred while fetching lyrics URL.',
        error,
      )
      throw new Error('An unknown error occurred while fetching lyrics URL.')
    }
    throw new Error('An unknown error occurred while fetching lyrics URL.')
  }
}

const crawlLyrics = async (lyricsUrl: string): Promise<string> => {
  try {
    const response = await fetch(`/api/lyrics/crawl?lyricsUrl=${lyricsUrl}`)

    if (!response.ok) {
      throw new Error(
        `HTTP Error ${response.status}: Unable to fetch lyrics page.`,
      )
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(data.error)
    }

    return data.lyrics
  } catch (error) {
    if (error instanceof Error) {
      console.error('An unknown error occurred while crawling lyrics.', error)
      throw new Error('An unknown error occurred while crawling lyrics.', error)
    }
    throw new Error('An unknown error occurred while crawling lyrics.')
  }
}

export const getSongLyrics = async ({
  artist,
  title,
}: {
  artist: Tables<'music'>['artist']
  title: Tables<'music'>['title']
}): Promise<string | null> => {
  const authToken = await getAccessToken()
  const songId = await getSongId({ artist, title, authToken })
  if (!songId) {
    return null
  }
  const lyricsUrl = await getLyricsUrl(songId, authToken)
  if (!lyricsUrl) {
    return null
  }
  const lyrics = await crawlLyrics(lyricsUrl)

  return lyrics
}
