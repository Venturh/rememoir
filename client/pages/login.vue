<template>
  <div
    class="min-h-screen flex justify-center items-center text-center mx-auto"
  >
    <h1>Login</h1>
    <form @submit.prevent="login()">
      <input v-model="email" />
      <input v-model="password" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'
import authenticateUser from '../graphql/authenticateUser.gql'

export default defineComponent({
  setup() {
    const email = ref('b@b.de')
    const password = ref('b')
    const { mutate: sendLogin } = useMutation(authenticateUser, () => ({
      variables: { email: email.value, password: password.value },
    }))

    async function login() {
      const { data } = await sendLogin()
      console.log('🚀 ~ file: login.vue ~ line 43 ~ login ~ response', data)
    }

    return {
      login,
      sendLogin,
      email,
      password,
    }
  },
})
</script>
