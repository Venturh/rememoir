<template>
  <div
    class="flex-col justify-between hidden w-24 h-screen border-r sm:flex sm:fixed lg:w-48 border-brand25"
  >
    <div class="space-y-12">
      <div class="flex items-center justify-center flex-shrink-0 h-12 lg:h-16">
        <img
          class="w-auto h-12 lg:h-16"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="logo"
        />
      </div>
      <nav class="space-y-2">
        <SidebarLink
          v-for="item in sidebarItems"
          :key="item.text"
          :item="item"
        />
      </nav>
    </div>
    <div
      class="flex flex-col p-2 mb-4 rounded-lg lg:flex-row lg:items-center lg:space-x-2 bg-primary"
    >
      <div v-if="userInfo" class="hidden w-2/3 space-y-2 lg:block">
        <div class="">{{ userInfo.username }}</div>
        <span class="text-sm">{{ userInfo.email }}</span>
      </div>

      <div
        class="flex flex-col space-y-2 lg:space-y-0 lg:space-x-2 lg:flex-row"
      >
        <IconOnlyButton @click="logOut">
          <LogOutIcon size="1.25x" />
        </IconOnlyButton>
        <IconOnlyButton @click="logOut">
          <SettingsIcon size="1.25x" />
        </IconOnlyButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SettingsIcon,
  LogOutIcon,
  XIcon,
} from 'vue-feather-icons'

import { useUserInfo } from '@/hooks'
import { useLogoutMutation } from '@/generated/graphql'
import { setAccessToken } from '@/utils/auth'
import { sidebarItems } from '@/config/data'

export default defineComponent({
  props: {
    toggled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    XIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    SettingsIcon,
    LogOutIcon,
  },

  setup() {
    const { app } = useContext()
    const { userInfo } = useUserInfo()

    const { mutate: logout } = useLogoutMutation()

    async function logOut() {
      await logout()
      setAccessToken('')
      app.router!.push('/')
    }

    return { userInfo, logOut, sidebarItems }
  },
})
</script>
