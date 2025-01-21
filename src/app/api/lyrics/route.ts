import { NextResponse } from 'next/server'

export async function GET() {
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

    return NextResponse.json({ accessToken }, { status: 200 })
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
