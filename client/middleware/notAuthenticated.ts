import { getAccessToken, requestAccessToken } from '../utils/auth'

export default async function ({ redirect, app }) {
  let hasToken = getAccessToken()
  if (!hasToken) await requestAccessToken()
  hasToken = getAccessToken()

  if (hasToken) {
    return redirect(app.localePath('/entries'))
  }
}
