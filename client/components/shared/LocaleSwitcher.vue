<template>
  <div class="relative">
    <div
      ref="el"
      class="flex items-center space-x-2 cursor-pointer"
      @click="open = !open"
    >
      <GlobeIcon size="1.25x" />
      <span>{{ currentLocale }}</span>
    </div>
    <div
      ref="dropDown"
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
  watch,
  onUnmounted,
  useContext,
  computed,
} from '@nuxtjs/composition-api'
import { GlobeIcon } from 'vue-feather-icons'

export default defineComponent({
  components: {
    GlobeIcon,
  },
  setup() {
    // TODO: nuxt-i18n fix when migrate to composition api
    const { switchLocalePath, i18n, router, $dayjs } = useContext().app
    const currentLocale = ref(i18n.getLocaleCookie()?.toUpperCase() ?? 'NaN')
    const open = ref(false)
    const el = ref<HTMLDivElement>()
    const dropDown = ref<HTMLDivElement>()

    const avaibleLanguages = computed(() => {
      return i18n.locales!.filter!((lang: any) => lang.code !== i18n.locale)
    }) as any

    function changeLocale(code: string) {
      $dayjs.locale(code)
      currentLocale.value = code.toUpperCase()
      router!.push(switchLocalePath(code))
    }

    function handleClickOutside({ target }: MouseEvent) {
      if (
        el.value?.contains(target as Node) ||
        dropDown.value?.contains(target as Node)
      )
        return
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

    return { currentLocale, changeLocale, open, avaibleLanguages, el, dropDown }
  },
})
</script>
