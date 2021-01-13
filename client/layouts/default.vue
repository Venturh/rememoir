<template>
  <div class="min-h-screen text-primary bg-primary">
    <div
      class="flex flex-col mx-auto lg:flex-row lg:justify-between max-w-xsm md:max-w-2xl lg:max-w-6xl"
    >
      <Sidebar
        class="fixed z-50 min-h-screen"
        :toggled="toggle"
        @sidebartoggle="toggle = !toggle"
      />
      <div class="w-full min-h-screen py-2 space-y-2 lg:pl-64">
        <Header @sidebartoggle="toggle = !toggle" />
        <div class="">
          <Nuxt v-if="secretKey" />
          <SecretKeyModal
            v-if="secretKey === null"
            @success="updateSecretKey"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onUnmounted,
  useContext,
} from '@nuxtjs/composition-api'

import { useTheme } from '@/hooks'
import { getSectretKey } from '@/utils/crypto'

export default defineComponent({
  setup() {
    const { theme } = useTheme()
    const { $db } = useContext().app
    const toggle = ref(false)

    // TODO: Somhehow watch localstorage if secret key is removed
    const secretKey = ref(getSectretKey())

    function updateSecretKey() {
      secretKey.value = getSectretKey()
      console.log('updateSecretKey ~ secretKey.value', secretKey.value)
    }

    onUnmounted(async () => {
      await $db.remove()
    })

    return {
      toggle,
      theme,
      secretKey,
      updateSecretKey,
    }
  },
})
</script>
