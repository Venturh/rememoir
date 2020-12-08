<template>
  <main class="flex flex-col items-center">
    <div class="flex flex-col space-y-10">
      <div class="space-y-2">
        <h1>{{ $t('confirm') }}</h1>
        <h2>{{ $t('checkInbox') }}</h2>
      </div>
      <form class="space-y-6 w-80" @submit.prevent="verificate">
        <FormInput v-model="verificationCode" type="text">{{
          $t('verificationCode')
        }}</FormInput>
        <Button type="submit"> {{ $t('submit') }} </Button>
      </form>
      <Error v-if="error" :message="error" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { setAccessToken } from '@/utils/accessToken'
import { useVerifyAccountByEmailMutation } from '@/generated/graphql'

export default defineComponent({
  layout: 'auth',
  setup() {
    const { app, query } = useContext()
    const { router, localePath } = app

    const { id } = query.value

    if (!id) return

    const verificationCode = ref('')
    const error = ref('')
    const { mutate: sendVerification } = useVerifyAccountByEmailMutation(
      () => ({
        variables: { id: id as string, code: verificationCode.value },
      })
    )

    async function verificate() {
      const { data } = await sendVerification()
      const { errors, accessToken } = data!.verifyEmailCode
      if (errors) {
        error.value = errors.message
      } else {
        setAccessToken(accessToken!)
        router!.push(localePath('/entries'))
      }
    }

    return {
      verificate,
      sendVerification,
      verificationCode,
      error,
    }
  },
})
</script>
