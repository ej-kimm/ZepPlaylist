import { Tables } from '@/types/supabase'

export const getSongLyrics = async ({
  artist,
  title,
}: {
  artist: Tables<'music'>['artist']
  title: Tables<'music'>['title']
}): Promise<string> => {
  try {
    const response = await fetch(`/api/lyrics?artist=${artist}&title=${title}`)
    if (!response.ok) {
      throw new Error(
        `HTTP Error ${response.status}: Unable to fetch access token.`,
      )
    }
    const data = await response.json()

    console.log(data.lyrics)

    return data.lyrics
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
