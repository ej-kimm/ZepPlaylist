'use server'
import { Tables } from '@/types/supabase'

const getSongId = async ({
  artist,
  title,
  authToken,
}: {
  artist: Tables<'music'>['artist']
  title: Tables<'music'>['title']
  authToken: string
}): Promise<string | null> => {
  if (!artist) return null

  const query = `${artist} ${title}`

  try {
    const response = await fetch(`https://api.genius.com/search?q=${query}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

    if (!response.ok) {
      console.error(`Failed to fetch song ID. HTTP Status: ${response.status}`)
      throw new Error(`HTTP Error ${response.status}: Unable to fetch song ID.`)
    }

    const data = await response.json()
    const searchResults = data.response.hits

    if (searchResults.length === 0) {
      console.warn(`No results found for query: "${artist} ${title}"`)
      return null
    }
    return searchResults[0].result.id
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching song ID:', error.message)
      throw new Error(`An error occurred: ${error.message}`)
    }
    throw new Error(`An error occurred`)
  }
}

const getLyricsUrl = async (
  songId: string,
  authToken: string,
): Promise<string> => {
  try {
    const response = await fetch(`https://api.genius.com/songs/${songId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

    if (!response.ok) {
      console.error(`Failed to fetch song details`)
      throw new Error(
        `HTTP Error ${response.status}: Unable to fetch song details.`,
      )
    }

    const songDetails = await response.json()
    const lyricsUrl = songDetails.response.song.url
    return lyricsUrl
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        'An unknown error occurred while fetching lyrics URL.',
        error,
      )
      throw new Error(
        'An unknown error occurred while fetching lyrics URL.',
        error,
      )
    }
    throw new Error('An unknown error occurred while fetching lyrics URL.')
  }
}

const crawlLyrics = async (lyricsUrl: string): Promise<string> => {
  try {
    const response = await fetch(lyricsUrl)

    if (!response.ok) {
      throw new Error(
        `HTTP Error ${response.status}: Unable to fetch lyrics page.`,
      )
    }

    const htmlContent = await response.text()

    // 가사 데이터 매칭
    const regex =
      /<div data-lyrics-container="true" class="Lyrics-sc-[\w-]+ bzTABU">([\s\S]*?)<\/div>/g
    const matches = htmlContent.match(regex)

    if (matches) {
      const rawLyrics = matches.join('')
      const cleanedLyrics = rawLyrics
        .replace(/<(?!br\s*\/?)[^>]+>/g, '') // <br> 태그를 제외한 모든 태그 제거
        .replace(/\[.*?\].*?\n?/g, '') // 대괄호가 포함된 문장 제거
        .replace(/(<br\s*\/?>\s*){3,}/g, '<br><br>') // 연속된 <br> 태그가 3개 이상일 경우 2개로 줄임
        // .replace(/^<br\s*\/?>|<br\s*\/?>$/g, '') // 맨 처음과 맨 끝의 <br> 태그 제거 맨첫줄 띄울지?
        .replace(/^(<br\s*\/?>)+|(<br\s*\/?>)+$/g, '') // 맨 처음과 맨 끝에 있는 모든 <br> 태그 제거 맨첫줄 안띄울지
        .trim() // 양쪽 공백 제거
      return cleanedLyrics
    } else {
      throw new Error('Lyrics container not found in the provided HTML.')
    }
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
  accessToken,
}: {
  artist: Tables<'music'>['artist']
  title: Tables<'music'>['title']
  accessToken: string
}): Promise<string | null> => {
  const songId = await getSongId({ artist, title, authToken: accessToken })
  if (!songId) {
    return null
  }
  const lyricsUrl = await getLyricsUrl(songId, accessToken)
  const lyrics = await crawlLyrics(lyricsUrl)

  return lyrics
}
