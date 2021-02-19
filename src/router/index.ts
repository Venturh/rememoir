import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouterView,
} from 'vue-router'
import { getAccessToken, tryAccessToken } from '@/utils/auth'
import { createDb, getDb } from '@/db/Database'
import { getSectretKey } from '@/utils/crypto'

import Landing from '../pages/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '',
    component: Landing,
  },
  {
    path: '/about',
    component: () => import('../pages/about.vue'),
    name: 'about',
  },
  {
    path: '/pricing',
    component: () => import('../pages/pricing.vue'),
    name: 'pricing',
  },
  {
    path: '/auth',
    name: 'auth',
    component: RouterView,
    children: [
      {
        path: 'register',
        component: () => import('../pages/auth/register.vue'),
        name: 'register',
      },
      {
        path: 'login',
        component: () => import('../pages/auth/login.vue'),
        name: 'login',
      },
      {
        path: 'code',
        component: () => import('../pages/auth/code.vue'),
        name: 'code',
      },
      {
        path: 'accountVerification',
        component: () => import('../pages/auth/accountVerification.vue'),
        name: 'accountVerification',
      },
      {
        path: 'resetPassword',
        component: () => import('../pages/auth/resetPassword.vue'),
        name: 'resetPassword',
      },
      {
        path: '',
        component: () => import('../pages/index.vue'),
        name: 'auth',
      },
    ],
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../pages/home.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/pinned',
    name: 'pinned',
    component: () => import('../pages/pinned.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/archive',
    name: 'archive',
    component: () => import('../pages/archive.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/lists',
    name: 'lists',
    component: RouterView,
    children: [
      {
        path: '',
        component: () => import('../pages/lists/[id].vue'),
        name: 'lists',
        meta: { requiresAuth: true },
      },
      {
        path: ':id',
        component: () => import('../pages/lists/[id].vue'),
        name: 'listsid',
        meta: { requiresAuth: true },
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/entries',
    name: 'entries',
    component: RouterView,
    children: [
      {
        path: '',
        component: () => import('../pages/entries/[id].vue'),
        name: 'entries',
        meta: { requiresAuth: true },
      },
      {
        path: ':id',
        component: () => import('../pages/entries/[id].vue'),
        name: 'entriesid',
        meta: { requiresAuth: true },
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: RouterView,
    children: [
      {
        path: 'setkey',
        component: () => import('../pages/profile/setkey.vue'),
        name: 'setkey',
      },
    ],
  },
  {
    path: '/shared/entry',
    name: 'sharedentry',
    component: RouterView,
    children: [
      {
        path: ':id',
        component: () => import('../pages/shared/entry/[id].vue'),
        name: 'sharedentry',
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  let hasToken = getAccessToken()

  if (!hasToken) {
    hasToken = await tryAccessToken()
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!hasToken) {
      next({ name: 'login' })
    } else {
      if (getSectretKey() === null) {
        return next({ name: 'setkey' })
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
    to.name!.toString().includes('login') ||
    to.name!.toString().includes('register')
  ) {
    if (hasToken && getSectretKey()) next('home')
    else next()
  } else if (to.name!.toString().includes('profile-setkey')) {
    console.log('key', !hasToken)
    if (!hasToken) next({ name: '' })
    else next()
  } else {
    next()
  }
})

export default router
