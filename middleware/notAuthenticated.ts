import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { getAccessToken, requestAccessToken } from '../utils/auth'

export default defineNuxtMiddleware(async ({ redirect, app }) => {
  let hasToken = getAccessToken()
  if (!hasToken) await requestAccessToken()
  hasToken = getAccessToken()

  if (hasToken) {
    return redirect(app.localePath('/home'))
  }
})
