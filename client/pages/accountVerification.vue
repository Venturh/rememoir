<template>
  <div
    class="flex items-center justify-center min-h-screen mx-auto text-center"
  >
    <h1>Verification</h1>
    <form class="" @submit.prevent="verification()">
      <input v-model="code" class="block w-full form-input" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { setAccessToken } from '@/utils/accessToken'
import { useVerifyAccountByEmailMutation } from '../generated/graphql'

export default defineComponent({
  setup(props, { root }) {
    const router = root.$router

    const id: string = root.$route.query.id as string

    const code = ref('')
    const { mutate: sendVerification } = useVerifyAccountByEmailMutation(
      () => ({
        variables: { id, code: code.value },
      })
    )

    async function verification() {
      const { data } = await sendVerification()
      const { errors, accessToken } = data!.verifyEmailCode
      if (errors) {
        console.log('error', errors.message)
      } else {
        setAccessToken(accessToken!)
        router.push('/')
      }
    }

    return {
      verification,
      sendVerification,
      code,
    }
  },
})
</script>
