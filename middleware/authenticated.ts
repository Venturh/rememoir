import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { createDb } from '../db'
import { tryAccessToken } from '../utils/auth'
import { getSectretKey } from '../utils/crypto'

export default defineNuxtMiddleware(async ({ redirect, app }) => {
  const hasToken = await tryAccessToken()
  if (!hasToken) {
    return redirect(app.localePath('/auth/login'))
  } else {
    const secretKey = getSectretKey()

    if (secretKey === null) return redirect(app.localePath('/profile/setkey'))
    else if (!app.$db) {
      app.$db = await createDb()
    } else if (app.$db.destroyed) {
      app.$db = await createDb()
    }
  }
})
