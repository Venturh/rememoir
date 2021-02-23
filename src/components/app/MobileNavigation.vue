<template>
  <nav
    class="sticky bottom-0 z-50 w-full p-2 border-t bg-primary border-borderPrimary"
  >
    <div class="flex justify-between mx-auto max-w-xsm">
      <SidebarLink v-for="item in sidebarItems" :key="item.text" :item="item" />
      <SidebarLink :item="userItem" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RiUser3Line } from 'vue-remix-icons'
import { sidebarItems } from '@/config/data'

const userItem = {
  icon: RiUser3Line,
  text: 'settings',
  info: '/settings/general',
}
</script>

<style></style>
