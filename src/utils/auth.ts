let accessToken = ''

export function setAccessToken(s: string) {
  accessToken = s
}

export function getAccessToken() {
  return accessToken
}

export async function requestAccessToken() {
  const response = await fetch(
    `http://${import.meta.env.VITE_API as string}/refresh_token`,
    {
      method: 'POST',
      credentials: 'include',
    }
  )
  const json = await response.json()
  const { accessToken } = json

  setAccessToken(accessToken)
}

export async function tryAccessToken(invalid?: boolean) {
  if (accessToken === '' || invalid === true) await requestAccessToken()
  return accessToken
}
