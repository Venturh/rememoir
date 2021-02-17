<template>
  <div
    ref="hoverMenu"
    class="relative z-50 w-32 rounded-md shadow-sm bg-primary"
    :style="style"
    @mouseover="$emit('mouseover')"
    @mouseleave="$emit('mouseleave')"
  >
    <div v-if="activeMenu === 'primary'" class="">
      <div
        v-for="item in primaryItems"
        :key="item.name"
        class="flex items-center w-full px-4 py-2 space-x-2 rounded-md cursor-pointer hover:bg-brand25 hover:text-primary"
        @click.stop="handleClick(item)"
      >
        <Icon :icon="item.icon" size="sm" />
        <span class="text-sm">{{ t(item.name) }}</span>
      </div>
    </div>

    <div v-if="activeMenu === 'secondary'">
      <button
        v-for="item in secondaryItems"
        :key="item.name"
        :disabled="item.info === 'DUPLICATE'"
        class="flex items-center w-full p-2 space-x-2 rounded-md"
        :class="
          item.info === 'DUPLICATE'
            ? 'cursor-not-allowed hover:bg-brand25'
            : 'hover:bg-brand25 hover:text-white cursor-pointer'
        "
        @click.stop="handleClick(item)"
      >
        <Icon :icon="item.icon" size="sm" />
        <span class="text-sm truncate">{{ item.name }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { HoverMenuItem } from '@/types'
import { defineComponent, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    primaryItems: {
      type: Array as () => HoverMenuItem[],
      default: () => [],
    },
    secondaryItems: {
      type: Array as () => HoverMenuItem[],
      default: () => [],
    },
  },
  emits: ['click', 'mouseleave', 'mouseover'],
  setup(_, { emit }) {
    const { t } = useI18n()
    const hoverMenu = ref<HTMLDivElement>()
    const style = ref({ top: '0' })

    const activeMenu = ref('primary')
    function handleClick(item: HoverMenuItem) {
      if (item.goto) activeMenu.value = item.goto
      emit('click', { name: item.name, info: item.info })
    }
    onMounted(() => {
      if (
        window.innerHeight - hoverMenu.value!.getBoundingClientRect().top <
        hoverMenu.value!.clientHeight
      )
        style.value.top = '-15rem'
    })
    return { t, activeMenu, handleClick, hoverMenu, style }
  },
})
</script>
