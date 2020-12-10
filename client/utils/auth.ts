let accessToken = ''

export const setAccessToken = (s: string) => {
  accessToken = s
}

export function getAccessToken() {
  return accessToken
}

export async function requestAccessToken() {
  const response = await fetch('http://localhost:4000/refresh_token', {
    method: 'POST',
    credentials: 'include',
  })
  const { accessToken } = await response.json()

  setAccessToken(accessToken)
}
