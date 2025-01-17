'use server'

import { Tables } from '@/types/supabase'

const getAccessToken = async (): Promise<string> => {
  const clientId = process.env.GENIUS_CLIENT_ID
  const clientSecret = process.env.GENIUS_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    console.error(
      'Environment variables GENIUS_CLIENT_ID or GENIUS_CLIENT_SECRET are missing.',
    )
    throw new Error('Missing required environment variables.')
  }

  try {
    const response = await fetch('https://api.genius.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    })

    if (!response.ok) {
      throw new Error(
        `HTTP Error ${response.status}: Unable to fetch access token.`,
      )
    }

    const data = await response.json()
    return data.access_token
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

    // artist_names에 artist가 포함되어 있는지 확인 (공백 모두 제거, 영어는 모두 소문자로 변환 후 비교)
    const resultArtistNames = searchResults[0].result.artist_names
      .replace(/\s+/g, '')
      .toLowerCase()
    const normalizedArtist = artist.replace(/\s+/g, '').toLowerCase()
    if (!resultArtistNames.includes(normalizedArtist)) {
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
      console.error('An unknown error occurred while fetching lyrics URL.')
      throw new Error('An unknown error occurred while fetching lyrics URL.')
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
      console.error('An unknown error occurred while crawling lyrics.')
      throw new Error('An unknown error occurred while crawling lyrics.')
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
  const lyrics = await crawlLyrics(lyricsUrl)

  return lyrics
}
