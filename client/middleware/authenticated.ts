import { getAccessToken, requestAccessToken } from '../utils/auth'

export default async function ({ redirect, app }) {
  // Todo: Make this better and doesnt work with ssr on first load
  let hasToken = getAccessToken()
  if (!hasToken) await requestAccessToken()
  hasToken = getAccessToken()

  if (!hasToken) {
    return redirect(app.localePath('/auth/login'))
  }
}
