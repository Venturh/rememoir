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
import { useMutation } from '@vue/apollo-composable'
import registerUser from '../graphql/registerUser.gql'

export default defineComponent({
  setup(props, { root }) {
    const router = root.$router
    const error = ref('')
    const email = ref('b@b.de')
    const password = ref('b')
    const { mutate: sendRegistration } = useMutation(registerUser, () => ({
      variables: { email: email.value, password: password.value },
    }))

    async function register() {
      const { data } = await sendRegistration()

      if (data) {
        console.log(
          '🚀 ~ file: register.vue ~ line 34 ~ register ~ data',
          data.register.errors
        )
        const { errors } = data.register
        if (errors) {
          error.value = errors.message
          return
        }
        router.push('/')
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
