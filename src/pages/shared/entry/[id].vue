<template>
  <LandingLayout>
    <BaseEntry v-if="!loading" :entry="entry" show-preview public />
  </LandingLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGetSharedEntryQuery } from '@/generated/graphql'
import { decryptEntry } from '@/utils/crypto'

import type { EntryInput } from '@/generated/graphql'
import { useRouter } from 'vue-router'

const { currentRoute } = useRouter()
const { params, query } = currentRoute.value
const { id } = params
const { code } = query
const { result, loading } = useGetSharedEntryQuery({
  id,
})

const entry = computed(() => {
  if (result.value && !loading.value) {
    console.log('encrypted ~ result', result.value.getSharedEntry)
    return decryptEntry(
      (result.value.getSharedEntry as any) as EntryInput,
      code
    )
  }
  return {}
})
</script>
