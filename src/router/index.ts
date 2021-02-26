import { createRouter, createWebHistory } from 'vue-router'
import routes from 'voie-pages'
import { getAccessToken, tryAccessToken } from '@/utils/auth'
import { createDb, getDb } from '@/db/Database'
import { getSectretKey } from '@/utils/crypto'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _, next) => {
  let hasToken = getAccessToken()
  if (!hasToken) {
    hasToken = await tryAccessToken()
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!hasToken) {
      next({ name: 'auth-login' })
    } else {
      if (getSectretKey() === null) {
        return next({ name: 'auth-setkey' })
      } else {
        const db = getDb()
        if (!db) await createDb()
        else if (db.destroyed) {
          await createDb()
        }
        next()
      }
    }
  } else if (
    to.name!.toString().includes('auth-login') ||
    to.name!.toString().includes('auth-register')
  ) {
    if (hasToken && getSectretKey()) next('home')
    else next()
  } else if (to.name!.toString().includes('profile-setkey')) {
    hasToken = await tryAccessToken()
    if (!hasToken) next({ name: '' })
    else next()
  } else {
    next()
  }
})

export default router
