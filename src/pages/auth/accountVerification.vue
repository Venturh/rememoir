<template>
  <AuthLayout class="flex flex-col items-center">
    <div class="flex flex-col space-y-10">
      <div class="space-y-2">
        <h1>{{ t('confirm') }}</h1>
        <h2>{{ t('checkInbox') }}</h2>
      </div>
      <form class="space-y-6 w-80" @submit.prevent="verificate">
        <FormInput v-model:value="verificationCode" type="text">{{
          t('verificationCode')
        }}</FormInput>
        <Button type="submit"> {{ t('submit') }} </Button>
      </form>
      <Error v-if="error" :message="error" />
    </div>
  </AuthLayout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { setAccessToken } from '@/utils/auth'
import { useVerifyAccountByEmailMutation } from '@/generated/graphql'
import useUserInfo from '@/hooks/userInfo'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const { push, currentRoute } = useRouter()
    const { setUserInfo } = useUserInfo()
    const { id } = currentRoute.value.query

    onMounted(() => {
      if (!id) push('/')
    })

    const verificationCode = ref('')
    const error = ref('')
    const { mutate: sendVerification } = useVerifyAccountByEmailMutation(
      () => ({
        variables: { id: id as string, code: verificationCode.value },
      })
    )

    async function verificate() {
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

    return {
      t,
      verificate,
      sendVerification,
      verificationCode,
      error,
    }
  },
})
</script>
