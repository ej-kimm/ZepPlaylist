'use server'

export const fetchSpotifyToken = async () => {
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: process.env.SPOTIFY_CLIENT_ID as string,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET as string,
  })

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })

  const { access_token: token } = await res.json()
  return token
}

export const generateSpotifyAuthURL = async () => {
  const scope =
    'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming'

  const auth_query_parameters = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID as string,
    scope: scope,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI as string,
  })
  const authURL = `https://accounts.spotify.com/authorize?${auth_query_parameters.toString()}`

  return authURL
}
