import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lyricsUrl = searchParams.get('lyricsUrl')

  if (!lyricsUrl) {
    return NextResponse.json(
      { error: 'Missing required query parameter: lyricsUrl.' },
      { status: 400 },
    )
  }

  try {
    const response = await fetch(lyricsUrl)

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch lyrics page.` },
        { status: response.status },
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

      return NextResponse.json({ lyrics: cleanedLyrics }, { status: 200 })
    }

    return NextResponse.json(
      { error: 'Lyrics container not found in the provided HTML.' },
      { status: 404 },
    )
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.'
    console.error('Error while crawling lyrics:', errorMessage)

    return NextResponse.json(
      { error: `An unexpected error occurred: ${errorMessage}` },
      { status: 500 },
    )
  }
}
