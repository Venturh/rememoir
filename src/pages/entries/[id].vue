<template>
  <AppLayout>Entry {{ id }}</AppLayout>
</template>
<script setup lang="ts">
import { inject, ref } from 'vue'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'

const vfm: any = inject('$vfm')
const { push, currentRoute } = useRouter()
const id = ref(currentRoute.value.params.id)

onBeforeRouteUpdate((to, from, next) => {
  vfm.hide('search')
  if (to !== from) {
    id.value = to.params.id
    next()
  }
})
</script>
