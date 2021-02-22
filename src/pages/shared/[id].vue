//TODO Error handling
<template>
  <component :is="isAuth ? AppLayout : PublicLayout">
    <div class="w-full space-y-4 lg:w-screen lg:max-w-lg">
      <BaseEntry
        v-if="!loading && target === 'entry'"
        :entry="entry"
        show-preview
        public
      />
      <div class="space-y-4">
        <BaseList
          v-if="!loading && target === 'list' && list.list"
          :list="list.list"
          show-preview
          public
          primary
        />
        <div v-if="list.entries && list.entries.length > 0" class="space-y-4">
          <BaseEntry
            v-for="entry in list.entries"
            :key="entry?.id"
            :entry="entry"
            show-preview
            public
          />
        </div>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import PublicLayout from '@/components/layouts/PublicLayout.vue'
import AppLayout from '@/components/layouts/AppLayout.vue'
import {
  useGetSharedEntryQuery,
  useGetSharedListQuery,
} from '@/generated/graphql'
import { decryptEntry, decryptList, getSectretKey } from '@/utils/crypto'

import type { EntryInput, ListInput } from '@/generated/graphql'
import type {
  GetSharedEntryQuery,
  GetSharedListQuery,
} from '@/generated/graphql'

const isAuth = getSectretKey()
const { t } = useI18n()
const { currentRoute } = useRouter()
const { params, query } = currentRoute.value
const { id } = params
const { target, code, keys } = query
console.log('keys', keys)
const { result, loading } =
  target === 'entry'
    ? useGetSharedEntryQuery({
        id,
      })
    : useGetSharedListQuery({
        id,
      })

const entry = computed(() => {
  if (target === 'entry' && result.value && !loading.value) {
    const resu = result.value as GetSharedEntryQuery
    return decryptEntry((resu.getSharedEntry as any) as EntryInput, code)
  }
  return {}
})
const list = computed(() => {
  if (target === 'list' && result.value && !loading.value) {
    const resu = result.value as GetSharedListQuery
    const entryKeys = (keys as string).split(',')
    const entries = resu.getSharedList.entries.map((e, i) =>
      decryptEntry(e as EntryInput, entryKeys[i])
    )
    return {
      entries,
      list: decryptList((resu.getSharedList.list as any) as ListInput, code),
    }
  }
  return {}
})
</script>
