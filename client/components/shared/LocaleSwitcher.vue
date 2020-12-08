<template>
  <div class="relative">
    <div ref="el" class="cursor-pointer" @click="open = !open">
      <GlobeIcon size="1.25x" />
    </div>
    <div
      ref="dropDown"
      :class="
        !open
          ? 'hidden'
          : 'flex flex-col justify-center text-center right-0 w-28 rounded-md h-20 absolute top-11 md:top-12 md:right-0 space-y-2 bg-secondary'
      "
    >
      <div
        v-for="locale in locales"
        :key="locale.code"
        class="flex items-center px-4 space-x-1 rounded-md cursor-pointer text-primary hover:text-brand"
        @click="open = false"
      >
        <GlobeIcon size="1x" />
        <nuxt-link :to="switchLocalePath(locale.code)">
          {{ locale.name }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  onUnmounted,
} from '@nuxtjs/composition-api'
import i18n from '@/config/i18n'
import { GlobeIcon } from 'vue-feather-icons'

export default defineComponent({
  components: {
    GlobeIcon,
  },
  setup(props, { root }) {
    // TODO: nuxt-i18n fix when migrate to composition api
    const currentLocale = root._i18n.getLocaleCookie()

    const open = ref(false)
    const el = ref<HTMLDivElement>()
    const dropDown = ref<HTMLDivElement>()
    const { locales } = i18n

    function handleClickOutside({ target }: MouseEvent) {
      if (el.value?.contains(target) || dropDown.value?.contains(target)) return
      open.value = false
    }

    watch(
      () => open.value,
      () => {
        if (open) {
          document.addEventListener('mousedown', handleClickOutside)
        } else {
          document.removeEventListener('mousedown', handleClickOutside)
        }
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
      }
    )

    onUnmounted(() => {
      document.removeEventListener('mousedown', handleClickOutside)
    })

    return { currentLocale, open, locales, el, dropDown }
  },
})
</script>
