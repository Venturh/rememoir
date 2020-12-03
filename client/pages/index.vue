<template>
  <div>
    <h1>Landing Page</h1>
    <NuxtLink to="/login">Login</NuxtLink>
    <NuxtLink to="/register">Register</NuxtLink>
    <NuxtLink to="/entries">Entries</NuxtLink>
    <button @click="test">Test</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { generateSecretKey, hash } from '@/utils/crypto'
export default defineComponent({
  methods: {
    test() {
      generateSecretKey('id')
      hash('hallo')
    },
  },
  setup() {},
})
</script>
