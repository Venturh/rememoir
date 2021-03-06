<template>
  <div
    class="flex-col justify-between hidden w-16 h-screen sm:flex sm:fixed lg:w-48"
  >
    <div class="space-y-12">
      <router-link to="/" class="flex flex-shrink-0 h-12 px-4">
        <Logo class="w-auto h-12 lg:h-14" />
      </router-link>

      <VerticalNavigation :items="sidebarItems" />
    </div>
    <div
      class="flex flex-col p-2 mb-4 rounded-lg lg:flex-row lg:items-center lg:justify-between lg:space-x-2 bg-primary"
    >
      <div v-if="userInfo" class="hidden w-11/12 space-y-2 lg:block">
        <p class="truncate">{{ userInfo.username }}</p>
        <p class="text-sm truncate">
          {{ userInfo.email }}
        </p>
      </div>

      <div class="flex flex-col space-y-2">
        <IconOnlyButton to="/settings/general">
          <Icon :icon="RiSettings5Line" />
        </IconOnlyButton>
        <IconOnlyButton @click="logOut">
          <Icon :icon="RiLogoutBoxLine" />
        </IconOnlyButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { RiSettings5Line, RiLogoutBoxLine } from 'vue-remix-icons'

import useUserInfo from '@/hooks/userInfo'
import { useLogoutMutation } from '@/generated/graphql'
import { setAccessToken } from '@/utils/auth'
import { sidebarItems } from '@/config/data'
import { getDb } from '@/db/Database'
import { removeSecretKey } from '@/utils/crypto'

defineProps<{ toggled?: boolean }>()

const db = getDb()
const { push } = useRouter()
const { userInfo } = useUserInfo()

const { mutate: logout } = useLogoutMutation()

async function logOut() {
  await db.remove()
  await logout()
  removeSecretKey()
  push('/')
  setAccessToken('')
}
</script>
