<template>
  <div class="relative">
    <div
      class="flex items-center space-x-1 cursor-pointer"
      @click="open = !open"
    >
      <GlobeIcon size="1.25x" />
      <span>{{ currentLocale.toUpperCase() }}</span>
    </div>
    <div
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
      >
        <GlobeIcon size="1x" />
        <nuxt-link :to="switchLocalePath(locale.code)">
          {{ locale.name }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
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
    const { locales } = i18n

    return { currentLocale, open, locales }
  },
})
</script>
