<template>
  <main class="flex items-center justify-center min-h-screen mx-auto">
    <div class="flex items-center space-x-8">
      <div class="w-2/6 space-y-2 font-semibold">
        <h1 class="text-5xl text-primary">Sign up</h1>
        <h2 class="text-3xl text-secondary">
          {{ test }}
        </h2>
      </div>
      <form class="" @submit.prevent="register()">
        <p v-if="error">{{ error }}</p>
        <input v-model="email" class="block w-full form-input" />
        <input v-model="password" />
        <button type="submit">Register</button>
      </form>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useRegisterUserMutation } from '../generated/graphql'
import { generateSecretKey, hash } from '~/utils/crypto'

export default defineComponent({
  layout: 'landing',
  setup(props, { root }) {
    const router = root.$router
    const error = ref('')
    const email = ref('b@b.de')
    const password = ref('b')
    const test = ref('Get started\nfor free')

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
      test,
    }
  },
})
</script>
