import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // 1. accessToken 키 발급
  const clientId = process.env.GENIUS_CLIENT_ID
  const clientSecret = process.env.GENIUS_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    console.error(
      'Environment variables GENIUS_CLIENT_ID or GENIUS_CLIENT_SECRET are missing.',
    )
    return NextResponse.json(
      { error: 'Server configuration error: Missing environment variables.' },
      { status: 500 },
    )
  }

  try {
    const tokenResponse = await fetch('https://api.genius.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    })

    if (!tokenResponse.ok) {
      console.error(`Failed to fetch access token: ${tokenResponse.status}`)
      return NextResponse.json(
        { error: 'Failed to fetch access token.' },
        { status: tokenResponse.status },
      )
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // 2. 가사 갖고오기
    const { searchParams } = new URL(request.url)
    const artist = searchParams.get('artist')
    const title = searchParams.get('title')

    if (!artist || !title) {
      return NextResponse.json(
        {
          error:
            'Missing required query parameters: artist, title, or authToken.',
        },
        { status: 400 },
      )
    }

    const query = `${artist} ${title}`

    const Genius = require('genius-lyrics')
    const client = new Genius.Client(accessToken)
    const searches = await client.songs.search(query)
    const firstSong = searches[0]
    const lyrics = await firstSong.lyrics()

    return NextResponse.json({ lyrics }, { status: 200 })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.'
    console.error('Unexpected error while fetching access token:', errorMessage)

    return NextResponse.json(
      { error: `An unexpected error occurred: ${errorMessage}` },
      { status: 500 },
    )
  }
}
