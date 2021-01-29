<template>
  <nav
    class="sticky bottom-0 w-full p-2 border-t bg-primary border-borderPrimary"
  >
    <div class="flex justify-between mx-auto max-w-xsm">
      <SidebarLink v-for="item in sidebarItems" :key="item.text" :item="item" />
      <SidebarLink :item="userItem" />
    </div>
  </nav>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { UserIcon } from 'vue-feather-icons'
import { sidebarItems } from '@/config/data'
export default defineComponent({
  setup() {
    const userItem = { icon: UserIcon, text: 'profile' }
    return { sidebarItems, userItem }
  },
})
</script>

<style></style>
