<template>
  <div
    class="flex-col justify-between hidden w-16 h-screen sm:flex sm:fixed lg:w-48"
  >
    <div class="space-y-12">
      <div class="flex items-center justify-center flex-shrink-0 h-12 lg:h-16">
        <img
          class="w-auto h-12 lg:h-16"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="logo"
        />
      </div>
      <VerticalNavigation :items="sidebarItems" />
    </div>
    <div
      class="flex flex-col p-2 mb-4 rounded-lg lg:flex-row lg:items-center lg:space-x-2 bg-primary"
    >
      <div v-if="userInfo" class="hidden w-2/3 space-y-2 lg:block">
        <p class="truncate">{{ userInfo.username }}</p>
        <p class="text-sm truncate">
          {{ userInfo.email }}
        </p>
      </div>

      <div
        class="flex flex-col space-y-2 lg:space-y-0 lg:space-x-2 lg:flex-row"
      >
        <IconOnlyButton @click="logOut">
          <Icon :icon="RiLogoutBoxLine" />
        </IconOnlyButton>
        <IconOnlyButton to="/settings/general">
          <Icon :icon="RiSettings5Line" />
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
