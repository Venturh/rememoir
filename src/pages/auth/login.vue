<template>
  <AuthLayout :notification="notification">
    <div class="flex flex-col space-y-4">
      <div class="space-y-2">
        <h1>{{ t('login') }}.</h1>
        <h2>{{ t('loginSubheader') }}</h2>
      </div>
      <AuthForm type="signIn" :validation-schema="schema" @submit="login">
        <FormInput name="email" type="email" label="email" />
        <FormInput name="password" type="password" label="password" />
      </AuthForm>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { object, string } from 'yup'

import { setAccessToken } from '@/utils/auth'
import useUserInfo from '@/hooks/userInfo'
import { useLoginMutation } from '@/generated/graphql'
import { useNotification } from '@/hooks'

const { t } = useI18n()
const { push } = useRouter()
const { notification, setNotification } = useNotification()

const infos = reactive({ email: '', password: '', error: '' })

const schema = object().shape({
  email: string().email().required(),
  password: string().min(3).required(),
})

const { setUserInfo } = useUserInfo()
const { mutate: sendLogin } = useLoginMutation(() => ({
  variables: { email: infos.email, password: infos.password },
}))

async function login(values: { email: string; password: string }) {
  Object.assign(infos, values)
  infos.error = ''
  const { data } = await sendLogin()
  const { errors, accessToken, user } = data!.login
  if (errors) {
    if (errors.message === 'USER_NOT_VERIIFIED') {
      push(`/auth/accountVerification/?id=${user?.id}`)
    }

    setNotification({ show: true, text: errors.message, type: 'error' })
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
</script>
