<template>
  <div
    class="flex items-center justify-center min-h-screen mx-auto text-center"
  >
    <h1>Register</h1>
    <form class="" @submit.prevent="register()">
      <p v-if="error">{{ error }}</p>
      <input v-model="email" class="block w-full form-input" />
      <input v-model="password" />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useRegisterUserMutation } from '../generated/graphql'
import { generateSecretKey, hash } from '~/utils/crypto'

export default defineComponent({
  setup(props, { root }) {
    const router = root.$router
    const error = ref('')
    const email = ref('b@b.de')
    const password = ref('b')

    const { mutate: sendRegistration } = useRegisterUserMutation(() => ({
      variables: {
        email: email.value,
        password: password.value,
        secret: hash(generateSecretKey()),
      },
    }))

    async function register() {
      const { data } = await sendRegistration()

      if (data) {
        const { errors, user } = data.register
        if (errors) {
          error.value = errors.message
          return
        }
        router.push(`/accountVerification/?id=${user?.id}`)
      }
    }

    return {
      register,
      email,
      password,
      error,
    }
  },
})
</script>
