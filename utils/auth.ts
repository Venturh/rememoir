let accessToken = ''

export function setAccessToken(s: string) {
  accessToken = s
}

export function getAccessToken() {
  return accessToken
}

export async function requestAccessToken() {
  const response = await fetch(
    `http://${process.env.NUXT_ENV_API}/refresh_token`,
    {
      method: 'POST',
      credentials: 'include',
    }
  )
  const { accessToken } = await response.json()

  setAccessToken(accessToken)
}

export async function tryAccessToken(invalid?: boolean) {
  if (accessToken === '' || invalid === true) await requestAccessToken()
  return accessToken
}
