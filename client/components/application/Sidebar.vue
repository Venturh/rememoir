<template>
  <div class="absolute flex justify-center md:static bg-secondary">
    <transition name="slide-fade">
      <div
        v-if="
          toggled || current === 'md' || current === 'lg' || current === 'xl'
        "
        class="md:block"
      >
        <SidebarMenu :toggled="toggled" />
      </div>
    </transition>
    <div class="absolute right-0 md:hidden">
      <IconOnlyButton
        class="p-2"
        :class="{ hidden: !toggled }"
        @click="$emit('sidebartoggle')"
      >
        <XIcon />
      </IconOnlyButton>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { useBreakpointTailwindCSS } from 'vue-composable'

import { XIcon } from 'vue-feather-icons'

export default defineComponent({
  props: {
    toggled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    XIcon,
  },

  setup() {
    const { current } = useBreakpointTailwindCSS()
    return { current }
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
