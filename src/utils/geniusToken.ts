export const getAccessToken = async (): Promise<string> => {
  try {
    const response = await fetch('/api/lyrics') // API 호출
    if (!response.ok) {
      throw new Error(
        `HTTP Error ${response.status}: Unable to fetch access token.`,
      )
    }
    const data = await response.json()
    return data.accessToken
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
