<template>
  <div
    class="flex justify-center bg-primary"
    :class="{ 'border-r border-primaryText': !isMobile }"
  >
    <transition name="slide-fade">
      <div
        v-if="toggled || !isMobile"
        class="relative flex flex-col justify-between p-4 w-52"
      >
        <SidebarMenu :toggled="toggled" />
        <div
          class="flex flex-row items-center w-full p-2 space-x-2 rounded-lg bg-primary"
        >
          <div class="w-2/3 space-y-2">
            <div class="">{{ userInfo.username }}</div>
            <span class="text-sm">{{ userInfo.email }}</span>
          </div>

          <div class="flex space-x-2">
            <IconOnlyButton @click="logOut">
              <LogOutIcon size="1.25x" />
            </IconOnlyButton>
            <IconOnlyButton @click="logOut">
              <SettingsIcon size="1.25x" />
            </IconOnlyButton>
          </div>
        </div>
      </div>
    </transition>

    <IconOnlyButton
      class="absolute right-1 lg:hidden"
      :class="{ hidden: !toggled }"
      @click="$emit('sidebartoggle')"
    >
      <XIcon />
    </IconOnlyButton>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
import { useBreakpointTailwindCSS } from 'vue-composable'

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
    const { current } = useBreakpointTailwindCSS()
    const { app } = useContext()
    const { userInfo } = useUserInfo()
    const { mutate: logout } = useLogoutMutation()

    const isMobile = computed(() => {
      if (['lg', 'xl'].includes(current.value as string)) return false
      return true
    })

    async function logOut() {
      await logout()
      setAccessToken('')
      app.router!.push('/')
    }

    return { current, userInfo, logOut, isMobile }
  },
})
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
