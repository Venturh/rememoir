<template>
  <div
    class="min-h-screen flex justify-center items-center text-center mx-auto"
  >
    <h1 v-if="loading">Loading</h1>
    <div v-if="!loading">
      <pre>{{ users }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag'
export default defineComponent({
  setup() {
    const { result, loading } = useQuery(gql`
      query users {
        users {
          email
        }
      }
    `)

    const users = useResult(result, null, (data) => data.users)
    return {
      users,
      loading,
    }
  },
})
</script>
