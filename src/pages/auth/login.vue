<template>
  <AuthLayout>
    <div class="flex flex-col space-y-4">
      <div class="space-y-2">
        <h1>{{ t('login') }}.</h1>
        <h2>{{ t('loginSubheader') }}</h2>
      </div>
      <AuthForm :error="error" type="login" @submit="login()">
        <FormInput
          v-model:value="email"
          type="email"
          class="block w-full form-input"
        >
          Email
        </FormInput>
        <FormInput v-model:value="password" type="password">
          {{ t('password') }}
        </FormInput>
        <!-- <Links to="/auth/resetPassword">{{ t('forgottenPassword') }} </Links> -->
      </AuthForm>
    </div>
  </AuthLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { setAccessToken } from '@/utils/auth'
import useUserInfo from '@/hooks/userInfo'
import { useLoginMutation } from '@/generated/graphql'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const { push } = useRouter()

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
      console.log('login ~ user', user)
      if (errors) {
        error.value = errors.message
        if (errors.message === 'USER_NOT_VERIIFIED') {
          push(`/auth/accountVerification/?id=${user?.id}`)
        }
      } else {
        setUserInfo({
          email: user!.email,
          uid: user!.id,
          username: user!.username,
        })
        setAccessToken(accessToken!)
        push('/home')
      }
    }

    return {
      t,
      login,
      sendLogin,
      email,
      password,
      error,
    }
  },
})
</script>
