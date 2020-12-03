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
import { setAccessToken } from '@/utils/accessToken'
import { useAuthenticateUserMutation } from '../generated/graphql'

export default defineComponent({
  setup(props, { root }) {
    const router = root.$router

    const email = ref('b@b.de')
    const password = ref('b')
    const { mutate: sendLogin } = useAuthenticateUserMutation(() => ({
      variables: { email: email.value, password: password.value },
    }))

    async function login() {
      const { data } = await sendLogin()
      const { errors, accessToken } = data!.login
      if (errors) {
        console.log('error', errors.message)
        if (errors.message === 'USER_NOT_VERIIFIED') {
          router.push('/accountVerification')
        }
      } else {
        setAccessToken(accessToken!)
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
