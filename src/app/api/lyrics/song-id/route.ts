import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const artist = searchParams.get('artist')
  const title = searchParams.get('title')
  const authToken = searchParams.get('authToken')

  if (!artist || !title || !authToken) {
    return NextResponse.json(
      {
        error:
          'Missing required query parameters: artist, title, or authToken.',
      },
      { status: 400 },
    )
  }

  try {
    const query = `${artist} ${title}`
    const response = await fetch(`https://api.genius.com/search?q=${query}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

    if (!response.ok) {
      console.error(`Failed to fetch song ID. HTTP Status: ${response.status}`)
      return NextResponse.json(
        { error: `Failed to fetch song ID.` },
        { status: response.status },
      )
    }

    const data = await response.json()
    const searchResults = data.response.hits

    if (searchResults.length === 0) {
      return NextResponse.json(
        { message: `No results found for query: "${artist} ${title}"` },
        { status: 404 },
      )
    }

    const songId = searchResults[0].result.id
    return NextResponse.json({ songId }, { status: 200 })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.'
    console.error('Error fetching song ID:', errorMessage)

    return NextResponse.json(
      { error: `An unexpected error occurred: ${errorMessage}` },
      { status: 500 },
    )
  }
}
