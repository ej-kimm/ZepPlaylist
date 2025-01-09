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

export const fetchPreviewUrl = async (trackId: string) => {
  try {
    const res = await fetch(`https://open.spotify.com/embed/track/${trackId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const htmlContent = await res.text()

    // <script> 태그 중 id가 __NEXT_DATA__인 태그에서 JSON 데이터를 추출
    const regex =
      /<script id="__NEXT_DATA__" type="application\/json">([\s\S]+?)<\/script>/
    const match = htmlContent.match(regex)

    if (match) {
      // 매칭된 content에서 JSON 데이터를 파싱
      const jsonData = JSON.parse(match[1])

      // audio preview가 포함되어 있는지 체크하고 있으면 url 반환
      if (jsonData?.props?.pageProps?.state?.data?.entity?.audioPreview?.url) {
        return jsonData.props.pageProps.state.data.entity.audioPreview?.url
      } else {
        console.log('No track list found or no audio preview available.')
        return []
      }
    } else {
      console.log('No JSON data found in the page.')
      return []
    }
  } catch (error) {
    console.error('Error fetching playlist data:', error)
    return []
  }
}
