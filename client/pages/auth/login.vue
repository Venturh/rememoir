<template v-slot:auth>
  <main>
    <div class="flex flex-col space-y-4">
      <div class="space-y-2">
        <h1>{{ $t('login') }}.</h1>
        <h2>{{ $t('loginSubheader') }}</h2>
      </div>
      <AuthForm :error="error" type="login" @submit="login()">
        <FormInput v-model="email" type="email" class="block w-full form-input">
          Email
        </FormInput>
        <FormInput v-model="password" type="password">
          {{ $t('password') }}
        </FormInput>
        <Links to="/auth/resetPassword">{{ $t('forgottenPassword') }} </Links>
      </AuthForm>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { setAccessToken } from '@/utils/auth'
import { useUserInfo } from '@/hooks'
import { useLoginMutation } from '@/generated/graphql'

export default defineComponent({
  layout: 'auth',
  middleware: ['notAuthenticated'],

  setup(props, { root }) {
    const router = root.$router

    const email = ref('')
    const password = ref('')
    const error = ref('')
    const { setUserInfo } = useUserInfo()
    const { mutate: sendLogin } = useLoginMutation(() => ({
      variables: { email: email.value, password: password.value },
    }))

    async function login() {
      const { data } = await sendLogin()
      const { errors, accessToken, user } = data!.login
      if (errors) {
        error.value = errors.message
        if (errors.message === 'USER_NOT_VERIIFIED') {
          router.push(`/accountVerification/?id=${user?.id}`)
        }
      } else {
        setUserInfo({
          email: user!.email,
          uid: user!.id,
          username: user!.username,
        })
        setAccessToken(accessToken!)
        // TODO: nuxt-i18n fix when migrate to composition api
        router.push(root.localePath('entries'))
      }
    }

    return {
      login,
      sendLogin,
      email,
      password,
      error,
    }
  },
})
</script>
