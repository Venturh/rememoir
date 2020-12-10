<template>
  <div class="">
    <div class="md:hidden">
      <IconOnlyButton @click="$emit('sidebartoggle')">
        <MenuIcon />
      </IconOnlyButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { MenuIcon } from 'vue-feather-icons'
export default defineComponent({
  components: {
    MenuIcon,
  },
  setup() {},
})
</script>
