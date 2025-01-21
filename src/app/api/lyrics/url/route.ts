import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const songId = searchParams.get('songId')
  const authToken = searchParams.get('authToken')

  if (!songId || !authToken) {
    return NextResponse.json(
      { error: 'Missing required query parameters: songId or authToken.' },
      { status: 400 },
    )
  }

  try {
    const response = await fetch(`https://api.genius.com/songs/${songId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

    if (!response.ok) {
      console.error(
        `Failed to fetch song details. HTTP Status: ${response.status}`,
      )
      return NextResponse.json(
        { error: 'Failed to fetch song details.' },
        { status: response.status },
      )
    }

    const songDetails = await response.json()
    const lyricsUrl = songDetails.response.song.url

    return NextResponse.json({ lyricsUrl }, { status: 200 })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.'
    console.error('Error fetching lyrics URL:', errorMessage)

    return NextResponse.json(
      { error: `An unexpected error occurred: ${errorMessage}` },
      { status: 500 },
    )
  }
}
