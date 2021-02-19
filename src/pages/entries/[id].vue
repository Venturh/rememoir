<template>
  <AppLayout>
    <div class="w-full space-y-2 sm:space-y-4 lg:w-screen lg:max-w-lg">
      <BaseEntry v-if="entry" :entry="entry" show-preview />
      <NotFound v-else-if="!loading && !entry" />
      <Loading v-else />
    </div>
  </AppLayout>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'

import { getDb } from '@/db/Database'
import { useEntryById } from '@/hooks'

const { currentRoute } = useRouter()
const id = ref(currentRoute.value.params.id as string)
const db = getDb()
const { entry, execute, loading } = useEntryById(id.value, db)

onBeforeRouteUpdate(async (to, from, next) => {
  if (to !== from) {
    id.value = to.params.id as string
    await execute(id.value)
    next()
  }
})
</script>
