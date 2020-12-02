let accessToken = ''

export const setAccessToken = (s: string) => {
  accessToken = s
}

export const getAccessToken = () => {
  return accessToken
}

export const requestAccessToken = async () => {
  const response = await fetch('http://localhost:4000/refresh_token', {
    method: 'POST',
    credentials: 'include',
  })
  const { accessToken } = await response.json()

  setAccessToken(accessToken)
}
