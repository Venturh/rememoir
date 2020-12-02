<template>
  <div
    class="flex items-center justify-center min-h-screen mx-auto text-center"
  >
    <h1>Login</h1>
    <form class="" @submit.prevent="login()">
      <input v-model="email" class="block w-full form-input" />
      <input v-model="password" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable'
import { setAccessToken } from '@/utils/accessToken'
import authenticateUser from '../graphql/authenticateUser.gql'

export default defineComponent({
  setup(props, { root }) {
    const router = root.$router

    const email = ref('b@b.de')
    const password = ref('b')
    const { mutate: sendLogin } = useMutation(authenticateUser, () => ({
      variables: { email: email.value, password: password.value },
    }))

    async function login() {
      const { data } = await sendLogin()

      if (data) {
        setAccessToken(data.login.accessToken)
        router.push('/')
      }
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
