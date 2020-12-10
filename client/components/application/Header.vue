<template>
  <div class="">
    <div class="md:hidden">
      <IconOnlyButton @click="$emit('sidebartoggle')">
        <MenuIcon />
      </IconOnlyButton>
      <RiMenu3Fill />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { MenuIcon } from 'vue-feather-icons'
import { RiMenu3Fill } from 'vue-remix-icons'
export default defineComponent({
  components: {
    MenuIcon,
    RiMenu3Fill,
  },
  setup() {},
})
</script>
