<template>
  <div v-click-outside="handleClickOutside" class="relative">
    <div
      class="flex items-center space-x-2 cursor-pointer"
      @click="open = !open"
    >
      <GlobeIcon size="1.25x" />
      <span>{{ currentLocale }}</span>
    </div>
    <div
      class="absolute right-0 flex-col justify-center p-2 space-y-2 text-center rounded-lg top-11 lg:top-12 lg:right-0 bg-secondary"
      :class="!open ? 'hidden' : 'flex '"
    >
      <div
        v-for="locale in avaibleLanguages"
        :key="locale.code"
        class="flex items-center px-4 space-x-1 rounded-md cursor-pointer text-primary hover:text-brand"
        @click="open = false"
      >
        <GlobeIcon size="1x" />
        <ButtonOrLink @click="changeLocale(locale.code)">
          {{ locale.name }}
        </ButtonOrLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  computed,
} from '@nuxtjs/composition-api'
import { GlobeIcon } from 'vue-feather-icons'
import vClickOutside from 'v-click-outside'

export default defineComponent({
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    GlobeIcon,
  },
  setup() {
    // TODO: nuxt-i18n fix when migrate to composition api
    const { switchLocalePath, i18n, router, $dayjs } = useContext().app
    const currentLocale = ref(i18n.getLocaleCookie()?.toUpperCase() ?? 'NaN')
    const open = ref(false)

    const avaibleLanguages = computed(() => {
      return i18n.locales!.filter!((lang: any) => lang.code !== i18n.locale)
    }) as any

    function changeLocale(code: string) {
      $dayjs.locale(code)
      currentLocale.value = code.toUpperCase()
      router!.push(switchLocalePath(code))
    }

    function handleClickOutside() {
      open.value = false
    }

    return {
      currentLocale,
      changeLocale,
      open,
      avaibleLanguages,
      handleClickOutside,
    }
  },
})
</script>
