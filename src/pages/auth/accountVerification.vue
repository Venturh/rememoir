<template>
  <AuthLayout>
    <div class="flex flex-col space-y-4">
      <div class="space-y-2">
        <h1>{{ t('confirm') }}</h1>
        <h2>{{ t('checkInbox') }}</h2>
      </div>
      <AuthForm type="verify" :validation-schema="schema" @submit="verificate">
        <FormInput name="verification" type="text" label="code" />
        <template #error>
          <Error v-if="error" :message="error" />
        </template>
      </AuthForm>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { object, string } from 'yup'

import { setAccessToken } from '@/utils/auth'
import { useVerifyAccountByEmailMutation } from '@/generated/graphql'
import useUserInfo from '@/hooks/userInfo'

const { t } = useI18n()
const { push, currentRoute } = useRouter()
const { setUserInfo } = useUserInfo()
const { id } = currentRoute.value.query

onMounted(() => {
  if (!id) push('/')
})

const schema = object().shape({
  email: string().email().required(),
  verification: string().min(6).required(),
})

const verificationCode = ref('')
const error = ref('')
const { mutate: sendVerification } = useVerifyAccountByEmailMutation(() => ({
  variables: { id: id as string, code: verificationCode.value },
}))

async function verificate(values: { verification: string }) {
  console.log('verificate ~ values', values)
  verificationCode.value = values.verification
  const { data } = await sendVerification()
  const { errors, accessToken, user } = data!.verifyEmailCode
  if (errors) {
    error.value = errors.message
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
