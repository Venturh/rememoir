import { tryAccessToken } from '../utils/auth'

export default async function ({ redirect, app }) {
  // Todo: Make this better and doesnt work with ssr on first load

  const hasToken = await tryAccessToken()
  if (!hasToken) {
    return redirect(app.localePath('/auth/login'))
  }
}
