<template>
  <div
    class="flex items-center justify-center min-h-screen mx-auto text-center"
  >
    <p v-if="!loading">Welcome back {{ me.email }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useResult } from '@vue/apollo-composable'
import { useMeQuery } from '@/generated/graphql'

export default defineComponent({
  middleware: ['authenticated'],
  setup() {
    const { result, loading } = useMeQuery()

    const me = useResult(result, null, (data) => data.me)
    return { me, loading }
  },
})
</script>
