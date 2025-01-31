export const getSpotifyToken = async () => {
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
    cache: 'no-store',
  })

  const { access_token: token }: { access_token: string } = await res.json()
  return token
}
