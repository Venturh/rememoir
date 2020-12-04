import { getAccessToken, requestAccessToken } from '../utils/accessToken'

export default async function ({ redirect }) {
  let hasToken = getAccessToken()
  if (!hasToken) await requestAccessToken()
  hasToken = getAccessToken()

  if (hasToken) {
    return redirect('/entries')
  }
}
